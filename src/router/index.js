// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);

import routers from "./routers"

// 重写编程式路由的push和replace方法
// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push|replace
// 第一个参数(location)：告诉原来的push方法,你往哪里跳转(传递那些参数)
// 第二个参数(resolve):成功的回调
// 第三个参数(reject):失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // this为当前上下文信息，this为VueRouter实例
        // call||apply
        // 相同点：都可以调用函数一次,都可以篡改函数上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{}, ()=>{});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{}, ()=>{});
    }
}

import store from "@/store";

// 创建一个路由器
let router =  new VueRouter({
    // 配置路由
    routes:routers,
    // 路由的其它用处:滚动行为
    scrollBehavior(to, from, savedPosition){
        // 返回的这个y=0,代表滚动条在最上方
        return {y:0}
    }
})
// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) =>{
    //获取仓库中的token-----可以确定用户是登录了
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录了
    if (token) {
        // console.log(this+'2')
        //已经登录而且还想去登录------不行
        if (to.path == "/login" || to.path == "/register") {
            next("/home");
        } else {
            //已经登陆了,访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                // console.log(this+'3')
                next();
            } else {
                //登陆了且没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    //获取用户信息
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // 第一次启动会出现问题
                    //token失效从新登录
                    //清除token
                    await store.dispatch("logout");
                    // 回到登录页
                    // 但如果您需要调用router实例中已经定义好的方法（如push和replace），则必须使用this来指代Router实例。
                    router.push("/login");
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.includes("/trade") || toPath.includes("/pay") || toPath.includes("/center")) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next("/login?redirect=" + toPath);
            // console.log(toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }
})

// 暴露一个路由器
export default router

