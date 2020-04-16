/**
 * 样式对象转字符
 * @param { object } style
 * @return { string } styleString
 */

export default function toStyleStr(style) {

    return Object.entries(style).reduce((acc, [key, value]) => `${acc}${key}:${value};`, '')

}