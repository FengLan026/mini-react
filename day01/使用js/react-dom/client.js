function cteateTextNode(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
function cteateElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'string' ? cteateTextNode(child) : child
      }),
    },
  }
}

export function render(container, vDom) {
  const dom =
    vDom.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(vDom.type)
  Object.keys(vDom.props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = vDom.props[key]
    }
  })
  vDom.props.children.forEach((child) => {
    render(dom, child)
  })
  container.append(dom)
}

export default {
  cteateElement,
  createRoot(dom) {
    return {
      render(vDom) {
        render(dom, vDom)
      },
    }
  },
}
