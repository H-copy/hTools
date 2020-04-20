/**
 * 拼接路由参数
 * @param { object } obj 参数对象
 * @returns { string } 
 */

export default function joinUrlParams(url, obj){
    if(!!!obj){return url }
    return Object.entries({...obj}).reduce(( acc, [ key, value ] ) => `${acc}&${key}=${value}`, `${url}?` )
}   