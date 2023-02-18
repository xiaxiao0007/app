<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 一级菜单 -->
            <!-- 利用事件委派+编程式导航解决路由的跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" v-bind:key="c1.categoryId" :class="{cur:currentIndex == index}">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-categoryId1="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二三级菜单 -->
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" v-bind:key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-categoryId2="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" v-bind:key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-categoryId3="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 从vuex中取出存储的数据
import { mapState} from 'vuex'
// 引入方式：是把lodash全部功能函数引入
// import _ from 'lodash'
// 按需引入
import throttle from 'lodash/throttle'
export default {
    name:'TypeNav',
    data(){
      return {
        // 存储
        currentIndex:-1,
        show:true,
      }
    },
    // 当组件挂载完毕：可以向服务器发请求
    mounted(){
      // 通知Vuex发请求,获取数据,存储在仓库当中
      this.$store.dispatch('getCategoryList')
      // 当组件挂载完毕,让show属性变为false

      //如果不是Home路由组件，将typeNav进行隐藏
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    computed:{
      // 右侧需要的是一个函数,当使用这个计算属性的时候,右侧函数会立即执行一次
      // 注入一个参数state,其实为大仓库中的数据
      ...mapState({
        categoryList:(state) => {
          return state.home.categoryList;
          }
      })
    },
    methods:{
      /* 
      解决快速触发事件
      节流：在规定的间隔时间范围内不会重复触发回调,只有大于这个时间间隔才会触发回调,把频繁触发变为少量触发
      防抖：前面所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次
      */

      // 鼠标进入修改响应式数据currentIndex属性
      /* changeIndex(index){
        // index：鼠标移上某一个一级分类的元素的索引值
        this.currentIndex = index
      }, */
      // throttle不要使用键值函数
      changeIndex:throttle(function(index){
        this.currentIndex = index;
      }, 50),

      leaveIndex(){
        this.currentIndex = -1
        if(this.$route.path != '/home'){
          this.show = false
        }
      },

      // 进行路由跳转
      goSearch(event){
        // 最好的方式：编程式导航+事件委派
        // 利用事件委派有哪些问题：1.单点一定是a标签呢 2.如何获取参数【1，2，3级】
        let element = event.target;
        //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值 解构赋值
        let {categoryname,categoryid1,categoryid2,categoryid3} = element.dataset
        if(categoryname){ // 判断是a标签
          // 整理路由跳转的参数
          let location = {name:"search"} // 路由的对象写法
          let query = {categoryName:categoryname}
          if(categoryid1){
            query.categoryId1 = categoryid1
          }else if(categoryid2){
            query.categoryId2 = categoryid2
          }else if(categoryid3){
            query.categoryId3 = categoryid3
          }

          /* // 整理完参数
          location.query = query;
          // 路由跳转
          this.$router.push(location) */

          // 判断：如果路由跳转的时候，带有params参数，捎带的传递过去
          if(this.$route.params){
            // 合并参数
            location.params = this.$route.params;
            // 动态给location配置对象添加query属性
            location.query = query;
            // 路由跳转
            this.$router.push(location)
          }
        }
      },
      enterShow(){
        this.show = true
      }
    }
}
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    //过渡动画结束状态（进入）
    .sort-enter-to {
      height: 481px;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>