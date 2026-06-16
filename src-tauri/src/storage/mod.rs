use rusqlite::Connection;
use std::path::Path;

pub struct Storage {
    conn: Connection,
}

impl Storage {
    pub fn new(db_path: &Path) -> Result<Self, String> {
        let conn = Connection::open(db_path)
            .map_err(|e| format!("Failed to open database: {}", e))?;
        
        Ok(Storage { conn })
    }
    
    pub fn init(&self) -> Result<(), String> {
        self.conn.execute(
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
        
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )",
            [],
        ).map_err(|e| e.to_string())?;
        
        log::info!("Storage initialized");
        Ok(())
    }
}
