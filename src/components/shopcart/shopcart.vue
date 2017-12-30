<template>
    <div>
      <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="con-main">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount > 0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="total-count" v-show="totalCount > 0">
                      {{totalCount}}
                    </div>
                </div>
                <div class="price" :class="{'highlight':totalPrice > 0}">￥<span>{{totalPrice}}</span></div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="con-submit" :class="payClass" @click.stop.prevent="pay">
              {{payDesa}}
            </div>
            <div class="boll-container">
              <div v-for="(ball, index) in balls" :key="index">
                <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                  <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                  </div>
                </transition>
              </div>
            </div>   
        </div>
        <transition name="list">
              <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                  <h1>购物车</h1>
                  <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                  <ul>
                    <li class="food" v-for="(food, index) in selectFood" :key='index'>
                      <h3 class="name">{{food.name}}</h3>
                      <div class="cartcontrol-wrapper">
                        <cartcontrol :food='food'></cartcontrol>
                      </div>
                      <div class="price">
                        <span>￥{{food.price*food.count}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
          </transition>
      </div>
      <transition name="mask">
        <div class="list-mask" v-show="listShow" @click="hideList">

        </div>
      </transition>
    </div>
</template>

<script>
    import cartcontrol from '../cartcontrol/cartcontrol'
    import BScroll from 'better-scroll'
    export default {
      props: {
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number
        },
        selectFood: {
          type: Array,
          default () {
            return []
          }
        }
      },
      data () {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ],
          dropBalls: [],
          fold: true
        }
      },
      computed: {
        totalPrice () {
          let total = 0
          this.selectFood.forEach((food) => {
            total += food.price * food.count
          })
          return total
        },
        totalCount () {
          let count = 0
          this.selectFood.forEach((food) => {
            count += food.count
          })
          return count
        },
        payDesa () {
          if (this.totalPrice === 0) {
            return `￥${this.minPrice}元起送`
          } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice
            return `还差￥${diff}元起送`
          } else {
            return '去结算'
          }
        },
        payClass () {
          if (this.totalPrice < this.minPrice) {
            return 'not-enough'
          } else {
            return 'enough'
          }
        },
        listShow () {
          if (!this.totalCount) {
            this.fold = true
            return false
          }
          let show = !this.fold
          if (show) {
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.listContent, {
                  click: true
                })
              } else {
                this.scroll.refresh()
              }
            })
          }
          return show
        }
      },
      methods: {
        drop (el) {
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i]
            if (!ball.show) {
              ball.show = true
              ball.el = el
              this.dropBalls.push(ball)
              return
            }
          }
        },
        beforeDrop: function (el) {
          let count = this.balls.length
          while (count--) {
            let ball = this.balls[count]
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect()
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top - 22)
              el.style.display = ''
              el.style.webkitTransform = `translate3d(0,${y}px,0)`
              el.style.transform = `translate3d(0,${y}px,0)`
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`
              inner.style.transform = `translate3d(${x}px,0,0)`
            }
          }
        },
        dropping: function (el, done) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)'
            el.style.transform = 'translate3d(0,0,0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(0,0,0)'
            inner.style.transform = 'translate3d(0,0,0)'
            el.addEventListener('transitionend', done)
          })
        },
        afterDrop: function (el) {
          let ball = this.dropBalls.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
        },
        toggleList () {
          if (!this.totalCount) {
            return
          }
          this.fold = !this.fold
        },
        hideList () {
          this.fold = true
        },
        empty () {
          this.selectFood.forEach((food) => {
            food.count = 0
          })
        },
        pay () {
          if (this.totalPrice < this.minPrice) {
            return
          }
          window.alert(`支付`)
        }
      },
      components: {
        cartcontrol
      }
    }
</script>

<style>
.shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
}
.shopcart .content{
    height: 48px;
    display: flex;
    background: #141d27;
    font-size: 0;
}
.content .con-main{
    flex: 1;
}
.con-main .logo-wrapper{
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    height: 56px;
    width: 56px;
    vertical-align: middle;
    border-radius: 50%;
    box-sizing: border-box;
    background: #141d27;
    cursor: pointer;
}
.logo-wrapper .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background: #2b343c;
}
.logo .icon-shopping_cart{
    font-size: 24px;
    color: #80858a;
    line-height: 44px;
}
.logo-wrapper .highlight{
  background: rgb(0, 160, 220)
}
.highlight .icon-shopping_cart{
  color: #fff;
}
.logo-wrapper .total-count{
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  font-size: 9px;
  font-weight: 700;
  line-height: 16px;
  border-radius: 16px;
  text-align: center;
  background: rgb(240, 20, 20);
  color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
}
.con-main .price{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255,255,255,.1);
    color: rgba(255,255,255,.4);
    font-weight: 700;

}
.con-main .highlight{
  color: #fff;
}
.con-main .desc{
    display: inline-block;
    vertical-align: top;
    margin-left: 12px;
    font-size: 10px;
    color: rgba(255,255,255,.4);
    line-height: 36px;   
    letter-spacing:2px; 

}
.content .con-submit{
    flex: 0 0 105px;
    width: 105px;
    text-align: center;
    line-height: 48px;
    font-size: 12px;
    font-weight: 700;
    color:rgba(255,255,255,.4);
    background: #2b343c;
    letter-spacing:1px;     
}
.content .not-enough{
  background: rgb(0, 160, 220);
  color:#fff;  
}
.content .enough{
  background:#00b34c;
  color:#fff;  
}
.boll-container .ball{
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  
}
.ball .inner{
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(0,160,220);
  transition: all .4s linear ;
}
.shopcart-list{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  background: #fff;
  transform: translate3d(0, -100%, 0);
  /* transition:all .5s; */
}
.list-enter-active, .list-leave-active{
  transition:all .5s;
}
.list-enter, .list-leave-to{
  transform: translate3d(0, 0, 0)
}
.list-header{
  height: 40px;
  line-height: 40px;
  padding: 0 13px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7,17,27,.1)
}
.list-header h1{
  float: left;
  font-size: 14px;
  font-weight: 200;
  color: rgb(7,17,27)
}
.list-header span{
  float: right; 
  font-size: 14px;
  font-weight: 200;
  color: rgb(0,160,220)
}
.list-content{
  padding: 0 18px;
  max-height: 260px;
  overflow: hidden;
  background: #fff;
}
.list-content .food{
  position: relative;
  height: 48px;
  padding: 12px 0;
  line-height: 48px;
  border-bottom: 1px solid rgba(7,17,27,.1);
}
.food .name{
  float: left;
  font-size: 14px;
  color: rgb(7,17,27);
}
.food .price{
  float: right;
  margin-right: 10px; 
  line-height: 48px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}
.cartcontrol-wrapper{
  float: right;
  margin-top: 6px; 
}
.list-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  opacity: 1;
  background: rgba(7,17,27,.6)
}
.mask-enter-active, .mask-leave-active{
  transition:all .5s;
}
.mask-enter, .mask-leave-to{
  opacity: 0;  
  background: rgba(7,17,27,0);
  -webkit-backdrop-filter: blur(10px);
}
</style>