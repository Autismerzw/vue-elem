<template>
  <div id="app">
  <v-header :seller="seller"></v-header>
   <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
   </div>
   <keep-alive>
    <router-view :seller="seller"></router-view>
   </keep-alive>
  </div>
</template>

<script>
import header from '@/components/v-header/header'
import {urlId} from '../src/common/js/uilt'

const ERR_OK = 0

export default {
  name: 'app',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlId()
          // console.log(queryParam.id)
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body
      if (response.erron === ERR_OK) {
        // this.seller = response.data
        this.seller = Object.assign({}, this.seller, response.data)
        console.log(this.seller.id)
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>
  
<style>
  body{
     user-select:none;
  }
  .tab{
    display:flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
  .tab .tab-item{
    flex: 1;  
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    color:rgb(77,85,93);
  }
  .tab .active{
    color: #e40045; 
  }
  .clearfix{
    display: inline-block;
  }
  .clearfix:after{
    content: ".";
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
</style>
