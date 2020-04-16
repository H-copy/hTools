/**
 * async 格式化包装
 * @param { promise } promise 被包装promise
 * @returns { pormise } 包装后的promise
 * @summary 将 aysnce await 错误作为返回值的处理方式
 * 
 * @example
 *  asynce load(){
 * 
 *      const [ res, err ] = await asyncFormat( api(...) ) 
 *      
 *      if(err) return
 *  
 *  }
 */
export default async function asyncFormat(promise) {
    return promise.then(res => [res, null]).catch(err => [null, err])
  }