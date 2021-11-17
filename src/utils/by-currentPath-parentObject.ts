// 通过当前的url找到其父menu对象，然后返回

// 这个实现的有问题，他会将每次跳转的路由菜单都加到该数组中。
// const returnMenus: any = []
// export default function byCurrentParentObject(menus: any, path: string): any[] {
//   for (const menu of menus) {
//     if (menu.type === 1) {
//       const pathSplit = path.split('/').slice(0, -1).join('/')
//       if (menu.url === pathSplit) {
//         returnMenus.push({ name: menu.name, id: menu.id })
//       }
//       byCurrentParentObject(menu.children ?? [], path)
//     } else {
//       if (menu.url === path) {
//         returnMenus.push({ name: menu.name, id: menu.id })
//       }
//     }
//   }
//   return returnMenus
// }

// 先获取根据当前路径获取menu
function byPathToMenus(menus: any, path: string, menuArr?: any[]): any {
  for (const menu of menus) {
    if (menu.type === 1) {
      // 表示的是一级菜单
      const firstMenu = byPathToMenus(menu.children, path)
      if (firstMenu) {
        menuArr?.push({ id: menu.id, name: menu.name })
        menuArr?.push({ id: firstMenu.id, name: firstMenu.name })
      }
    } else {
      if (menu.url === path) {
        return menu
      }
    }
  }
}

export default function pathMapBreadcrumbs(
  userMenus: any[],
  currentPath: string
) {
  const breadcrumbs: any[] = []
  byPathToMenus(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
