// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: "/center",
        component: Center,
        //二级路由
        children: [{
                // path: '/center/myorder',
                path: "myorder",
                component: MyOrder,
            },
            {
                path: "grouporder",
                component:GroupOrder,
            },
            { //重定向一上来就展示myorder组件
                path: '',
                redirect: 'myorder'
            }
        ],
        meta: {
            show: true,
        },
    },
    {
        path: "/paySuccess",
        component: PaySuccess,
        meta: {
            show: true,
        },
    },
    {
        path: "/pay",
        component:Pay,
        meta: {
            show: true,
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component: Trade,
        // 路由的元信息,在路由中添加其它信息
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/home",
        component: Home,
        // 路由的元信息,在路由中添加其它信息
        meta: {
            show: true
        }
    },
    {
        path: "/login",
        component: Login,
        meta: {
            show: false
        }
    },
    {
        name: 'search',
        path: "/search/:keyword?", // /:keyword这为占位符 在结尾后面加一个?,则param参数可传可不传
        component: Search,
        meta: {
            show: true
        }
    },
    {
        path: "/register",
        component: Register,
        meta: {
            show: false
        }
    },
    {
        name: 'detail',
        path: "/detail/:skuid", // 在路由进行跳转的时候需要进行参数的传递
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        name: 'addcartsuccess',
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: {
            show: true
        }
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页home
    {
        path: "*",
        redirect: '/home'
    }
];