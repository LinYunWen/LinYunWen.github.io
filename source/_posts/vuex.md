---
title: Vuex
date: 2021-07-24 15:22:13
tags: [note, vue]
---

# Vuex
> - `Vue` \+ flu`x` = `vuex`
> -   單向資料流
> -   Flux design pettern
> -   統一管理應用程式所有狀態

## introduction
- ![](https://i.imgur.com/TfX0QiO.png)
- 我們使用 vuex 官方流程圖來解釋：所有的動作都是從 `action` 出發，接著到了 store 把結果存起來改變 `state` 然後因為 state 改變了，所以 view（元件或頁面）就會跟著改變。
- 只有一個重點，就是這一連串的行為是`不可逆`的，因此稱為：`單向資料流`。

![](https://i.imgur.com/5NEkeuQ.png)
- 在 Vuex 裡面，儲存狀態的為 State，組件需要更動狀態時，需要透過 Actions 發出一個 Commit 去呼叫 Mutations，再由 Mutations 去更改 State。整個 Vuex 的方法也稱為 store。接下來再來一一說明整個步驟流程。

![](https://i.imgur.com/19G91dY.png)

<!--more-->
### store
- 存放資料和基本設定
    - 而存放資料的是 store 中的 state
    - 如果沒有特別設定就是會是全 component 都取用得到
- 每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

new Vue({
  el: '#app',
  store: store,
})
```
- 然後就可以利用 this.$store.commit("{mutation}") 來去觸發 mutation
```javascript
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```
```javascript
<template>
  <div>
    <p>Loading: {{ifLoading}}</p>
    <button @click="reverseLoad()">Reverse</button>
  </div>
</template>
<script>
export default {
  name: "app",
  computed: {
    ifLoading() {
      // 在這邊吐回state裡面的isLoading
      return this.$store.state.isLoading;
    }
  },
  methods: {
    // 在這邊commit store裡面的Loaded這個mutation
    reverseLoad() {
      this.$store.commit("Loaded");
    }
  }
};
</script>
```
#### mapState
```javascript
mport { mapState } from "vuex";
export default {
  name: "app",
  components: {},
  computed: mapState([
    // 需要的state在這邊
    'isLoading',
    'clickedTimes'
  ]),
  // or
  // computed: mapState({
  //   ifLoading: "isLoading",
  //   Times: "clickedTimes"
  // }),
  // or
  // computed: mapState({
  //     ifLoading(state) {
  //       return state.isLoading;
  //     },
  //     Times(state) {
  //       return state.clickedTimes;
  //     }
  // }),
  methods: {
    reverseLoad() {
      this.$store.commit("Loaded");
    },
    addTimes() {
      this.$store.commit("addTimes");
    }
  }
};
```


### mutation
- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
    - 而呼叫 mutation 的方式就是使用 commit (`this.$store.commit`)
- Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方
- 并且它会接受 state 作为第一个参数，以及 Payload 可為第二個
- Mutation 必须是同步函数
```javascript
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}

store.commit('increment', 10)
```
- 对象风格的提交方式
    - 提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象：
    ```javascript
    store.commit({
      type: 'increment',
      amount: 10
    })

    ```
    ```javascript
    mutations: {
      increment (state, payload) {
        state.count += payload.amount
      }
    }
    ```
:::warning
- 基本上沒辦法直接在 mutation 中，新建立 state 的 key，除非使用 `Vue.set`
    1.  最好提前在你的 store 中初始化好所有所需属性。
    2.  当需要在对象上添加新属性时，你应该
        -   使用 `Vue.set(obj, 'newProp', 123)`, 或者
        -   以新对象替换老对象。
            ```
            state.obj = { ...state.obj, newProp: 123 }
            ```


:::

#### mapMutations
```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```


### action
> -   Action 提交的是 mutation，而不是直接变更状态。
> -   Action 可以包含任意异步操作。
-   傳入參數 context 之中，有 commit 和 dispatch function ，以供觸發 mutation 或是再呼叫其他 action
    -   或者通过 context.state 和 context.getters 来获取 state 和 getters
    -   在一般 method 中使用 `this.$store.dispatch` 來呼叫
    -   同樣有 payload 可以放

    ```javascript
    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment (state) {
          state.count++
        }
      },
      actions: {
        increment (context) {
          context.commit('increment')
        }
        // or 
        // increment ({ commit }) {
        //     commit('increment')
        // }
      }
    })
    ```
```javascript
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```
#### mapActions
```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

### getter
- Getters 就是 store 裡面的 computed
    - Getters 簡單說就是可以把 state 處理過後再丟出去的人，接續上中篇的範
- getters 除了帶入 state 之外，總共可以帶入三種參數：
    1.  state
    2.  其他 getters
    3.  函式

```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```
```javascript
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

#### mapGetters

```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
```javascript
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### module
- 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

- 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
- 使用了 module 之後，**module 們的 actions, mutations, getters 都是全域共用的**

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
- 這樣对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象，並非全部都可以取用到
    - 如果真的要用到可以对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`
```javascript
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  },
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```
#### namespace
- 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
```javascript
const moduleUser = {
    namespaced: true,
    actions: {
        sayHi() {
            console.log('Hello from moduleUser')

        }
    }
}
...
const store = new Vuex.Store({
  // 根部的state
  state: {
    age: 20,
    gender: "female"
  },
  // 註冊modules
  modules: {
    user: moduleUser,
    another: moduleAnother
  }
})
...
mounted() {
  this.$store.dispatch("user/sayHi");
  this.$store.dispatch("another/sayHi");
},

...mapGetters({
  GetAge: "user/GetAge",
  GetRealAge: "user/GetRealAge",
  GetNextAge: "user/GetNextAge"
})
```
- 如果在這種狀況下想要呼叫最上層的
    - `commit('user/addAge', 2, { root: true })`
    - 第一個參數一樣是要呼叫的別的 module 的 mutations，第二個參數則為 payload，如果不需要 payload，也可以寫 null 就好，第三個 { root: true } 表示為根部，就是從底部找的意思，開啟 namespaced 後，module 之間的 actions, getters, mutations 之間要互相呼叫都要記得加上{ root: true }，如果沒有加上這句話，vuex 會當作你還是要呼叫自己的東西，就會錯了

```javascrip
...mapState({
  MyName: state => state.user.name,
  gender: state => state.user.gender,
  addr: state => state.user.addr
}),
// to 
...mapState("user", {
  MyName: state => state.name,
  gender: state => state.gender,
  addr: state => state.addr
}),
```

- 
## Reference
- [Vuex 是什么？](https://vuex.vuejs.org/zh/)
- [[Vue] Vuex 是什麼? 怎麼用? — State、Mutations (1/5)](https://medium.com/itsems-frontend/vue-vuex1-state-mutations-364163b3acac)