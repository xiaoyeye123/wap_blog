
/**********************************************/
/* src/components/header/head.vue             */
/**********************************************/

<template>
  <header id="head" class='header'>
    <span class="head_toggle" @click="toggleSideBar"><i class="iconfont icon-category"></i></span>
    <nav>
      <ul id="starlist" :class="[{ in: sidebar }]" style=" margin-top: 0; margin-bottom: 0px;">

        <li v-for="(item, index) in navList">
          <router-link :to="item.url" >
            {{ item.navname }}
          </router-link>
        </li>
      </ul>
    </nav>
    <span class="head_logo">YSL BLOG</span>
  </header>
</template>

<script>
export default {
  data () {
    return {
      sidebar: true,
      navList: [
        {navname : '首页', url : '/'},
        {navname : '分类', url : '/type'},
        {navname : '博主', url : '/my'},
        {navname : '个人中心', url : '/my'},
      ],
    }
  },
  methods: {
    toggleSideBar () {
      this.sidebar = !this.sidebar
      if (this.sidebar == true) {

      } else {

      }
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
  .in {
    display: none;
  }
</style>
