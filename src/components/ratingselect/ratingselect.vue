<template>
    <div class="ratingselect">
      <div class="rating-type">
        <span  @click="select(2, $event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}} <span class="count">{{ratings.length}}</span> </span>
        <span  @click="select(0, $event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}} <span class="count">{{positive.length}}</span> </span>
        <span  @click="select(1, $event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}} <span class="count">{{negative.length}}</span> </span>
      </div>
      <div @click="toggleCountent" class="switch" :class="{'on':onlyContent === true}">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      tpye: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    select (type, event) {
      if (event._constrcted) {
        return
      }
      this.$emit('select', type)
    },
    toggleCountent (event) {
      if (event._constrcted) {
        return
      }
      this.$emit('toggle', this.onlyContent)
    }
  },
  computed: {
    positive () {
      return this.ratings.filter((ratings) => {
        return ratings.rateType === POSITIVE
      })
    },
    negative () {
      return this.ratings.filter((ratings) => {
        return ratings.rateType === NEGATIVE
      })
    }
  }
}
</script>

<style>
.ratingselect{
  border-bottom: 1px solid rgba(7,17,27,.1)
}
.rating-type{
  padding: 18px 0;
  margin: 0 18px;
  border-bottom: 1px solid rgba(7,17,27,.1)
}
.rating-type .block{
  display: inline-block;
  padding: 8px 12px;
  margin-right:8px;
  border-radius: 2px;
  font-size: 12px;
  line-height: 16px;
  color:rgb(77,85,93);
  cursor: pointer;
}
.rating-type .count{
  font-size: 8px;
  margin-left: 2px 
}
.positive{
  background: rgba(0,160,220,.2);
}
.positive.active{
  background: rgb(0,160,220);
  color: #fff;
  
}
.negative{
  background: rgba(77,85,93,.2);  
}
.negative.active{
  background: rgb(77,85,93);
  color: #fff;
}
.switch{
  padding: 12px 18px;
  font-size: 12px;
  color: rgb(147,153,159);
  line-height: 24px;
  font-size: 0;
}
.switch .icon-check_circle{
  display: inline-block;
  font-size: 24px;
  margin-right: 4px;
  vertical-align: top; 
  line-height: 24px;
}
.switch.on{
  color: #00c580;
}
.switch .text{
  display: inline-block;  
  vertical-align: top;   
  font-size: 12px;

}
</style>