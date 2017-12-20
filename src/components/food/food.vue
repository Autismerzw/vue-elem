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
        </div>
        <div class="price-box">
          <span class="new">{{food.price}}元</span>
          <span class="old" v-show="food.oldPrice">{{food.oldPrice}}元</span>
        </div>
        <div class="cartcontrol-warpper">
          <cartcontrol :food='food'></cartcontrol>
        </div>
        <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">
          加入购物车
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
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
    }
  },
  components: {
    cartcontrol
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
  margin:0 0 18px 18px;
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
.food .cartcontrol-warpper{
  position: absolute;
  right: 12px;
  bottom: -8px;
}
.food .buy{
  position: absolute;
  right: 18px;
  bottom: -4px;
  text-align: center;
  width: 74px;
  padding: 8px 10px;
  font-size: 10px;
  color: #fff;
  line-height: 12px;
  background: rgb(0,160,220);
  border-radius: 15px;
}
</style>