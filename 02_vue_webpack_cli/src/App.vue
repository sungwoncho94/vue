<!-- 1. 최상위에는 반드시 하나의 테그만 있어야함! -->
<template>
  <div>
    <TodoList category="취업준비" />
    <TodoList category="SSAFY" />
    <TodoList category="기타" />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue' 

export default {
  components: {
    TodoList
  }
}
</script>

<style>

</style>