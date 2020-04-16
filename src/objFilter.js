/**
 * 提取指定对象属性
 * @param { string[] } props 
 * @param { obj } source 
 * @return { obj } 返回集合指定属性对象
 * 
 */
export default function objFilter(props, source) {
    return props.reduce((acc, prop) => {
        acc[prop] = source[prop]
        return acc
    }, {})
}
