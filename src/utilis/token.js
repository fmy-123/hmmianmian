
    const TOKENKEY='hmmtoken';
// 获取token，return

export function getToken(){
    return window.localStorage.getItem(TOKENKEY)
}
//
export function setToken(token){
    return window.localStorage.setItem(TOKENKEY,token)
}

export function removeToken(){
    return window.localStorage.removeItem(TOKENKEY)
}