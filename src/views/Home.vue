<template>
  <div>
    <header-bar></header-bar>
    <main-contetnt></main-contetnt>
  </div>
</template>

<script>
  import HeaderBar from './HeaderBar'
  import MainContetnt from './MainContent/MainContent'

  export default {
    name: "Home",

    components:{
      HeaderBar,
      MainContetnt
    }
  }
</script>

<style scoped>

</style>
