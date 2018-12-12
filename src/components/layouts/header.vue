
/**********************************************/
/* src/components/header/head.vue             */
/**********************************************/

<template>
  <header id="head" class='header'>
    <span class="head_toggle" @click="toggleSideBar"><i class="iconfont icon-category"></i></span>
    <span class="head_logo">YSL BLOG</span>
  </header>
</template>

<script>
export default {
  data () {
    return {
      sidebar: false
    }
  },
  methods: {
    toggleSideBar () {
      this.sidebar = !this.sidebar
      console.log('sidebar  current value: ' + this.sidebar)
    }
  }
}
</script>

<style lang="scss" scoped>
  /*header*/
  .header {
    background-color: #3190e8;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    text-align: center;
    width: 100%;
    height: 1.95rem;

    .head_toggle {
      position: absolute;
      left:0.5rem;
      i {
        line-height: 1.95rem;
        font-size: 1rem;
      }
    }

    .head_logo {
      line-height: 41px;
      font-size: 1rem;
      color: #fff;
    }
  }
</style>
