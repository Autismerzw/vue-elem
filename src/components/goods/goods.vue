<template>
    <article class="good">
        <aside class="good-menu" ref="menuWrapper">
          <ul class="menu-list">
            <li v-for="(item, index) in goods" :key='item.key' class="menu-item" :class="{'current':currentIndex===index}" @click="selectMeun(index, $event)">
              <span class="text">
                <span class="icon" v-if="item.type>0" :class="classMap2x[item.type-1]"></span>
                 {{item.name}}
              </span>
            </li>
          </ul>
        </aside>
        <section class='good-wrapper' ref="goodWrapper">
          <ul>
            <li v-for="item in goods" :key="item.key" class="food-list food-item-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="food in item.foods" :key="food.key" class="food-item">
                  <div class="icon">
                    <img :src="food.icon">
                  </div>
                  <div class='content'>
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span>
                        月售{{food.sellCount}}份
                      </span>好评率{{food.rating}}%
                    </div>
                    <div class="price">
                      <span class="price-new">￥{{food.price}}</span>
                      <del v-show="food.oldPrice" class="price-old">￥{{food.oldPrice}}</del>
                    </div>
                    <div class="cartcontrol-warpper">
                      <cartControl v-on:cart-add='cartAdd' :food='food'></cartControl>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <shopcart ref="shopcart" :select-food='selectFoods' :delivery-price='seller.deliveryPrice' :minPrice='seller.minPrice'>
          
        </shopcart> 
    </article>
</template>

<script>
    import BScroll from 'better-scroll'
    import shopcart from '../shopcart/shopcart'
    import cartControl from '../cartcontrol/cartcontrol'
    const ERR_OK = 0
    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data () {
        return {
          goods: [],
          listHeight: [],
          scrollY: 0
        }
      },
      computed: {
        currentIndex () {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i]
            let height2 = this.listHeight[i + 1]
            if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
              return i
            }
          }
          return 0
        },
        selectFoods () {
          let foods = []
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
          })
          return foods
        }
      },
      created () {
        this.classMap2x = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        this.$http.get('./api/goods').then((response) => {
          response = response.body
          if (response.erron === ERR_OK) {
            this.goods = response.data
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            })
          }
        })
      },
      methods: {
        _initScroll () {
          this.meunScroll = new BScroll(this.$refs.menuWrapper, {
            click: true
          })
          this.foodScroll = new BScroll(this.$refs.goodWrapper, {
            click: true,
            probeType: 3
          })
          this.foodScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y))
          })
        },
        _calculateHeight () {
          let foodListH = this.$refs.goodWrapper.getElementsByClassName('food-item-hook')
          let fHeight = 0
          this.listHeight.push(fHeight)
          for (let i = 0; i < foodListH.length; i++) {
            let item = foodListH[i]
            fHeight += item.clientHeight
            this.listHeight.push(fHeight)
          }
        },
        selectMeun (index, event) {
          if (!event._constructed) {
            return
          }
          let foodList = this.$refs.goodWrapper.getElementsByClassName('food-item-hook')
          let el = foodList[index]
          this.foodScroll.scrollToElement(el, 300)
          console.log(index)
        },
        cartAdd (target) {
          this.$nextTick(() => {
            this.$refs['shopcart'].drop(target)
          })
        }
      },
      components: {
        shopcart,
        cartControl
      }
    }
</script>

<style>
.good{
    display: flex;
    position: absolute;
    top: 179px;
    bottom: 46px;
    overflow: hidden;
    width: 100%;
}
.good .good-menu{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
}
.good-menu .menu-item{
    display: table;
    height: 54px;
    width: 56px;
    padding: 0 12px;
    cursor: pointer;
}
.good-menu .current{
  background: #fff;
  font-weight: 700;
  position: relative;
  top: -1;
  z-index: 10;
}
.good-menu .menu-item .text{
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 12px;
  font-weight: 200;
  line-height: 16px;
  color: rgb(77,85,93);
  border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.good-menu .current .text{
  border: 0;
}
.decrease{
    background: url('../../../resource/img/decrease_3@2x.png');
}
.discount{
     background: url('../../../resource/img/discount_3@2x.png');
}
.guarantee{
     background: url('../../../resource/img/guarantee_3@2x.png');
}
.invoice{
    background: url('../../../resource/img/invoice_3@2x.png');
}
.special{
     background: url('../../../resource/img/special_3@2x.png');
}
.menu-item .text .icon{
  width: 16px;
  height: 16px;
  display: inline-block; 
  background-size:16px 16px;
  background-repeat: no-repeat;     
  vertical-align: top;   
}
.good .good-wrapper{
    flex: 1;
}
.good-wrapper .title{ 
  height: 26px;
  padding-left: 14px;
  background: #f3f5f7;
  border-left: 3px solid #d9dde1;
  font-size: 12px;
  line-height: 26px;
  color: rgb(147,153,159);
  overflow: hidden;
}
.good-wrapper .food-item{
  position: relative;
  margin: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(7, 17, 27, .1);
  overflow: hidden;
}
.food-item .icon{
  display: inline-block;
  margin-right: 10px; 
  width: 70px;
  height: 70px;
  vertical-align: top
}
.food-item .icon img{
  width: 100%;
  height: 100%;
}
.food-item .content{
  display: inline-block;
  width: 50%;
}
.content .name{
  font-size: 14px;
  line-height: 14px;
  color:rgb(7, 17, 27);
  margin-top: 4px; 
}
.content .desc{
  font-size: 10px;
  line-height: 12px;
  color:rgb(147,153,159);
  margin: 8px 0;
}
.content  .extra{
  font-size: 10px;
  color:rgb(147,153,159);
  line-height: 10px;
}
.content .extra span:first-child{
  margin-right:8px; 
}
.content .price .price-new{
  font-size: 14px;
  line-height: 14px;
  margin-top:10px; 
  color: rgb(240, 20, 20);
}
.content .price .price-old{
  font-size: 14px;
  line-height: 14px;
  margin-top:10px; 
  color: rgb(147,153,159);
}
 .cartcontrol-warpper{
  position: absolute;
  overflow: hidden;
  right: 0;
  bottom: 12px;
}
</style>