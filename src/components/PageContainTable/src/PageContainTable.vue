<template>
  <div class="page-contain-table">
    <zh-contain-table
      :tableData="tableData"
      v-bind="containTableConfig"
      :tableDataCount="tableDataCount"
      v-model:page="pageInfo"
    >
      <!-- 列表头部插槽的实现 -->
      <template #listOperate>
        <el-button
          type="primary"
          size="medium"
          plain
          @click="handleAddListItem"
          >{{ tableOperateTitle }}</el-button
        >
      </template>
      <!-- 状态插槽 -->
      <template #status="scope">
        <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
        <el-tag type="info" v-else>禁用</el-tag>
      </template>
      <!-- 传入操作列插槽内容 -->
      <template #operateColumn="scope">
        <el-button
          plain
          size="mini"
          type="primary"
          @click="handleEditModalDialog(scope.row)"
          >编辑</el-button
        >
        <el-button plain size="mini" type="danger">删除</el-button>
      </template>
      <!-- 提供插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </zh-contain-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import ZhContainTable from '../../../base-ui/ContainTable'
import { useStore } from '../../../store'

export default defineComponent({
  props: {
    containTableConfig: {
      type: Object,
      required: true
    },
    // 用于请求每个菜单的数据，所以传入一个pageName
    pageName: {
      type: String,
      required: true
    },
    tableOperateTitle: {
      type: String,
      default: '添加用户'
    }
  },
  emits: ['handleAddListItem', 'editListItem'],
  components: {
    ZhContainTable
  },
  setup(props, { emit }) {
    const store = useStore()
    const pageInfo = ref({
      pageSize: 5,
      currentPage: 1
    })

    // 当点击分页按钮时，重新请求数据
    watch(pageInfo, () => {
      getListData()
    })
    const getListData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getListData()
    // 获取列表数据
    const tableData = computed(() =>
      store.getters[`system/getPageListData`](props.pageName)
    )
    // 获取列表条数
    const tableDataCount = computed(() =>
      store.getters[`system/getPageListDataCount`](props.pageName)
    )
    // 过滤slotName
    const otherPropSlots = props.containTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'operateColumn') return false
        return true
      }
    )

    // 当点击添加列表项时
    const handleAddListItem = () => {
      emit('handleAddListItem')
    }

    // 当点击编辑按钮的时
    const handleEditModalDialog = (item: any) => {
      emit('editListItem', item)
    }

    return {
      tableData,
      tableDataCount,
      getListData,
      pageInfo,
      otherPropSlots,
      handleAddListItem,
      handleEditModalDialog
    }
  }
})
</script>
<style scoped lang="less">
.page-contain-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
