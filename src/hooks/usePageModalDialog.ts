import PageModalDialog from '@/components/PageModalDialog'
import { ref } from 'vue'

type callbackFn = () => void

export default function pageModalDialog(
  addCallback?: callbackFn,
  editCallback?: callbackFn
) {
  const pageModalDialogRef = ref<InstanceType<typeof PageModalDialog>>()

  // 点击编辑按钮的时候，我们需要回写数据
  const editDefaultValues = ref({})

  // 添加列表项,显示modalDialog
  const handleAddListItem = () => {
    editDefaultValues.value = {}
    addCallback && addCallback()
    if (pageModalDialogRef.value) {
      pageModalDialogRef.value.dialogVisible = true
    }
  }
  // 点击编辑按钮时
  const editListItem = (item: any) => {
    editDefaultValues.value = { ...item }
    editCallback && editCallback()
    if (pageModalDialogRef.value) {
      pageModalDialogRef.value.dialogVisible = true
    }
  }

  return {
    handleAddListItem,
    editDefaultValues,
    editListItem,
    pageModalDialogRef
  }
}
