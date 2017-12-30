<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overviews">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                  <star :size='36' :score='seller.score'></star>
                  <span class="rating-count">({{seller.ratingCount}})</span>
                  <span class="sell-count">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                  <li class="block">
                    <h2>起送价</h2>
                    <div class="content">
                      <span class="stress">{{seller.minPrice}}</span>元
                    </div>
                  </li>
                  <li class="block">
                    <h2>商家配送</h2>
                    <div class="content">
                      <span class="stress">{{seller.deliveryPrice}}</span>元
                    </div>
                  </li>
                  <li class="block">
                    <h2>平均配送时间</h2>
                    <div class="content">
                      <span class="stress">{{seller.deliveryTime}}</span>元
                    </div>
                  </li>
                </ul>
                <div class="ravorite" @click="toggleFavorite">
                  <span class="icon-favorite" :class="{'active':farorite}"></span>
                  <span class="text">{{faroriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletins">
              <h3 class="title">公告与活动</h3>
              <div class="content-wrapper">
                <p class="content">{{seller.bulletin}}</p>
              </div>
              <ul v-if="seller.supports" class="supports-items">
                  <li v-for="(item, index) in seller.supports" :key="index" class="supports-item">
                    <span class="icon" :class='classMap4x[item.type]'></span>
                    {{item.description}}   
                  </li>
              </ul>
            </div>
            <split></split>
            <div class="pics">
              <h2 class="title">商家实景</h2>
              <div class="pic-warpper" ref='picscroll'>
                <ul class="pic-list" ref="pics">
                  <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
                    <img :src="pic" width="120" height="90">
                  </li>
                </ul>
              </div>
            </div>
            <split></split>
            <div class="info">
              <h2 class="title">商家信息</h2>  
              <ul>
                <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
              </ul>
            </div>             
        </div>
    </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '../../common/js/store'
export default {
  created () {
    this.classMap4x = ['decrease3', 'discount3', 'guarantee3', 'invoice3', 'special3']
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      farorite: (() => {
        return loadFromLocal(this.seller.id, 'farorite', false)
      })()
    }
  },
  computed: {
    faroriteText () {
      return this.farorite ? '已收藏' : '收藏'
    }
  },
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this._initScroll()
        this._addwidth()
      })
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this._initScroll()
      this._addwidth()
    })
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _addwidth () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.pics.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picscroll, {
              scrollX: true,
              eventPassthrough: 'vertical',
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    toggleFavorite (event) {
      if (!event._constructed) {
        return
      }
      this.farorite = !this.farorite
      saveToLocal(this.seller.id, 'farorite', this.farorite)
    }
  },
  components: {
    star,
    split
  }
}
</script>

<style>
.seller{
  position: absolute;
  top: 174px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.overviews{
  position: relative;
  padding: 18px;
}
.overviews .ravorite{
  position: absolute;
  width: 50px;
  top: 18px;
  right: 11px;
  text-align: center;
  cursor: pointer;
}
.ravorite .icon-favorite{
  color: #d4d6d9;  
  display: block;
  line-height: 24px;
  font-size: 24px;
}
.icon-favorite.active{
  color: rgb(240,20,20)
}
.ravorite .text{
  font-size: 10px;
  line-height: 10px;
  margin-top: 4px; 
  color: rgb(77,85,93);
}
.overviews .title{
  font-size: 14px;
  color: rgb(7,17,27);
  line-height: 14px;
  margin-bottom: 8px; 
}
.overviews .desc{
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(7,17,27,.1); 
}
.overviews .desc .star{
  display: inline-block;
  margin-right: 8px;
}
.overviews .desc span{
  font-size: 10px;
  color: rgb(77,85,93);
  line-height: 18px;
  vertical-align: middle;  
}
.overviews .desc .rating-count{
  margin-right: 12px;
}
.remark{
  display: flex;
  padding: 18px 0;
  text-align: center;
}
.remark .block{
  flex:1;
  border-right: 1px solid rgba(7,17,27,.1)
}
.remark .block:last-child{
   border:0;
}
.remark .block h2{
  font-size: 10px;
  font-weight: 200;
  color: rgb(147,153,159);
  margin-bottom:6px; 
  line-height: 10px;
}
.remark .block .content{
  font-size: 10px;
  font-weight: 200;
  color: rgb(7,17,27);
  line-height: 24px;
}
.remark .block .content .stress{
  font-size: 24px;
}
.seller .bulletins{
  padding-top: 18px;
  margin: 0 18px;
}
.bulletins .title{
    font-size: 14px;
    font-weight: 700;
}
.bulletins .content-wrapper{
  padding: 8px 12px 16px;
  border-bottom: 1px solid rgba(7,17,27,.1);
  font-size: 12px;
  /* font-weight: 200; */
  color: rgb(210,20,20);
  line-height: 24px;
}
.decrease3{
  background: url('../../../resource/img/decrease_4@2x.png');
}
.discount3{
  background: url('../../../resource/img/discount_4@2x.png');
}
.guarantee3{
  background: url('../../../resource/img/guarantee_4@2x.png');
}
.invoice3{
  background: url('../../../resource/img/invoice_4@2x.png');
}
.special3{
  background: url('../../../resource/img/special_4@2x.png');
}

.bulletins .supports-item{
  padding: 16px 12px;
  font-size: 12px;
  line-height:16px;
  color:rgb(7,17,27);
  border-bottom:1px solid rgba(7,17,27,.1);
}
.bulletins .supports-items .icon{
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 6px;  
  background-size:16px 16px;
  background-repeat: no-repeat;     
  vertical-align: top;   
}
.pics{
  padding: 18px;
}
.pics .title{
  font-size: 14px;
  color: rgb(7,17,27);
  line-height: 14px;
  margin-bottom: 8px; 
}
.pic-warpper{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.pic-list{
  font-size: 0;
}
.pic-item{
  display: inline-block;
  margin-right: 6px;
  width: 120px;
  height: 90px;
}
.pic-item:last-child{
  margin: 0;
}
.info {
  padding: 18px 18px 0 18px; 
    color:   rgb(7,17,27);
}
.info .title{
  font-size: 14px;
  color: rgb(7,17,27);
  line-height: 14px;
  border-bottom:1px solid rgba(7,17,27,.1);
  padding-bottom: 8px; 
}
.info-item{
  padding: 16px 12px;
  line-height: 16px;
  border-bottom:1px solid rgba(7,17,27,.1);
  font-size: 12px;
}
.info-item:last-child{
  border: 0;
}
</style>