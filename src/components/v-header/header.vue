<template>
    <header>
        <div class="bg">
            <img :src="seller.avatar" class="bg-image">
        </div>
        
        <div class="content-wrapper">
            <div class='avatar'>
                <img alt="商家logo" :src='seller.avatar' class='logo'>
            </div>
            <div class="content">
                <h3 class="title">
                    <span class="brand"></span>
                    {{seller.name}}                    
                </h3>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="supports">
                    <span class="icon" :class='classMap2x[seller.supports[0].type]'></span>
                    {{seller.supports[0].description}}
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class='bulletin-wrapper' @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <transition name='fade'>
         <div class="detail" v-show="detailShow" transition='fade'>
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                         <star :size='48' :score='seller.score'></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports-items">
                       <li v-for="(item, index) in seller.supports" :key="index" class="supports-item">
                            <span class="icon" :class='classMap3x[item.type]'></span>
                            {{item.description}}   
                       </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p>{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hidDetail">
                <i class="icon-close"></i>
            </div>
        </div>
        </transition>
   </header>
</template>

<script>
import star from '../star/star'

export default {
  created () {
    this.classMap2x = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this.classMap3x = ['decrease2', 'discount2', 'guarantee2', 'invoice2', 'special2']
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hidDetail () {
      this.detailShow = false
    }
  },
  components: {
    star: star
  }
}
</script>

<style>
    header{
        position: relative;
        background: rgba(7,17, 27, .5);
        color: #fff;
        overflow: hidden;
    }
    /* 背景图 */
    header .bg{
        position: absolute;
        filter: blur(10px);  
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    header .bg .bg-image{
        width: 100%;
        height: 100%;
    }
    /* 盒子控制 */
    header .content-wrapper{
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
    }
    /* 商家logo盒子 */
    header .content-wrapper .avatar{
        position: relative;        
        display: inline-block;
        font-size: 12px;
        vertical-align: top;      
    }
    .avatar .logo{
        width: 64px;
        height: 64px;
    }
    /* 商家简单信息盒子 */
    header .content-wrapper .content{
        display: inline-block;
        padding-left:16px; 
        font-size: 12px;     
        font-weight: 200;           
    }
    .content .title{
        font-size: 16px;
        font-weight: bold;
        line-height: 18px;
        margin-bottom: 8px;
    }
    .content .title .brand{
        width: 30px;
        height: 18px;
        display: inline-block;
        margin-right:6px; 
        vertical-align: top;
        background: url('../../../resource/img/brand@2x.png');
        background-position: center center;
        background-size: 30px 18px; 
    }
    .content .description{
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
    }
    .content .supports{
        font-size: 10px;
        line-height: 12px;
    }
    .supports .icon{
        width: 12px;
        height: 12px;
        display: inline-block;
        margin-right: 4px;  
        background-size:12px 12px;
        background-repeat: no-repeat;     
        vertical-align: top;   
    }
    .decrease{
        background: url('../../../resource/img/decrease_1@2x.png');
    }
    .discount{
        background: url('../../../resource/img/discount_1@2x.png');
    }
    .guarantee{
        background: url('../../../resource/img/guarantee_1@2x.png');
    }
    .invoice{
        background: url('../../../resource/img/invoice_1@2x.png');
    }
    .special{
        background: url('../../../resource/img/special_1@2x.png');
    }
    .decrease2{
        background: url('../../../resource/img/decrease_2@3x.png');
    }
    .discount2{
        background: url('../../../resource/img/discount_2@3x.png');
    }
    .guarantee2{
        background: url('../../../resource/img/guarantee_2@3x.png');
    }
    .invoice2{
        background: url('../../../resource/img/invoice_2@3x.png');
    }
    .special2{
        background: url('../../../resource/img/special_2@3x.png');
    }
    .support-count{
        position: absolute;
        display: inline-block;
        height: 12px;
        padding: 7px 8px;
        font-size: 10px;
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
        cursor: pointer;
        right: 12px;
        bottom: 18px;
    }
    .support-count span{
        vertical-align: top;
        line-height: 12px;
    }
    .bulletin-wrapper{
        position: relative;
        height: 28px;
        line-height: 28px;
        font-size: 10px;
        padding: 0 22px 0 12px;
        background: rgba(7,17,27,.2);
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        cursor: pointer;
    }
    .bulletin-title{
        display: inline-block;
        width: 22px;
        height: 12px;
        background: url('../../../resource/img/bulletin@2x.png');
        background-size: 22px 12px;
        background-repeat: no-repeat;     
        vertical-align: top;   
        display: inline-block;
        margin:8px 4px 0 4px;
    }
    .bulletin-wrapper .icon-keyboard_arrow_right{
        position: absolute;
        top:10px; 
        right: 10px;
    }
    .detail{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7,17,27,.8);
        transition: all 0.5s;
    }
    /* .fade-transition{
        opacity: 1;
        background: rgba(7,17,27,.8);
    } */
    .fade-enter-active{
       opacity: 0;
        background: rgba(7,17,27,0);
    }
    .fade-leave-active{
       opacity: 0;
        background: rgba(7,17,27,0);
    }
    .detail .detail-wrapper{
        min-height: 100%;
        width: 100%;
    }
    .detail .detail-wrapper .detail-main{
        margin-top: 64px;
        padding-bottom: 64px; 
    }
    .detail .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto; 
        clear: both;
        font-size: 32px; 
        cursor: pointer;
    }
    .detail-main .name{
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        font-weight: 700;
    }
    .detail-wrapper .star-wrapper{
        margin-top: 18px;
        padding: 2px 0;
        text-align: center
    }
    .detail .title{
        width: 80%;
        margin: 28px auto;
        display: flex;
    }
    .detail .title .line{
        flex-grow: 1;
        height: 0;
        vertical-align: middle;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        margin-top: 10px;
    }
    .detail .title .text{
        font-size: 14px;
        padding: 0 12px;
    }
    .detail .supports-items{
        width: 80%;
        margin: 28px auto;

    }
    .detail .supports-item{
        margin-bottom: 12px;
        font-size: 12px;
        line-height:16px; 
    }
    .detail .supports-items .icon{
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 6px;  
        background-size:16px 16px;
        background-repeat: no-repeat;     
        vertical-align: top;   
    }
    .bulletin{
        width: 80%;
        margin: 28px auto; 
        font-size: 12px;
        font-weight: 200;
        line-height: 24px;
    }
    .bulletin p{
        padding: 0 12px;
    }
</style>