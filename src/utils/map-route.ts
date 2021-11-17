import { RouteRecordRaw } from 'vue-router'

export default function MapRoute(userMenus: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 将该后台管理超级管理员中的url都映射出来，然后根据不用用户来筛选出路由映射
  const allRoutes: RouteRecordRaw[] = []
  // 表示递归擦选router/main文件下的ts文件。
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((item) => {
    // console.log('item', item)
    // 将ts文件导出的route添加到allRoutes
    const route = require('../router/main' + item.split('.')[1])
    allRoutes.push(route.default)
  })
  // 根据userMenus来筛选路由映射，递归
  // const filterRoutes = filterRoutesByMenus(userMenus, allRoutes)
  // routes.push(...filterRoutes)
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

// const filterRoutesByMenus = function (
//   menus: any,
//   allRoutes: RouteRecordRaw[]
// ): RouteRecordRaw[] {
//   const filterRoutes: RouteRecordRaw[] = []
//   for (const menu of menus) {
//     if (menu.type === 2) {
//       const route = allRoutes.find((route) => {
//         return route.path === menu.url
//       })
//       if (route) {
//         // filterRoutes.push(route)
//         router.addRoute('main', route)
//         console.log('router', router)
//       }
//     } else {
//       filterRoutesByMenus(menu.children, allRoutes)
//     }
//   }
//   // console.log('filterRoutes', filterRoutes)
//   return filterRoutes
// }
