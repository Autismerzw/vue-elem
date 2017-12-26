import Vue from 'vue'
import Router from 'vue-router'
// import header from '@/components/v-header/header.vue'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: goods
        // header: header
      }
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/ratings',
      component: ratings
    }

  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
