import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '../services/authServices';

import LoginLayout from '../layouts/LoginLayout.vue';
import MainLayout from '../layouts/MainLayout.vue';
import DetailedLayout from '../layouts/DetailedLayout.vue';

import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import OrdersView from '../views/OrdersView.vue';
import ReportsView from '../views/ReportsView.vue';
import OrderDetailView from '../views/OrderDetailView.vue';
import InputTransactionView from '../views/InputTransactionView.vue';
import InputOrderView from '../views/InputOrderView.vue';
import ProfileDetailView from '../views/ProfileDetailView.vue';

const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: { publicOnly: true },
    name: 'Login'
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: DashboardView },
      { path: 'orders', name: 'Orders', component: OrdersView },
      { path: 'reports/:month/:year', name: 'Reports', component: ReportsView, props: true }
    ]
  },
  {
    path: '/',
    component: DetailedLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'orders/:id/add-transaction', name: 'InputTransaction', component: InputTransactionView, props: true },
      { path: 'orders/add', name: 'InputOrder', component: InputOrderView },
      { path: 'orders/:id', name: 'OrderDetail', component: OrderDetailView, props: true },
      { path: 'profile', name: 'ProfileDetail', component: ProfileDetailView }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard for auth
router.beforeEach((to, from, next) => {
  const isAuth = authService.isAuthenticated();
  if (to.meta.requiresAuth && !isAuth) {
    return next({ name: 'Login' });
  }
  if (to.meta.publicOnly && isAuth) {
    return next({ name: 'Dashboard' });
  }
  next();
});

export default router;
