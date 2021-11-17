<template>
  <div class="overview">
    <page-search :formOptions="formOptions"></page-search>
    <page-contain-table
      :containTableConfig="containTableConfig"
      pageName="role"
    ></page-contain-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import formOptions from './config/formConfig'
import containTableConfig from './config/containTableConfig'
import { PageSearch } from '../../../../components/PageSearch'
import { PageContainTable } from '../../../../components/PageContainTable'
export default defineComponent({
  name: 'dashboard',
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
