// const Root = document.getElementById('root')
// const App = document.createElement('div')
// App.id = 'App'
// Root.append(App)
// // 创建文本, 参数必传
// const ElDOM = document.createTextNode('')
// ElDOM.nodeValue = 'app'
// App.append(ElDOM)

// ==========================
// const vDom = {
//   type: 'div',
//   props: {
//     id: 'App',
//     children: [
//       {
//         type: 'TEXT_ELEMENT',
//         props: {
//           nodeValue: 'app',
//           children: [],
//         },
//       },
//     ],
//   },
// }

// function render(container, vDom) {
//   const dom =
//     vDom.type === 'TEXT_ELEMENT'
//       ? document.createTextNode('')
//       : document.createElement(vDom.type)
//   Object.keys(vDom.props).forEach((key) => {
//     if (key !== 'children') {
//       dom[key] = vDom.props[key]
//     }
//   })
//   container.append(dom)
//   vDom.props.children.forEach((child) => {
//     render(dom, child)
//   })
// }

// const container = document.getElementById('root')
// render(container, vDom)

// ========================

import ReactDOM from './react-dom/client.js'
import App from './App.js'
ReactDOM.createRoot(document.getElementById('root')).render(App)
