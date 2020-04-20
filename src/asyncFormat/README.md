# asyncFormat
> 将promise 返回值，改为go模式, 用在async ，替代 try catch 错误捕获


### Example
```js

import { asyncFormat } from 'left-f-tools'

async function getList(){

    const [ res, err ] = await asynceFormat(fetch(url))
    
    if(err){ alter(err.message); return }
    
    ....

}


```


### Params

| 名称    | 说明               | 默认值 |
| ------- | ------------------ | ------ |
| promise | 被包装 promise对象 |        |





### Result

| 名称     | 说明                                | 类型        |
| -------- | ----------------------------------- | ----------- |
| ps       | 被包装后的Promise对象, 返回结果数组 | Promise     |
| -- > res | reslove 结果                        | any \| null |
| --> err  | reject  结果                        | any \| null |

```js

const [ res, err ] = await asynceFormat( promise.reslove(true) )
// [ res, err ] = [ true, null ]


const [ res, err ] = await asynceFormat( promise.reject(true) )
// [ res, err ] = [ null, true ]

```

