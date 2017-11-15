import Vue from 'vue'
import Router from 'vue-router'
// import header from '@/components/v-header/header.vue'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import rationgs from '@/components/rationgs/rationgs'
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
      path: '/rationgs',
      component: rationgs
    }

  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
