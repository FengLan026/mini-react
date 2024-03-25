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
        const type =
          typeof child === 'string' || typeof child === 'number' || !child
        return type ? createTextNode(child) : child
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
  root = nextWorkOfUnit
}

let root
let nextWorkOfUnit
function workLoop(deadline) {
  let flag = false
  while (!flag && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    flag = deadline.timeRemaining() < 1
  }
  // 计算完成后插入
  if (!nextWorkOfUnit && root) {
    submitRoot()
  }
  requestIdleCallback(workLoop)
}

function submitRoot() {
  submitWork(root.child)
  root = null
}

function submitWork(fiber) {
  if (!fiber) return
  let fiberParent = fiber.parent
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }
  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom)
  }
  submitWork(fiber.child)
  submitWork(fiber.silding)
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
  const isFunction = typeof fiber.type === 'function'
  let children = fiber.props.children
  if (isFunction) {
    children = [fiber.type(fiber.props)]
  }
  // 1.创建dom
  if (!fiber.dom && !isFunction) {
    const dom = (fiber.dom = createDom(fiber.type))
    // fiber.parent.dom.append(dom)
    // 2.处理props
    handleProps(dom, fiber.props)
  }
  // 4.转换链表
  let preChild
  console.log(children)
  children.forEach((child, index) => {
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

  let newFiber = fiber
  while (newFiber) {
    if (newFiber.silding) {
      return newFiber.silding
    }
    newFiber = newFiber.parent
  }
}

requestIdleCallback(workLoop)

export default { createElement, render }
