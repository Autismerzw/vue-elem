<template>
    <div class="cartcontrol">
      <transition name="rll">
        <div class="cart-dec icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decCart" transition='rll'>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
import vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cart-add', event.target)
    },
    decCart () {
      if (!event._constructed) {
        return
      }
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>

<style>
.cartcontrol{
  font-size: 0;
} 
.cart-dec,
.cart-add{
  display: inline-block;
  padding: 6px;
  font-size: 24px;
  color: rgb(0,160,220);
  cursor: pointer;
}
.cart-count{
  display: inline-block;  
  font-size: 10px;
  line-height: 24px;
  color: rgb(147,153,159);
  vertical-align: top;
  padding-top: 6px;
}
.cart-dec{
  transition: all .4s linear;
}
.rll-enter,.rll-leave-to{
  opacity: 0;
  transform: translate3d(24px,0,0)
}
.rll-enter-to{
  opacity: 1;
  transform: translate3d(0,0,0)
}
</style>