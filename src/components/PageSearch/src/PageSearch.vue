<template>
  <div class="page-search">
    <zh-form v-bind="formOptions" v-model="formValues">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <el-button plain size="medium" type="danger" @click="handleClear"
          >重置</el-button
        >
        <el-button plain size="medium" type="primary" @click="handleSearch"
          >搜索</el-button
        >
      </template>
    </zh-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import ZhForm from '../../../base-ui/Form'
import { IForm } from '../../../base-ui/Form/src/type'

export default defineComponent({
  props: {
    formOptions: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  components: {
    ZhForm
  },
  emits: ['handleClear', 'handleSearch'],
  setup(props, { emit }) {
    const originFormValues: any = {}
    props.formOptions.formItems.forEach((item) => {
      originFormValues[`${item.field}`] = ''
    })
    // 定义表单相关的数据。
    const formValues = ref(originFormValues)
    // 处理清空按钮
    const handleClear = () => {
      // formValues.value = originFormValues
      for (const key in originFormValues) {
        formValues.value[`${key}`] = originFormValues[key]
      }

      // 将事件传入父组件
      emit('handleClear')
    }

    // 处理搜索
    const handleSearch = () => {
      emit('handleSearch', formValues.value)
    }
    return {
      formValues,
      handleClear,
      handleSearch
    }
  }
})
</script>
<style scoped></style>
