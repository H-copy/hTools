/**
 * 状态管理
 * @summer 通过扩展 Map 实现条件状态管理仓库
 */
export default class Branch extends Map {

    constructor(...args) {
        super([...args])
    }

    // 包装run方法，判断条件为true时跳过后续判断
    some(...args) {
        return this.run(false, ...args)[0]
    }


    // 包装run方法，执行所有判断条件
    filter(...args) {
        return this.run(true, ...args)
    }

    /**
    * @param { boolean } isAll 是否执行所有判断条件
    * @param  {...any} args 判断参数，当判断条件或执行项为函数时，将作为函数参数
    * @returns {[]any} 返回判断条件为true的值
    */
    run(isAll = false, ...args) {


        const maps = [...this.entries()]
        const { data } = maps.reduce((acc, [conditon, action]) => {

            // 是否首次判断为true时跳出循环
            if (!acc.keep && !isAll) {
                return acc
            }

            // 执行判断函数
            let _keep = isFunction(conditon) ? conditon(...args) : !!conditon
            acc.keep = !_keep

            // 缓存真值数据
            if (_keep) {
                let _data = isFunction(action) ? action(...args) : action
                _keep && acc.data.push(_data)
            }

            return acc

        }, { keep: true, data: [] })

        return data
    }

    static create(...args) {
        return new Branch(...args)
    }

}