function createTextNode(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'string' ? createTextNode(child) : child
      }),
    },
  }
}

function render(container, el) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  }
}

let nextWorkOfUnit
function workLoop(deadline) {
  let flag = false
  while (!flag && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    flag = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

function createDom(type) {
  return type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(type)
}

function handleProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function performWorkOfUnit(fiber) {
  // 1.创建dom
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))
    fiber.parent.dom.append(dom)
    // 2.处理props
    handleProps(dom, fiber.props)
  }
  // 4.转换链表
  let preChild
  fiber.props.children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      silding: null,
      parent: fiber,
      dom: null,
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      preChild.silding = newFiber
    }
    preChild = newFiber
  })
  // 5.返回下一个节点;
  if (fiber.child) {
    return fiber.child
  }
  if (fiber.silding) {
    return fiber.silding
  }
  return fiber.parent?.silding
}

requestIdleCallback(workLoop)

export default { createElement, render }
