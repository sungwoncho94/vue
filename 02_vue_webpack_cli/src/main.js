// nodejs에서 vuejs를 사용하는 방법
import Vue from 'vue'  // export default랑 한세트!
import App from './App.vue'


// 실제 개발시
new Vue({
  render: (h) => h(App)
}).$mount('#app')
// 1. 새로운 vue instance를 만들겠다.
// 2. App.vue: 최상위 컴퍼넌트가 된다.
// 3. html문서에서도 보여질 때 app 이라는 id에서 시작을 하겠다.

// 이것을 간소화시킨 것이 위에!
// new Vue({
//   render: function(createElement) {
//     return createElement(App)
//   }
// }).$mount('#app')  // 새로운 vue instance를 만들겠다.

