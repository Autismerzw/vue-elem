<template>
  <transition name="food">
    <div v-show="showFlag" class="food" ref="foodScroll">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="食物图片">
          <div class="back" @click="hide">
             <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h2 class="title">{{food.name}}</h2>
          <p class="statistics">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating"> 好评率{{food.rating}}% </span>
          </p>
          <div class="price-box">
            <span class="new">{{food.price}}元</span>
            <span class="old" v-show="food.oldPrice">{{food.oldPrice}}元</span>
          </div>
          <div class="cartcontrol-warppers">
            <cartcontrol :food='food'></cartcontrol>
            <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">
              加入购物车
            </div>
          </div>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h3 class="info-title">商品介绍</h3>
          <p class="info-msg">
            {{food.info}}
          </p>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h3 class="rating-title">商品评价</h3>
          <ratingselect @select='selectRating'  @toggle="toggleCountent" :select-type="selectType" :desc="desc" :onlyContent='onlyContent' :ratings="food.ratings"></ratingselect>
          <div class="rating-warpper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" class="ratings-item" v-for="(rating, index) in food.ratings" :key="index">
                <div class="user-info">
                  <span class="user-name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="12" height="12">
                </div>
                <div class="rating-info">
                  <p class="rating-time">{{rating.rateTime | formatDate}}</p>
                  <p class="rating-text">
                    <span :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></span>
                    {{rating.text}}
                  </p>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'
import Vue from 'vue'
const ALL = 2
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodScroll, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (event._constrcted) {
        return
      }
      Vue.set(this.food, 'count', 1)
      this.$emit('cart-add', event.target)
    },
    selectRating (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleCountent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
}
</script>

<style> 
.food{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  transition: all .4s linear
}
.food-enter,.food-leave-to{
  opacity: 0;
  transform: translate3d(100%,0,0)
}
.food-enter-to{
  opacity: 1;
  transform: translate3d(0,0,0)
}
.food-content{
  position: relative;
}
.image-header{
  position: relative;
  padding-top:70%;
  overflow: hidden;
}
.image-header img{
  position: absolute;
  top: 0;
  width: 100%;
}
.back{
  position: absolute;
  top: 10px;
  left: 0;
}
.back .icon-arrow_lift{
  display: block;
  padding: 10px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
.food .content{
  position: relative;
  margin: 18px;
}
.food .content .title{
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7, 17, 27);
  line-height: 14px;
}
.food .content .statistics{
  margin: 8px 0 0 0;  
}
.food .statistics span{
  margin:0 10px 0 0;
  font-size: 10px;
  line-height: 10px;
  color: rgba(7, 17, 27, .4);   
}
.food .price-box{
  margin:18px 0 18px 0;
}
.price-box .new{
  margin-right: 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color: rgb(240, 20, 20)
}
.price-box .old{
  font-size: 10px;
  font-weight: normal;
  line-height: 24px;
  color: rgb(147, 153, 159);
  text-decoration: line-through;
}
.food .cartcontrol-warppers{
  position: absolute;
  right: 0;
  bottom: -8px;
}
.food .buy{
  position: absolute;
  right: 0;
  bottom: 4px;
  text-align: center;
  width: 74px;
  padding: 8px 10px;
  font-size: 10px;
  color: #fff;
  line-height: 12px;
  background: rgb(0,160,220);
  border-radius: 15px;
}
.info{
  padding: 18px;
}
.info .info-title{
  font-size: 14px;
  font-weight: 700;
}
.info .info-msg{
  margin-top: 6px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(77, 85, 93);
  line-height: 24px;
}
.rating{
  padding-top: 18px;
}
.rating .rating-title{
  margin-left: 18px;
  font-size: 14px;
  font-weight: 700;
}
/* .rating-warpper{
  padding: 0 18px;
} */
.ratings-item{
  position: relative;
  padding: 16px 0;
  margin: 0 18px;
  overflow: hidden;
  border-bottom: 1px solid rgba(7,17,27,.1);
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.rating-info .rating-time{
  line-height: 12px;
  margin-bottom: 6px; 
}
.rating-info .rating-text{
  font-size: 12px;
  color: rgb(7, 17, 27);
  line-height: 16px;
}
.icon-thumb_up{
  color: rgb(0,160,220);
  line-height: 24px;
  vertical-align: middle;
}
.icon-thumb_down{
   color: rgb(147, 153, 159);
  line-height: 24px;
  vertical-align: middle;
  
}
.ratings-item .user-info{
  float: right;
}
.user-info .avatar{
  margin-left: 6px;
  vertical-align: middle; 
}
.no-rating{
  font-size: 13px;
  padding: 18px 0;
  margin: 0 18px;
  color: rgb(147, 153, 159);
}
</style>