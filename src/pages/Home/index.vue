<template>
<!-- 三级联动全局组件，直接使用 -->
  <div>
    <type-nav></type-nav>
    <list-container></list-container>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"></Floor>
    <brand></brand>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
export default {
    name:'Home',
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    mounted(){
      this.$store.dispatch('getFloorList')
    },
    computed:{
      ...mapState({
        floorList:state => state.home.floorList
      })
    }
    /* 
    组件通信方式
    props：用于父子组件通信
    自定义事件：@on @emit 可以实现子给父通信
    全局事件总线：$bus 全能
    pubsub-js：vue当中几乎不用 全能
    插槽
    vuex
    */
}
</script>

<style>

</style>