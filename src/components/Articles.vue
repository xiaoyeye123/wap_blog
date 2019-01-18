<template>
  <div class="app_wrapper">
    <!-- head -->
    <head-top/>
    <!-- main -->
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">

    <div class="main_wrapper">

      <div class="content whitebg" style="margin-top: 30px !important;">
        <h2 class="htitle">文章列表</h2>

        <ul>
          <li class="article" v-for="blog in dataList">
            <h3 class="articleTitle" style="font-size: 19px">
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
    </scroller>
  </div>
</template>

<script>
import headTop from './layouts/header'
import ls from '@/utils/localStorage'
import config from '@/components/config'
import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller);

export default {
  components: {
    headTop,
    swiper,
    swiperSlide
  },
  data () {
    return {
      noData: false,
      page: 1,
      dataList: [],
      pagination: [],
    }
  },
  // created(){
  //   var self = this;
  //   var id = this.$route.query.typeId;
  //   var page = this.$route.query.page;
  //   this.axios.get(config.api+'/api/blogTypes/'+id+'/articles?page='+page)
  //     .then(function (response) {
  //       self.dataList = response.data.data;
  //       self.pagination = response.data.meta.pagination;
  //       console.log(response.data);
  //     })
  //     .catch(function (response) {
  //       console.log(response);
  //     });
  // },
  // methods: {
  //   /**
  //    * 上拉获取
  //    */
  //   infinite(done) {
  //     this.pageNumber++;
  //     console.log("infinite");
  //     this.getArticleList(done,1);
  //   },
  //   refresh() {
  //     console.log("refresh");
  //     this.pageNumber = 1;
  //     this.dataList = [];
  //     this.getArticleList();
  //   },
  //
  //   getArticleList(done, isrefresh = 2) {
  //     console.log(this.pageNumber);
  //     if (isrefresh == 2) {
  //       this.dataList = [];
  //     }
  //     var self = this;
  //     var id = this.$route.query.typeId;
  //     var page = this.pageNumber;
  //     this.axios.get(config.api+'/api/blogTypes/'+id+'/articles?page='+page)
  //       .then(function (response) {
  //         // self.dataList= response.data.data
  //         if (response.data.data.length > 0) {
  //           self.dataList = self.dataList.concat(response.data.data)
  //         }
  //
  //         self.pagination = response.data.meta.pagination;
  //         console.log(self.dataList);
  //         if (self.pagination.current_page < self.pagination.total_pages) {
  //           done();
  //         } else {
  //           self.$refs.myscroller.finishInfinite(true);
  //         }
  //       })
  //       .catch(function (response) {
  //         console.log(response);
  //       });
  //   }
  //
  //
  // }

  methods: {
    // 获取数据
    getData () {
      var self = this;
      var page = this.page;
      var id = this.$route.query.typeId;
      this.axios.get(config.api+'/api/blogTypes/'+id+'/articles?page='+page)
        .then(function (response) {
          if (response.data.meta.pagination.current_page == response.data.meta.pagination.total_pages) {
            //这一步是判断你当前请求的这一页数据是不是最后一页，如果是最后一页就不能请求了（这个根据后端给的接口判断，只要能判断出就行了，如果是最后一页给that.noDate=true）
            self.noData = true;
          }
            // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
            if (self.page == 1) {
              self.dataList = response.data.data;
            } else {
              self.dataList = self.dataList.concat(response.data.data)
            }

        })
    },

    refresh () {
      console.log('下拉刷新');
      console.log(this.noData);
      this.page = 1;//重置页数刷新每次页数都是第一页
      this.noData = false;//重置数据判断
      setTimeout(function () {
        this.getData();
        this.$refs.myscroller.finishPullToRefresh();//刷新完毕关闭刷新的转圈圈
      }.bind(this), 1700)
    },
    // 上拉加载
    infinite (done) {
      console.log('上拉加载');
      console.log(this.noData);
      if (this.noData) {
        this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
      } else {
        setTimeout(() => {
          this.page++;//下拉一次页数+1
          this.getData();
          done();//进行下一次加载操作
        }, 1500);
      }
    }
  },
  mounted(){
    this.getData()
  }
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
