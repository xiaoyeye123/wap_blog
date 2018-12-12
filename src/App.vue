<template>
  <div id="app">

    <router-view/>

    <footer-bottom/>
  </div>
</template>

<script>
import headTop from './components/layouts/header'
import footerBottom from './components/layouts/footer'
export default {
  components: {
    headTop,
    footerBottom
  },
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 46px;
}

$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
@import "~font-awesome/scss/font-awesome";

</style>
