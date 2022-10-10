<!--
  功能：功能描述
  时间：2022年07月27日 16:00:26
  版本：v1.0
-->
<template>
  <div class="container">
    <div class="box">{{ num }}</div>
    <el-button type="primary" @click="add">主要按钮</el-button>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'HomeItem',
  setup() {
    const data = reactive({
      num: 0,
    })
    console.log(data)

    let num = $ref(1)

    const add = () => {
      num++
    }

    console.log(import.meta.env.MODE)

    onBeforeMount(() => {})
    onMounted(() => {})
    return {
      ...toRefs(data),
      add,
      num,
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  color: red;

  .box {
    width: 100px;
    height: 100px;
    background-color: pink;
  }
}
</style>
