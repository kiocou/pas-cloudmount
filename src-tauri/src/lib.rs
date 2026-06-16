use serde::{Deserialize, Serialize};
use tauri::{
    Manager,
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
};

mod cloud_provider;
mod mounter;
mod storage;

pub use cloud_provider::*;
pub use mounter::*;
pub use storage::*;

static DB: once_cell::sync::Lazy<std::sync::Mutex<Option<rusqlite::Connection>>> = 
    once_cell::sync::Lazy::new(|| std::sync::Mutex::new(None));

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CloudAccount {
    pub id: String,
    pub name: String,
    pub provider: String,
    pub status: String,
    pub mount_point: Option<String>,
    pub drive_letter: Option<String>,
    pub access_token: Option<String>,
    pub refresh_token: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[tauri::command]
fn get_accounts() -> Result<Vec<CloudAccount>, String> {
    let guard = DB.lock().map_err(|e| e.to_string())?;
    if let Some(conn) = guard.as_ref() {
        let mut stmt = conn
            .prepare("SELECT id, name, provider, status, mount_point, drive_letter, created_at, updated_at FROM accounts")
            .map_err(|e| e.to_string())?;
        
        let accounts = stmt
            .query_map([], |row| {
                Ok(CloudAccount {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    provider: row.get(2)?,
                    status: row.get(3)?,
                    mount_point: row.get(4)?,
                    drive_letter: row.get(5)?,
                    access_token: None,
                    refresh_token: None,
                    created_at: row.get(6)?,
                    updated_at: row.get(7)?,
                })
            })
            .map_err(|e| e.to_string())?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|e| e.to_string())?;
        
        Ok(accounts)
    } else {
        Ok(vec![])
    }
}

#[tauri::command]
fn add_account(account: CloudAccount) -> Result<CloudAccount, String> {
    let guard = DB.lock().map_err(|e| e.to_string())?;
    if let Some(conn) = guard.as_ref() {
        conn.execute(
            "INSERT INTO accounts (id, name, provider, status, mount_point, drive_letter, access_token, refresh_token, created_at, updated_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
            (
                &account.id,
                &account.name,
                &account.provider,
                &account.status,
                &account.mount_point,
                &account.drive_letter,
                &account.access_token,
                &account.refresh_token,
                &account.created_at,
                &account.updated_at,
            ),
        ).map_err(|e| e.to_string())?;
        Ok(account)
    } else {
        Err("Database not initialized".to_string())
    }
}

#[tauri::command]
fn update_account_status(id: String, status: String) -> Result<(), String> {
    let guard = DB.lock().map_err(|e| e.to_string())?;
    if let Some(conn) = guard.as_ref() {
        conn.execute(
            "UPDATE accounts SET status = ?1, updated_at = ?2 WHERE id = ?3",
            (&status, &chrono::Utc::now().to_rfc3339(), &id),
        ).map_err(|e| e.to_string())?;
        Ok(())
    } else {
        Err("Database not initialized".to_string())
    }
}

#[tauri::command]
fn delete_account(id: String) -> Result<(), String> {
    let guard = DB.lock().map_err(|e| e.to_string())?;
    if let Some(conn) = guard.as_ref() {
        conn.execute("DELETE FROM accounts WHERE id = ?1", [&id])
            .map_err(|e| e.to_string())?;
        Ok(())
    } else {
        Err("Database not initialized".to_string())
    }
}

#[tauri::command]
fn get_available_drives() -> Result<Vec<String>, String> {
    let mut drives = Vec::new();
    for letter in b'A'..=b'Z' {
        let drive = format!("{}:\\", letter as char);
        if std::path::Path::new(&drive).exists() {
            drives.push(drive);
        }
    }
    Ok(drives)
}

pub fn init_db(app_data_dir: &std::path::Path) -> Result<(), String> {
    let db_path = app_data_dir.join("pas_cloudmount.db");
    let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
    
    conn.execute(
        "CREATE TABLE IF NOT EXISTS accounts (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            provider TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'disconnected',
            mount_point TEXT,
            drive_letter TEXT,
            access_token TEXT,
            refresh_token TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )",
        [],
    ).map_err(|e| e.to_string())?;
    
    conn.execute(
        "CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )",
        [],
    ).map_err(|e| e.to_string())?;
    
    let mut guard = DB.lock().map_err(|e| e.to_string())?;
    *guard = Some(conn);
    
    log::info!("Database initialized at {:?}", db_path);
    Ok(())
}

fn setup_tray(app: &tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let quit_item = MenuItem::with_id(app, "quit", "退出", true, None::<&str>)?;
    let show_item = MenuItem::with_id(app, "show", "显示窗口", true, None::<&str>)?;
    let hide_item = MenuItem::with_id(app, "hide", "最小化到托盘", true, None::<&str>)?;
    
    let menu = Menu::with_items(app, &[&show_item, &hide_item, &quit_item])?;
    
    let _tray = TrayIconBuilder::with_id("main")
        .tooltip("Pas# CloudMount - 网盘本地挂载管理器")
        .menu(&menu)
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| {
            match event.id.as_ref() {
                "quit" => { app.exit(0); }
                "show" => {
                    if let Some(window) = app.get_webview_window("main") {
                        let _ = window.show();
                        let _ = window.set_focus();
                    }
                }
                "hide" => {
                    if let Some(window) = app.get_webview_window("main") {
                        let _ = window.hide();
                    }
                }
                _ => {}
            }
        })
        .on_tray_icon_event(|tray, event| {
            if let tauri::tray::TrayIconEvent::Click { button: tauri::tray::MouseButton::Left, .. } = event {
                let app = tray.app_handle();
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            }
        })
        .build(app)?;
    
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new()
            .target(tauri_plugin_log::Target::new(
                tauri_plugin_log::TargetKind::LogDir { file_name: Some("pas_cloudmount".into()) }
            ))
            .build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_notification::init())
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir().expect("Failed to get app data dir");
            std::fs::create_dir_all(&app_data_dir).expect("Failed to create app data dir");
            init_db(&app_data_dir).expect("Failed to initialize database");
            setup_tray(app).expect("Failed to setup tray");
            log::info!("Pas# CloudMount starting...");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_accounts,
            add_account,
            update_account_status,
            delete_account,
            get_available_drives,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
