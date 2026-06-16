use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OAuthConfig {
    pub client_id: String,
    pub redirect_uri: String,
    pub auth_url: String,
    pub token_url: String,
    pub scope: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenResponse {
    pub access_token: String,
    pub refresh_token: Option<String>,
    pub expires_in: i64,
    pub token_type: String,
}

#[derive(Debug, Error)]
pub enum CloudError {
    #[error("认证失败: {0}")]
    AuthError(String),
    #[error("API 请求失败: {0}")]
    ApiError(String),
    #[error("网络错误: {0}")]
    NetworkError(String),
    #[error("不支持的云服务商: {0}")]
    UnsupportedProvider(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInfo {
    pub id: String,
    pub name: String,
    pub email: Option<String>,
    pub avatar: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StorageInfo {
    pub total: u64,
    pub used: u64,
    pub free: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileInfo {
    pub id: String,
    pub name: String,
    pub path: String,
    pub size: u64,
    pub is_directory: bool,
    pub modified_at: String,
    pub created_at: String,
}

pub mod aliyun {
    use super::*;
    
    pub struct AliyunProvider;
    
    impl AliyunProvider {
        pub fn new() -> Self {
            AliyunProvider
        }
    }
    
    pub fn get_oauth_config() -> OAuthConfig {
        OAuthConfig {
            client_id: "YOUR_CLIENT_ID".to_string(),
            redirect_uri: "http://localhost:8080/oauth/callback".to_string(),
            auth_url: "https://oauth.aliyundrive.com/authorizationserver".to_string(),
            token_url: "https://oauth.aliyundrive.com/oauth/token".to_string(),
            scope: "userinfo:read drive:read drive:write".to_string(),
        }
    }
    
    pub fn get_user_info(_access_token: &str) -> Result<UserInfo, CloudError> {
        Ok(UserInfo {
            id: "demo".to_string(),
            name: "演示用户".to_string(),
            email: None,
            avatar: None,
        })
    }
    
    pub fn get_storage_info(_access_token: &str) -> Result<StorageInfo, CloudError> {
        let gb: u64 = 1024 * 1024 * 1024;
        let tb: u64 = gb * 1024;
        Ok(StorageInfo {
            total: 2 * tb,
            used: 512 * gb,
            free: 1536 * gb,
        })
    }
}

pub mod onedrive {
    use super::*;
    
    pub struct OneDriveProvider;
    
    impl OneDriveProvider {
        pub fn new() -> Self {
            OneDriveProvider
        }
    }
    
    pub fn get_oauth_config() -> OAuthConfig {
        OAuthConfig {
            client_id: "YOUR_CLIENT_ID".to_string(),
            redirect_uri: "http://localhost:8080/oauth/callback".to_string(),
            auth_url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize".to_string(),
            token_url: "https://login.microsoftonline.com/common/oauth2/v2.0/token".to_string(),
            scope: "User.Read Files.ReadWrite.All offline_access".to_string(),
        }
    }
    
    pub fn get_user_info(_access_token: &str) -> Result<UserInfo, CloudError> {
        Ok(UserInfo {
            id: "demo".to_string(),
            name: "演示用户".to_string(),
            email: None,
            avatar: None,
        })
    }
    
    pub fn get_storage_info(_access_token: &str) -> Result<StorageInfo, CloudError> {
        let gb: u64 = 1024 * 1024 * 1024;
        let tb: u64 = gb * 1024;
        Ok(StorageInfo {
            total: 5 * tb,
            used: 2 * tb,
            free: 3 * tb,
        })
    }
}