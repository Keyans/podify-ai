
import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '../views/dashboard/index.vue';
import { isAuthenticated } from '../store/auth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/dashboard.vue')
      },
      {
        path: 'my-apps',
        name: 'MyApps',
        component: { template: '<router-view />' },
        redirect: '/my-apps/product-collection',
        children: [
          {
            path: 'product-collection',
            name: 'ProductCollection',
            component: () => import('../views/my-apps/product-collection/index.vue')
          },
          {
            path: 'smart-crop',
            name: 'SmartCrop',
            component: () => import('../views/my-apps/smart-crop/index.vue')
          },
          {
            path: 'one-click-cutout',
            name: 'OneClickCutout',
            component: () => import('../views/my-apps/one-click-cutout/index.vue')
          },
          {
            path: 'super-split',
            name: 'SuperSplit',
            component: () => import('../views/my-apps/super-split/index.vue')
          },
          {
            path: 'copyright-detection',
            name: 'CopyrightDetection',
            component: () => import('../views/my-apps/copyright-detection/index.vue')
          },
          {
            path: 'title-generator',
            name: 'TitleGenerator',
            component: () => import('../views/my-apps/title-generator/index.vue')
          },
          {
            path: 'batch-listing',
            name: 'BatchListing',
            component: () => import('../views/my-apps/batch-listing/index.vue')
          },
          {
            path: 'pod-compose',
            name: 'PodCompose',
            component: () => import('../views/my-apps/pod-compose/index.vue')
          }
        ]
      },
      {
        path: 'workflows',
        name: 'Workflows',
        component: () => import('../views/workflows/index.vue')
      },
      {
        path: 'gallery',
        name: 'Gallery',
        component: { template: '<router-view />' },
        redirect: '/gallery/overview',
        children: [
          {
            path: 'overview',
            name: 'GalleryOverview',
            component: () => import('../views/gallery/index.vue')
          },
          {
            path: 'products',
            name: 'ProductGallery',
            component: () => import('../views/gallery/products/index.vue')
          },
          {
            path: 'materials',
            name: 'MaterialGallery',
            component: () => import('../views/gallery/materials/index.vue')
          },
          {
            path: 'backgrounds',
            name: 'BackgroundGallery',
            component: () => import('../views/gallery/backgrounds/index.vue')
          },
          {
            path: 'results',
            name: 'ResultGallery',
            component: () => import('../views/gallery/results/index.vue')
          }
        ]
      },
      {
        path: 'products',
        name: 'Products',
        component: { template: '<router-view />' },
        redirect: '/products/basic',
        children: [
          {
            path: 'basic',
            name: 'BasicProducts',
            component: () => import('../views/products/index.vue')
          },
          {
            path: 'pod',
            name: 'PodProducts',
            component: () => import('../views/products/pod/index.vue')
          }
        ]
      },
      {
        path: 'app-market',
        name: 'AppMarket',
        component: () => import('../views/app-market/index.vue')
      },
      {
        path: 'account-settings',
        name: 'AccountSettings',
        component: () => import('../views/account-settings/index.vue'),
        redirect: '/account-settings/profile',
        children: [
          {
            path: 'profile',
            name: 'AccountProfile',
            component: () => import('../views/account-settings/profile/index.vue')
          },
          {
            path: 'recharge',
            name: 'AccountRecharge',
            component: () => import('../views/account-settings/recharge/index.vue')
          },
          {
            path: 'transactions',
            name: 'AccountTransactions',
            component: () => import('../views/account-settings/transactions/index.vue')
          },
          {
            path: 'sub-accounts',
            name: 'SubAccounts',
            component: () => import('../views/account-settings/sub-accounts/index.vue')
          },
          {
            path: 'permissions',
            name: 'AccountPermissions',
            component: () => import('../views/account-settings/permissions/index.vue')
          },
          {
            path: 'logout',
            name: 'AccountLogout',
            component: () => import('../views/account-settings/logout/index.vue')
          }
        ]
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated.value) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated.value) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;
