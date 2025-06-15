import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard.vue"),
    children: [
      {
        path: "cabinet",
        name: "Cabinet",
        components: {
         aside: () => import('@/components/Cabinet.vue'),
       },
      },
      {
         path: "edit-profile",
         name: "EditProfile",
         components: {
           aside: () => import('@/components/EditProfile.vue'),
         },
       },
    ],
  },
  {
    path: "/booking",
    name: "booking",
    component: () => import("@/components/BookingView.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;

// {
//    path: '/home',
//    name: 'home',
//    component: () => import('@/views/Home.vue')
// },
// {
//    path: '/reservations',
//    name: 'reservations',
//    component: () => import('@/views/Reservations.vue')
// },
// {
//    path: '/favorites',
//    name: 'favorites',
//    component: () => import('@/views/Favorites.vue')
// },
// {
//    path: '/profile',
//    name: 'profile',
//    component: () => import('@/views/Profile.vue')
// },
