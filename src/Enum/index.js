
/**
 * 枚举类
 * @param { array } 枚举配置
 * @summary 继承map 实现类似枚举类型，提供设置附属信息。拓展部分校验方法
 * @example
 *  
 *  新建方式 1
 *  const status = new Enum([
 *      
 *  [ 1, '通过', { color: 'green'  } ], 
 *  [ 2, '不通过', { color: 'red'  } ], 
 * 
 *  ])
 * 
 *  新建方式 2
 *  Enum.create([ [ 1, 'shop', 2: 'product' ] ])
 *  
 * 
 *  取值
 *  status.get(1) ==> '通过'
 *  status.get('不通过') ===> 2
 *  
 *  添加
 *  status.set(3, '待审核', { color: 'gray' })
 * 
 *  生成选项配置
 *  const options = status.entries.map(([ value, label ]) => ({ value, label }))
 *   
 *  值判断
 *  if(status.check(currentStatus, '通过')){
 *      return Promise.reject(....)
 *  }
 *  
 * 
 */
export default class Enum extends Map{

    constructor(conf) {
        super()
        const _this = this
        _this.sub = new Map([])
        _this.source = conf
        conf.map(item =>  _this.set(...item))
        
    }

    // 拓展 Map.set
    set(...args){

        let key = args[0]
        let val = args[1]
        let sub = args[2]

        if(this.has(key)){return}
        
        super.set(key, val)
        super.set(val, key)

    
        if(sub !== undefined){
            this.sub.set(key, sub)
        }
    
    }

    keys(callback){
        const keys = [...this.sub.keys()]
        return callback ? keys.map(callback) : keys
    }
    
    values(callback){
        const _this = this
        const values = this.keys(key => _this.get(key))
        return callback ? values.map(callback) : values
    }

    entries(callback){
        return callback ? this.source.map(callback) : this.source
    }
    
    /**
     * 获取附属数据
     * @param { any } key 取值键 
     */
    getSub(key){
        let valKey = this.sub.has(key) ? key : this.get(key)
        return this.sub.get(valKey)
    }
    
    check(key, val){

        if(!this.has(key)){ throw `键${key}不存在` }
        return this.get(key) === val

    }

    /**
     * 解析拆分，附属信息
     * @param { array } conf 枚举配置列表
     */
    static parse(conf){

        return conf.reduce((acc, [ key, val, sub ]) => {

            return {

                map: [
                    ...acc.map,
                    [ key, val ],
                    [val, key]
                ],

                sub: sub ? [...acc.sub, [key, sub] ] : acc.sub
            }

        }, { map: [], sub:[] })
        
    }

    static create(conf){
        return new Enum(conf)
    }
    
}