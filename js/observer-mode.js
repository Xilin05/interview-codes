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

console.log('--------------- 分割线 --------------');

subject.removeObserver(observer_3)
subject.notify('再次通知一下，又更新了数据')
