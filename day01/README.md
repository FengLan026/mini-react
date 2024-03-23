> 仿 reactAPI 实现 dom 渲染

```js
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

> 问题:

- 今天学到了什么
  - `document.createTextNode` 创建文本节点
  - vite 将 jsx 自动解析为`React.cteateElement`函数
  - 使用 vitest 进行单元测试
- 里面的哪些知识点是可迁移的？ (可以直接用到工作中的)
  功能点拆分
- dom 树层级太多时递归会影响性能, 可能导致堆栈溢出, 同时存在重复计算的问题;
- 放上你写的代码链接(让你动手)
