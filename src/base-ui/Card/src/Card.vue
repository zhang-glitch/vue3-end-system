<template>
  <div class="card">
    <el-card class="box-card">
      <template #header>
        <div class="card-title">
          <slot name="header">{{ cardTitle }}</slot>
        </div>
      </template>
      <div class="cart-content">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    cardTitle: {
      type: String,
      default: ''
    }
  },
  setup() {}
})
</script>
<style scoped lang="less">
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  font-weight: 600;
}

.card-content {
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
  // border: 1px solid red;
}
</style>
