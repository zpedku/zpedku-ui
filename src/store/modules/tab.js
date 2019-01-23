export default {
  state: {
    //main entry
    mainTabs: [],
    //current tag page
    mainTabsActiveName: ''
  },
  mutations: {
    updateMainTabs(state, tabs) {
      state.mainTabs = tabs;
    },
    updateMainTabsActiveName(state, name) {
      state.mainTabsActiveName = name
    }
  }
}
