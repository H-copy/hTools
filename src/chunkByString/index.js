export default function chunkByString(str, size){
    const bytes = str.split('')
    const cache = []

    while(bytes.length >= size){
        cache.push(bytes.splice(0, size).join(''))
    }

    return cache
}
