
    const TOKENKEY='hmmtoken';
// 获取token，return

export function getToken(){
    return window.localStorage.getItem(TOKENKEY)
}
//
export function setToken(token){
    window.localStorage.setItem(TOKENKEY,token)
}

export function removeToken(){
    window.localStorage.removeItem(TOKENKEY)
}