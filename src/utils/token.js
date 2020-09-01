// ------------------token封装------------------
const tokenKey = "admin-token";
const usernameKey = "username";

// 设置token
export function setToken(token) {
    return sessionStorage.setItem(tokenKey, token);
}
// 获取token
export function getToken() {
    return sessionStorage.getItem(tokenKey);
}
// 移除token
export function removeToken() {
    return sessionStorage.removeItem(tokenKey);
}
// 设置username
export function setUsername(username) {
    return sessionStorage.setItem(usernameKey, username);
}
// 获取username
export function getUsername() {
    return sessionStorage.getItem(usernameKey);
}
// 移除username
export function removeUsername() {
    return sessionStorage.removeItem(usernameKey);
}