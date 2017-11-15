<template>
    <div class="shopcart">
        <div class="content">
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
            <div class="con-submit" :class="payClass">
              {{payDesa}}
            </div>
        </div>
    </div>
</template>

<script>
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
            return [
              {
                price: 5,
                count: 4
              }
            ]
          }
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
        }
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
</style>