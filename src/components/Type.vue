<template>
  <div class="app_wrapper">
    <!-- head -->
    <head-top/>
    <!-- main -->
    <div class="main_wrapper">
      <div class="article_type whitebg" style="padding: 20px">

        <div class="typeinfo" v-for="type in dataList">
          <div style="position: relative;">
            <img :src="type.img_path" style="width: 100%">
            <div class="typename">{{ type.name }}</div>
            <div class="cuoguolai"><router-link :to="{ name: 'Articles', query: { typeId: type.id }}">戳过来</router-link><i class="fa fa-arrow-right"></i></div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import headTop from './layouts/header'
import ls from '@/utils/localStorage'
import config from '@/components/config'

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
      dataList: [],
    }
  },
  created(){
    var self = this;
    this.axios.get(config.api+'/api/articles')
      .then(function (response) {
        self.dataList = response.data.data;

        console.log(self.dataList);
      })
      .catch(function (response) {
        console.log(response);
      });
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

</style>
