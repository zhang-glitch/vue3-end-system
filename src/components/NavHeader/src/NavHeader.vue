<template>
  <div class="nav-header">
    <div class="collapse" @click="changeFoldExpand">
      <el-icon class="fold-icon">
        <fold v-if="!isFold" />
        <expand v-else />
      </el-icon>
    </div>
    <div class="nav-header-right">
      <!-- 面包屑 -->
      <div class="nav-crumbs">
        <el-breadcrumb separator="/">
          <template v-for="menu in filterMenus" :key="menu.id">
            <el-breadcrumb-item :to="{}">{{ menu.name }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <!-- 用户下拉菜单 -->
      <div class="user-info-menu">
        <el-dropdown>
          <div v-if="userInfo">
            <el-avatar size="small" class="user-avatar"> user </el-avatar>
            <span class="user-name">{{ userInfo.realname }}</span>
            <el-icon>
              <arrow-down />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item> 退出登录 </el-dropdown-item>
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '../../../store'
import { useRoute } from 'vue-router'
import pathMapBreadcrumbs from '../../../utils/by-currentPath-parentObject'
export default defineComponent({
  emits: ['changeFoldExpand'],
  setup(props, { emit }) {
    const store = useStore()
    const isFold = ref(false)
    const changeFoldExpand = () => {
      isFold.value = !isFold.value
      // 发送事件到main组件，控制menu得折叠，通过width属性。
      emit('changeFoldExpand', isFold.value)
    }
    const userInfo = computed(() => store.state.login.userInfo)

    // 获取当前url，返回该父子menus
    const filterMenus = computed(() => {
      const path = useRoute().path
      const userMenus = computed(() => store.state.login.userMenus)
      // return byCurrentParentObject(userMenus.value, path)
      //   .slice(-3, -1)
      //   .reverse()
      return pathMapBreadcrumbs(userMenus.value, path)
    })

    return {
      changeFoldExpand,
      isFold,
      userInfo,
      filterMenus
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;

  .collapse {
    .el-icon {
      font-size: 20px;
      vertical-align: middle;
    }
  }

  .nav-header-right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .user-info-menu {
      display: flex;
      align-items: center;
      cursor: pointer;
      .user-avatar {
        vertical-align: middle;
      }

      .user-name {
        padding-left: 10px;
        padding-right: 5px;
      }
    }
  }
}
</style>
