<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" />
      <span v-if="!collapse" class="logo-title">vue3+ts</span>
    </div>
    <div class="menu">
      <el-menu
        :default-active="activeId"
        :collapse="collapse"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
      >
        <template v-for="menuItem in menuList" :key="menuItem.id">
          <template v-if="menuItem.type == 1">
            <el-sub-menu :index="menuItem.id + ''">
              <template #title>
                <el-icon v-if="menuItem.icon" class="menu-icon">
                  <component :is="menuItem.icon"></component>
                </el-icon>
                <span class="menu-icon-item">{{ menuItem.name }}</span>
              </template>
              <template v-for="subItem in menuItem.children" :key="subItem.id">
                <el-menu-item
                  :index="subItem.id"
                  @click="handleMenuItemRoute(subItem)"
                >
                  {{ subItem.name }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <!-- 一级菜单，表示不能展开 -->
            <el-menu-item :index="menuItem.id">
              <i v-if="menuItem.icon" class="menuItem.icon"></i>
              <span>{{ menuItem.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
// 奇怪，为什么别名引入的模块，没有变量引用提示
import { useStore } from '../../../store'
import { computed, defineComponent, markRaw } from 'vue'
import { Monitor, ChatDotRound, Tools, Suitcase } from '@element-plus/icons'
import { useRouter } from 'vue-router'
import localCache from '../../../utils/cache'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const menuList = computed(() => store.state.login.userMenus)
    const router = useRouter()
    // 整理数据，添加图标组件
    menuList.value.forEach((item: any) => {
      // if(item.icon)
      switch (item.icon) {
        case '<monitor />':
          item.icon = markRaw(Monitor)
          break
        case '<chat-dot-round />':
          item.icon = markRaw(ChatDotRound)
          break
        case '<tools />':
          item.icon = markRaw(Tools)
          break
        case '<suitcase />':
          item.icon = markRaw(Suitcase)
          break
        default:
          item.icon = ''
          break
      }
    })

    // 点击菜单跳转路由
    const handleMenuItemRoute = (menu: any) => {
      // activeId.value = menu.id
      // 将当前活跃菜单的id存储在localstore中
      localCache.setCache('activeId', menu.id)
      router.push(menu.url)
    }
    // 获取刷新前的活跃菜单的id
    const activeId = localCache.getCache('activeId')
    return {
      menuList,
      activeId,
      handleMenuItemRoute
    }
  }
})
</script>
<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .logo-title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }
  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .menu-icon {
      font-size: 16px;
      margin-top: -3px;
      padding-right: 6px;
    }

    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .menu:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>
