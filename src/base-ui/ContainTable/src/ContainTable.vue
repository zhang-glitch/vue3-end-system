<template>
  <div class="contain-table">
    <!-- 列表头部组件插槽 -->
    <div class="list-header">
      <slot name="header">
        <!-- 提供默认的插槽内容 -->
        <div class="list-title">{{ listTitle }}</div>
        <div class="list-operate">
          <slot name="listOperate"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <!-- 对选中列进行封装 -->
      <el-table-column
        v-if="isSelectColumn"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <!-- 对于编号栏是否存在进行封装 -->
      <el-table-column
        v-if="isNumberColumn"
        type="index"
        label="编号"
        width="80"
        align="center"
      ></el-table-column>
      <template v-for="prop in propList" :key="prop.prop">
        <el-table-column v-bind="prop" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="prop.slotName" :row="scope.row">
              {{ scope.row[prop.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 列表尾部组件插槽 -->
    <div class="list-footer">
      <slot name="listFooter">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="tableDataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    // 是否具有编号列
    isNumberColumn: {
      type: Boolean,
      default: false
    },
    // 是否具有选中列
    isSelectColumn: {
      type: Boolean,
      default: false
    },
    // 列表标题
    listTitle: {
      type: String,
      required: true
    },
    tableDataCount: {
      type: Number,
      default: 0
    },
    // 分页参数
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    // 处理分页器
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>
<style scoped lang="less">
.list-header {
  display: flex;
  height: 45px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;

  .list-title {
    font-size: 20px;
    font-weight: 700;
  }

  .list-operate {
    align-items: center;
  }
}

.list-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
}
</style>
