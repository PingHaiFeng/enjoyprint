import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () =>
        import('@/views/login/index'),
    hidden: true
},

{
    path: '/404',
    component: () =>
        import('@/views/404'),
    hidden: true
},

{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: () =>
            import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
    }]
},
{
    path: '/client-print',
    component: Layout,
    redirect: 'phone-order',
    meta: { title: '订单列表', icon: 'el-icon-tickets' },
    children: [
        {
            path: 'phone-order',
            name: 'phone-order',
            component: () =>
                import('@/views/client-print/phone-order/phone-order'),
            meta: { title: '手机自助订单', icon: '', affix: true }
        },
        {
            path: 'computer-order',
            name: 'computer-order',
            component: () =>
                import('@/views/client-print/computer-order/computer-order'),
            meta: { title: '电脑自助订单', icon: '' }
        },
        {
            path: 'file-order-detail',
            name: 'file-order-detail',
            component: () =>
                import('@/views/client-print/file-order-detail/file-order-detail'),
            meta: { title: '订单详情', icon: '', affix: true },
            hidden: true
        },

    ]
},
{
    path: '/print-setting',
    component: Layout,
    redirect: 'price-list',
    meta: { title: '打印设置', icon: 'el-icon-printer' },
    children: [

        {
            path: 'discount-list',
            name: 'discount-list',
            component: () =>
                import('@/views/print-setting/discount-list/discount-list'),
            meta: { title: '折扣设置', icon: '' }
        },
        {
            path: 'self-printers',
            name: 'self-printers',
            component: () =>
                import('@/views/print-setting/self-printers/self-printers'),
            meta: { title: '手机打印', icon: '' }
        }

    ]
},
{
    path: '/price',
    component: Layout,
    redirect: 'price-list',
    meta: { title: '价格设置', icon: 'el-icon-price-tag' },
    children: [
        {
            path: 'price-list',
            name: 'price-list',
            component: () =>
                import('@/views/price/price-list/price-list'),
            meta: { title: '手机打印价格', icon: '' }
        }

    ]
},

{
    path: '/finance',
    component: Layout,
    redirect: 'today-bill',
    meta: { title: '营业数据', icon: 'el-icon-coin' },
    children: [{
        path: 'today-bill',
        name: 'today-bill',
        component: () =>
            import('@/views/finance/today-bill/today-bill'),
        meta: { title: '今日收益', icon: '' }
    },
    {
        path: 'history-bill',
        name: 'history-bill',
        component: () =>
            import('@/views/finance/history-bill/history-bill'),
        meta: { title: '历史收益', icon: '' }
    }

    ]
},
{
    path: '/shop-admin',
    component: Layout,
    redirect: 'shop-info',
    meta: { title: '店铺管理', icon: 'el-icon-school' },
    children: [{
        path: 'shop-info',
        name: 'shop-info',
        component: () =>
            import('@/views/shop-admin/shop-info/shop-info'),
        meta: { title: '门店信息', icon: '' }
    },
    {
        path: 'equipment-monitor',
        name: 'equipment-monitor',
        component: () =>
            import('@/views/shop-admin/equipment-monitor/equipment-monitor'),
        meta: { title: '机器管理', icon: '' }
    }

    ]
},
{
    path: '/vip',
    component: Layout,
    children: [{
        path: 'vip-list',
        name: 'vip-list',
        component: () =>
            import('@/views/vip/vip-list/vip-list'),
        meta: { title: '会员管理', icon: 'vip' }
    }]
},
{
    path: '/help',
    component: Layout,
    redirect: 'use-help',
    meta: { title: '云即印助手', icon: 'el-icon-help' },
    children: [
        {
            path: 'use-help',
            name: 'use-help',
            component: () =>
                import('@/views/help/use-help/use-help'),
            meta: { title: '常见问题', icon: '' }
        },
        {
            path: 'update-help',
            name: 'update-help',
            component: () =>
                import('@/views/help/update-help/update-help'),
            meta: { title: '公告列表', icon: '' }
        },
        {
            path: 'download-help',
            name: 'download-help',
            component: () =>
                import('@/views/help/download-help/download-help'),
            meta: { title: '下载专区', icon: '' }
        },

    ]
},
{
    path: '/credit',
    component: Layout,
    meta: { title: '挂账管理', icon: 'credit' },
    children: [
        {
            path: 'credit-record',
            name: 'credit-record',
            component: () =>
                import('@/views/credit/credit-record/credit-record'),
            meta: { title: '挂账记录', icon: '' }
        },
        {
            path: 'credit-manage',
            name: 'credit-manage',
            component: () =>
                import('@/views/credit/credit-manage/credit-manage'),
            meta: { title: '挂账管理', icon: '' }
        },

    ]
},
{
    path: '/library',
    component: Layout,
    meta: { title: '文库管理', icon: 'el-icon-folder' },
    children: [
        {
            path: 'folder',
            name: 'folder',
            component: () =>
                import('@/views/library/folder/folder'),
            meta: { title: '文件夹管理', icon: '' }
        },
        {
            path: 'doc-upload',
            name: 'doc-upload',
            component: () =>
                import('@/views/library/doc-upload/doc-upload'),
            meta: { title: '资料上传', icon: '' }
        }

    ]
},
{
    path: '/marketing',
    component: Layout,
    meta: { title: '广告营销', icon: 'dashboard' },
    children: [
        {
            path: 'first-page-ad',
            name: 'first-page-ad',
            component: () =>
                import('@/views/marketing/first-page-ad/first-page-ad'),
            meta: { title: '首页广告', icon: '' }
        },
        {
            path: 'free-printing',
            name: 'free-printing',
            component: () =>
                import('@/views/marketing/free-printing/free-printing'),
            meta: { title: '免费打印', icon: '' }
        },

    ]
},
{
    path: '/plat-announce',
    component: Layout,
    children: [{
        path: 'plat-announce',
        name: 'plat-announce',
        component: () =>
            import('@/views/plat-announce/plat-announce'),
        meta: { title: '平台公告', icon: 'el-icon-user' }
    }]
},
{
    path: '/matter-download',
    component: Layout,
    children: [{
        path: 'matter-download',
        name: 'matter-download',
        component: () =>
            import('@/views/matter-download/matter-download'),
        meta: { title: '物料下载', icon: 'el-icon-download' }
    }]
},



// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router