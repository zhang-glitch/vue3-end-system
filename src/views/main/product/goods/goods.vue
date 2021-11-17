<template>
  <div class="goods">
    <page-search :formOptions="formOptions"></page-search>
    <page-contain-table
      :containTableConfig="containTableConfig"
      pageName="goods"
    >
      <!-- 对图片的插槽处理 -->
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          hide-on-click-modal
        >
        </el-image>
      </template>
      <!-- 对价格进行处理 -->
      <template #oldPrice="scope"> ￥{{ scope.row.oldPrice }} </template>
      <template #newPrice="scope"> ￥{{ scope.row.newPrice }} </template>
    </page-contain-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import formOptions from './config/formConfig'
import containTableConfig from './config/containTableConfig'
import { PageSearch } from '../../../../components/PageSearch'
import { PageContainTable } from '../../../../components/PageContainTable'
export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageContainTable
  },
  setup() {
    return {
      formOptions,
      containTableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
