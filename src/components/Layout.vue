<template>
  <div class="app_wrapper">
    <!-- head -->
    <head-top/>
    <!-- main -->
    <div class="main_wrapper">

    </div>
    <div class="scroll">
      <swiper class="swiper" :options="swiperOption"  ref="mySwiper">
        <div class="swiper-slide" v-for="banner in banners">
          <img :src="banner">
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
        <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
        <!--<div class="swiper-button-next" slot="button-next"></div>-->
      </swiper>
    </div>

    <div class="content whitebg">
      <h2 class="htitle">最新文章</h2>

      <ul>
        <li class="article" v-for="blog in dataList">
          <h3 class="articleTitle" style="font-size: 19px">
            <!--<b style="color: #F00;">【顶】</b>-->
            <router-link :to="{ name: 'Article', query: { id: blog.id }}">
              {{ blog.title}}
            </router-link>
          </h3>

          <div class="clearfix" style="margin-top: 10px">
            <div class="artimg">
              <img :src="blog.img" alt="" style="width:100%">
            </div>

            <div class="artdesc">
              <p class="descp">
                {{ blog.desc }}
              </p>
            </div>
          </div>

          <div style="margin-top: 5px" class="clearfix">
            <span style="width: 33%;float: left">【{{ blog.author }}】</span>
            <span style="width: 33%;float: left">【{{ blog.created_at }}】</span>
            <span style="width: 33%;float: left">【{{ blog.type }}】</span>
          </div>

          <div style="margin-top: 10px;">
            <router-link :to="{ name: 'Article', query: { id: blog.id }}"><button class="btn btn-info" style="width: 90%">查看更多</button></router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headTop from './layouts/header'
import ls from '@/utils/localStorage'
import config from '@/components/config'

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import footerBottom from './layouts/footer'
export default {
  components: {
    headTop,
    swiper,
    swiperSlide
  },
  data () {
    return {
      dataList: [],
      banners: [
        'http://www.xiaoyeyedada.cn/images/banners/1.jpg',
        'http://www.xiaoyeyedada.cn/images/banners/2.jpg',
        'http://www.xiaoyeyedada.cn/images/banners/4.jpg',],
      // 设置属性
      swiperOption: {
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 切换模式  横屏或者竖屏
        // direction : 'vertical',
        // 设置自动播放速度
        autoplay: {
          disableOnInteraction: false,
          delay: 4000
        },
        // 开启无限循环
        loop: true,
        // 设置点击箭头
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        // 设置同屏显示的数量，默认为1，使用auto是随意的意思。
        slidesPerView: 1,
        // 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
        mousewheel: true
        // 默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
        // freeMode:true
      }
    }
  },
  created(){
    var self = this;

    this.axios.get(config.api+'/api/recommend')
      .then(function (response) {
        self.dataList = response.data.data;
        console.log(response.data)
        console.log(self.dataList);
      })
      .catch(function (response) {
        console.log(response);
      });
  },
}

// ls.setItem('a', 1)
// console.log(ls.getItem('a'))

</script>

<style lang="scss" scoped>
  /*layout*/
  .app_wrapper {
    background-color: #f2f2f2;
    .main_wrapper {
      .title {
        font-size: 1rem;
        color: #f00;
      }
    }
  }

  .swiper {
    width: 100%;
    height: 200px;
  }

  swiper-slide {
    width: 100%;
    height: 200px;
  }
  .artimg {
    width:100px;
    /*height:100px;*/
    float: left;
    border-radius: 3px;
    margin-right: 15px;
  }

  .descp {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /*margin-top: 20px;*/
  }
</style>
