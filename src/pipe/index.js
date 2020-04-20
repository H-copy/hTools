/**
 * 函数组合
 * @param  { function } fns  函数组
 */
export default function pipe(...fns) {
    return arg => fns.reduce((acc, fn) => fn(acc), arg)
}