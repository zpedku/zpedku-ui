export default {
  state: {
    //main entry
    mainTabs: [],
    //current tag page
    mainTabsActiveName: ''
  },
  mutations: {
    updateMainTabs(state, tab) {
      state.mainTabs = tab;
    },
    updateMainTabsActiveName(state, name) {
      state.mainTabsActiveName = name
    }
  }
}
