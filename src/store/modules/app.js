export default {
  state: {
    appName: 'Zpdeku Platform',
    themeColor: '#14889A',
    oldThemeColor: '#14889A',
    collapse: false,
    menuRouteLoaded: false
  },

  getters: {
    collapse(state) {
      return state.collapse
    }
  },
  mutations: {
    onCollapse(state) { // 改变收缩状态
      state.collapse = !state.collapse
    },
    setThemeColor(state, themeColor) {
      state.oldThemeColor = state.themeColor
      state.themeColor = themeColor;
    },
    menuRouteLoaded(state, menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded;
    }
  },
  actions: {}
}
