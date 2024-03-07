console.log('----------- 观察者模式 ----------');
// 定义一个发布者
class Subject {
  constructor () {
    this.observers = []
  }

  addObserver (observer) {
    this.observers.push(observer)
  }

  removeObserver (observer) {
    const index = this.observers.indexOf(observer)

    if (index !== -1) this.observers.splice(index, 1)
  }

  notify (data) {
    this.observers.forEach(observer => {
      observer.update(data)
    })
  }
}

class Observer {
  constructor (ob) {
    this.info = ob
  }

  update (data) {
    console.log(`观察者“${this.info.name}”接收到了信息：${data}`);
  }
}

const subject = new Subject()
const observer_1 = new Observer({ name: '家长' })
const observer_2 = new Observer({ name: '老师' })
const observer_3 = new Observer({ name: '朋友' })

subject.addObserver(observer_1)
subject.addObserver(observer_2)
subject.addObserver(observer_3)
subject.notify('通知一下，更新了数据')

console.log('--- 移除掉其中一个观察者：observer_3 ---');

subject.removeObserver(observer_3)
subject.notify('再次通知一下，又更新了数据')

console.log('★★★★★★★★★★ 在vue源码中的应用如下： ★★★★★★★★★★');

class Watcher {
  constructor (vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    Dep.target = this
    // 触发 getter，收集依赖
    this.vm[this.key]
    Dep.target = null
  }

  update () {
    // 更新试图
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

// 定义依赖对象
class Dep {
  constructor () {
    this.subscribers = []
  }

  depend () {
    if (Dep.target && !this.subscribers.includes(Dep.target)) {
      // 收集依赖
      this.subscribers.push(Dep.target)
    }
  }

  notify () {
    // 通知更新
    this.subscribers.forEach(subscriber => subscriber.update())
  }
}

// 定义响应式数据劫持函数
function defineReactive (obj, key, val) {
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get () {
      dep.depend()
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        val = newVal
        dep.notify()
      }
    }
  })
}

// 创建Vue示例
class Vue {
  constructor (options) {
    this.data = options.data

    for (let key in this.data) {
      defineReactive(this.data, key, this.data[key])
    }

    new Watcher(this, options.key, options.updateFn)
  }
}