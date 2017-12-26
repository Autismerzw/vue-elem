<template>
  <div class="ratings">
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
      <ratingselect></ratingselect>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
const ALL = 2
export default {
  props: {
    seller: {
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
</style>