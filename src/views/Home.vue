<template>
  <div>
    <nav-bar></nav-bar>
    <header-bar></header-bar>
    <main-contetnt></main-contetnt>
  </div>
</template>

<script>
  import HeaderBar from './HeaderBar'
  import MainContetnt from './MainContent/MainContent'
  import NavBar from './NavBar/NavBar'

  export default {
    name: "Home",
    components:{
      NavBar,
      HeaderBar,
      MainContetnt
    }
  }
</script>

<style scoped>

</style>
