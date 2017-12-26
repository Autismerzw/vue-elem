<template>
    <div class="star" :class="starType">
        <span v-for="(item, index) in itemClasses" :class="item" :key='index' class="star-itme"></span>
    </div>
</template>

<script>
const Lenth = 5
const classOn = 'on'
const classOff = 'off'
const classHalf = 'half'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let resout = []
      let score = Math.floor(this.score * 2) / 2
      let hasHalf = score % 1 !== 0
      let hasOn = Math.floor(score)
      for (let i = 0; i < hasOn; i++) {
        resout.push(classOn)
      }
      if (hasHalf) {
        resout.push(classHalf)
      }
      while (resout.length < Lenth) {
        resout.push(classOff)
      }
      return resout
    }
  }
}
</script>

<style>
.star.star-itme{
    display: inline-block;
    background-repeat: no-repeat;
}
.star.star-48 .star-itme{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right:22px; 
    background-size: 20px 20px; 
}
.star.star-48 .star-itme:last-child{
    margin-right: 0;    
   
}
.star.star-48 .on{
    background-image: url('../../../resource/img/star48_on@2x.png')
}
.star.star-48 .off{
    background-image: url('../../../resource/img/star48_off@2x.png')
}
.star.star-48 .half{
    background-image: url('../../../resource/img/star48_half@2x.png')
}
.star.star-36 .star-itme{
    display: inline-block;    
    width: 15px;
    height: 15px;
    margin-right:6px;
    background-size: 15px 15px; 
}
.star.star-36 .star-itme:last-child{
    margin-right: 0;    
}
.star.star-36 .on{
    background-image: url('../../../resource/img/star36_on@2x.png')
}
.star.star-36 .off{
    background-image: url('../../../resource/img/star36_off@2x.png')
}
.star.star-36 .half{
    background-image: url('../../../resource/img/star36_half@2x.png')
}
.star.star-24 .star-itme{
    display: inline-block;    
    width: 10px;
    height: 10px;
    margin-right:3px;
    background-size: 10px 10px; 
}
.star.star-24 .star-itme:last-child{
    margin-right: 0;    
}
.star.star-24 .on{
    background-image: url('../../../resource/img/star24_on@2x.png')
}
.star.star-24 .off{
    background-image: url('../../../resource/img/star24_off@2x.png')
}
.star.star-24 .half{
    background-image: url('../../../resource/img/star24_half@2x.png')
}
</style>