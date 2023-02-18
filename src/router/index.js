// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

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

// 配置路由
export default new VueRouter({
    // 配置路由
    routes:[
        {
            path:"/home",
            component:Home,
            // 路由的元信息,在路由中添加其它信息
            meta:{
                show:true
            }
        },
        {
            path:"/login",
            component:Login,
            meta:{
                show:false
            }
        },
        {
            name:'search',
            path:"/search/:keyword?", // /:keyword这为占位符 在结尾后面加一个?,则param参数可传可不传
            component:Search,
            meta:{
                show:true
            }
        },
        {
            path:"/register",
            component:Register,
            meta:{
                show:false
            }
        },
        {
            name:'detail',
            path:"/detail/:skuid", // 在路由进行跳转的时候需要进行参数的传递
            component:Detail,
            meta:{
                show:true
            }
        },
        {
            path:"/addcartsuccess",
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{
                show:true
            }
        },
        {
            path:"/shopcart",
            component:ShopCart,
            meta:{
                show:true
            }
        },
        // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页home
        {
            path:"*",
            redirect:'/home'
        }
    ],
    // 路由的其它用处:滚动行为
    scrollBehavior(to, from, savedPosition){
        // 返回的这个y=0,代表滚动条在最上方
        return {y:0}
    }
})