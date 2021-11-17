<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '60px' : '210px'" class="main-menu">
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="main-right">
        <el-header>
          <nav-header @changeFoldExpand="changeFoldExpand"></nav-header>
        </el-header>
        <el-main>
          <div class="main-right-bottom">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NavMenu } from '../../components/NavMenu'
import { NavHeader } from '../../components/NavHeader'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const changeFoldExpand = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return { changeFoldExpand, isCollapse }
  }
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  .main-container {
    width: 100%;
    height: 100%;

    .main-menu {
      overflow: hidden;
      background: #00142c;
    }

    .main-right {
      .el-header {
        background: #fffeff;
      }
      .el-main {
        background: #f3f2f5;
        .main-right-bottom {
          background: #ffffff;
          width: 100%;
          // height: 100%;
          // padding
        }
      }
    }
  }
}
</style>
