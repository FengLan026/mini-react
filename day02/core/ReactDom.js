import React from './React.js'
const { createElement, render } = React
export default {
  createElement,
  createRoot(dom) {
    return {
      render(vDom) {
        render(dom, vDom)
      },
    }
  },
}
