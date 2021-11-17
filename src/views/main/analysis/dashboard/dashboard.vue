<template>
  <div class="dashboard">
    <page-search
      :formOptions="formOptions"
      @handleClear="handleClear"
      @handleSearch="handleSearch"
    ></page-search>
    <page-contain-table
      :containTableConfig="containTableConfig"
      pageName="users"
      tableOperateTitle="添加列表"
      @handleAddListItem="handleAddListItem"
      @editListItem="editListItem"
      ref="pageContainTableRef"
    ></page-contain-table>
    <page-modal-dialog
      dialogTitle="添加用户"
      :formConfig="modalDialogConfig"
      ref="pageModalDialogRef"
      :defaultValue="editDefaultValues"
    ></page-modal-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import formOptions from './config/formConfig'
import containTableConfig from './config/containTableConfig'
import { PageSearch } from '../../../../components/PageSearch'
import { PageContainTable } from '../../../../components/PageContainTable'
import usePageQueryRequest from '../../../../hooks/usePageQueryRequest'
import usePageModalDialog from '../../../../hooks/usePageModalDialog'
import PageModalDialog from '../../../../components/PageModalDialog'
import modalDialogConfig from './config/modalDialogConfig'
import { useStore } from '../../../../store'
export default defineComponent({
  name: 'dashboard',
  components: {
    PageSearch,
    PageContainTable,
    PageModalDialog
  },
  setup() {
    // 模糊查询列表
    const { pageContainTableRef, handleClear, handleSearch } =
      usePageQueryRequest()

    // 过滤表单元素，来控制若干元素的隐藏与显示
    const addCallback = () => {
      const passwordItem = modalDialogConfig.formItems.find((item) => {
        return item.field === 'password'
      })
      // console.log()
      // 隐藏
      passwordItem!.isHidden = true
    }
    const editCallback = () => {
      const passwordItem = modalDialogConfig.formItems.find((item) => {
        return item.field === 'password'
      })
      // 隐藏
      passwordItem!.isHidden = true
    }
    const {
      handleAddListItem,
      editDefaultValues,
      editListItem,
      pageModalDialogRef
    } = usePageModalDialog(addCallback, editCallback)

    // 获取roleList, departmentList，然后复制给formItem中的options。
    const store = useStore()
    const roleList = computed(() => store.state.roleList)
    const departmentList = computed(() => store.state.departmentList)
    const roleItem = modalDialogConfig?.formItems.find((item: any) => {
      return item.field === 'role'
    })

    roleItem!.options = roleList.value.map((item: any) => ({
      title: item.name,
      value: item.id
    }))

    const departmentItem = modalDialogConfig?.formItems.find((item: any) => {
      return item.field === 'department'
    })

    departmentItem!.options = departmentList.value.map((item: any) => ({
      title: item.name,
      value: item.id
    }))

    return {
      formOptions,
      containTableConfig,
      modalDialogConfig,
      pageContainTableRef,
      pageModalDialogRef,
      handleAddListItem,
      editListItem,
      handleClear,
      handleSearch,
      editDefaultValues
    }
  }
})
</script>

<style scoped lang="less"></style>
