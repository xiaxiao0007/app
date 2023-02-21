<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a>
            <a @click="logOut" class="register">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="../images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'Header',
  // 数据的返回
  data(){
      return {
          keyword:'',
      }
  },
  methods:{
    // 搜索按钮的回调函数：需要search路由进行跳转

    // 问题3.params参数可以传递也可以不传递，但是如果传递的是空串，如何解决?
    // 使用undefined解决：params参数可以传递，不传递（空的字符串）
    // params:{keyword:'' || undefined,},
    
    goSearch(){
      // 合并参数
      if(this.$route.query){
        let location = {
          name:"search",
          params:{
            keyword:this.keyword || undefined
          }
        }
        location.query = this.$route.query
        this.$router.push(location)
      }
      /* this.$router.push({
        name:"search",
        // 路由的参数传递
        params:{
          keyword:this.keyword || undefined,
        },
        query:{
          k:this.keyword.toUpperCase(),
        }
      }) */
    },
    // 退出登陆
    logOut(){
      //退出登录需要做的事情
      //1:需要发请求，通知服务器退出登录【清除一些数据：token】
      //2:清除项目当中的数据【userInfo、token】
      try {
        this.$store.dispatch('logout');
        // 跳转到首页
        this.$router.push('/home');
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed:{
    ...mapState({
      userName: (state) => state.user.userInfo.name,
    }),
  },
  mounted(){
    // 通过全局事件总线清楚关键字
    this.$bus.$on("clear",()=>{
      this.keyword = "";
    })
  }

}
</script>


<style lang="less" scoped>
// 使用less样式的语法格式
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>  