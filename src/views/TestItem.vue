<template>
  <div>{{ count }}</div>
  <el-button @click="add">click me</el-button>
  <div>{{ test }}</div>
  <div>{{ num2 }}</div>
</template>

<script setup name="TestItem">
import { reactive, toRefs, watch, onBeforeMount, onMounted } from 'vue'
let count = $ref(1)

const num = reactive({
  test: '1',
  num2: '2',
})

const { test, num2 } = toRefs(num)
console.log(test, num2)

watch(
  () => count,
  (newValue, oldValue) => {
    console.log('new', newValue, 'old', oldValue)
  },
)

function add() {
  count++
}
</script>

<style scoped lang="scss"></style>
