<template>
  <div class="app_wrapper">
    <!-- head -->
    <head-top/>
    <!-- main -->
    <div class="main_wrapper">

      <div class="content whitebg">
        <h4>{{ article.title }}</h4>
        <div class="row clearfix" style="border-bottom: 1px solid #009688;">
          <div style="float: left;width: 50%"><i>时间：</i>{{article.created_at}}</div>
          <div style="float: left;width: 50%"><i>作者：</i>{{article.author}}</div>
          <div style="float: left;width: 50%"><i>热度：</i> {{article.looked}} ℃</div>
          <div style="float: left;width: 50%"><i>评论：</i>{{article.reply}}</div>
        </div>
        <div v-html="article.content" class="content">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import headTop from './layouts/header'
import ls from '@/utils/localStorage'
import config from '@/components/config'
import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    headTop,
    swiper,
    swiperSlide
  },
  data () {
    return {
      article: 1,
      dataList: [],
      pagination: [],
    }
  },

  created(){
    var self = this;
    var id = this.$route.query.id;
    this.axios.get(config.api+'/api/articles/'+id)
      .then(function (response) {
        self.article = response.data;

        // console.log(self.article);
      })
      .catch(function (response) {
        console.log(response);
      });

    // this.getComment();

  },

  methods: {
  },

}
</script>

<style lang="scss" scoped>

  .app_wrapper {
    background-color: #f2f2f2;
    .main_wrapper {
      .title {
        font-size: 1rem;
        color: #f00;
      }
    }
  }

  .comment_inner{

    /*width: 200px;*/

    word-break: break-all;

    text-overflow: ellipsis;

    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/

    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

    -webkit-line-clamp: 3; /** 显示的行数 **/

    overflow: hidden;  /** 隐藏超出的内容 **/

  }

  ._page_title{

    /*width: 200px;*/

    word-break: break-all;

    text-overflow: ellipsis;

    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/

    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

    -webkit-line-clamp: 1; /** 显示的行数 **/

    overflow: hidden;  /** 隐藏超出的内容 **/

  }

</style>
