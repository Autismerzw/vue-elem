<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="evaluation">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="evaluation-star">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size='36' :score='seller.serviceScore'></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size='36' :score='seller.foodScore'></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select='selectRating'  @toggle="toggleCountent" :select-type="selectType" :onlyContent='onlyContent' :ratings='this.ratings'></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in ratings" :key="index" class="rating-item" >
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">
                {{rating.username}}
              </h1>
              <div class="star-wrapper">
                <star :size='24' :score='rating.score'></star>
                <span class="delivery" v-show="rating.deliveryTime">
                  {{rating.deliveryTime}}分钟送达
                </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="re-item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'
import BScroll from 'better-scroll'
const ALL = 2
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  created () {
    this.$http.get('./api/ratings').then((response) => {
      response = response.body
      if (response.erron === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
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
    star,
    split,
    ratingselect
  }
}
</script>

<style>
.ratings{
    position: absolute;
    top:174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.overview{
  display: flex;
  padding: 18px 0;
}

.evaluation{
  flex:0 0 36%;
  width: 137px;
  border-right: 1px solid rgba(7,17,27,0.1);
  text-align: center;
  padding: 6px 0;
}
.evaluation .score{
  font-size: 24px;
  color: rgb(255,135,0);
  line-height: 28px;
  margin-bottom: 6px;
}
.evaluation .title{
  font-size: 12px;
  color: rgb(7,17,27);
  line-height: 12px;
  margin-bottom: 8px;
}
.evaluation .rank{
  font-size: 10px;
  color: rgba(7,17,27,.3);
  line-height: 10px;
}
.evaluation-star{
  /* text-align: center;   */
  flex: 1;
  padding: 6px 24px;
}
.evaluation-star .score-wrapper{
  margin-bottom: 8px;
  font-size: 0;
}
.score-wrapper .title{
   font-size: 12px;
  line-height: 18px;
  color: rgb(7,17,27);
  margin-right: 12px;
}
.score-wrapper .star{
  display: inline-block;
  vertical-align: top;
}
.score-wrapper .score{
 font-size: 12px;
  line-height: 18px;
  color: rgb(255,153,0);
  margin-left: 12px;
}
.delivery-wrapper{
  font-size: 0;
  text-align: left;
}
.delivery-wrapper .title{
  font-size: 12px;
  line-height: 18px;
  color: rgb(7,17,27);
  margin-right: 12px;  
}
.delivery-wrapper .delivery{
  font-size: 12px;
  line-height: 18px;
  color: rgb(147,153,159);

}
@media only screen and (max-width:360px) {
  .evaluation{
    flex: 0 0 120px;
    width: 120px;
  }
  .evaluation-star{
    padding: 6px 12px;
  }
}
@media only screen and (max-width:320px) {
  .evaluation{
    flex: 0 0 110px;
    width: 110px;
  }
  .evaluation-star{
    padding: 6px 6px;
  }
}
.rating-wrapper{
  padding: 0 18px;
}
.rating-wrapper .rating-item{
  padding: 18px 0;
  display: flex;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.rating-item .avatar{
  flex: 0 0 28px;
  width: 28px;
  margin-right:  12px;
}
.avatar img{
  border-radius: 50%; 
}
.rating-item .content{
  position: relative;
  flex: 1;
  overflow: hidden;
}
.content .name{
  font-size: 10px;
  color: rgb(7,17,27);
  line-height: 12px;
}
.content .star-wrapper{
  margin: 4px 0 6px 0;
  font-size: 10px;
  font-weight: 200;
  color: rgb(147,153,159);
  line-height: 12px;
}
.star-wrapper .star{
  display: inline-block;
  margin-right: 6px; 
}
.content .text{
  font-size: 12px;
  /* font-weight: 700; */
  margin-bottom: 8px;
  line-height: 18px;
  color: rgb(7,17,27);
}
.recommend {
  padding-bottom: 3px; 
}
.recommend .icon-thumb_up{
  font-size: 12px;
  color: rgb(0,160,220);
  line-height: 16px;
  vertical-align: middle;
}
.recommend .re-item{
  margin-left: 8px;
  border: 1px solid rgba(7,17,27,0.1);
  border-radius: 2px;
  font-size: 9px;
  color: rgb(147,153,159);
  line-height: 14px;
  padding: 2px 6px;
  max-width: 42px;
  overflow: hidden;
  vertical-align: middle;
}
.content .time{
  position: absolute;
  right: 0;
  top: 0;
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 12px;
}
</style>