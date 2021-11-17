<template>
  <div class="page-modal-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="30%"
      center
      destroy-on-close
    >
      <zh-form v-bind="formConfig" v-model="formData"></zh-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="btnAddListItem">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import ZhForm from '../../../base-ui/Form'
import { IForm } from '../../../base-ui/Form/src/type'

export default defineComponent({
  components: {
    ZhForm
  },
  props: {
    dialogTitle: {
      type: String,
      required: true
    },
    formConfig: {
      type: Object as PropType<IForm>,
      required: true
    },
    defaultValue: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)

    const btnAddListItem = () => {
      dialogVisible.value = false
      // 下面是发送网络请求
      if (Object.keys(props.defaultValue).length) {
        // 编辑
        console.log('编辑')
      } else {
        // 新建
        console.log('新建')
      }
    }

    // 处理初始化数据
    const formData = ref<any>({})

    watch(
      () => props.defaultValue,
      (newValue) => {
        for (const item of props.formConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    return {
      dialogVisible,
      btnAddListItem,
      formData
    }
  }
})
</script>
<style scoped></style>
