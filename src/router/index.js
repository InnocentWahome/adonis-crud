import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminDashboard from '../views/AdminDashboard.vue'
import EmployeeDashboard from '../views/EmployeeDashboard.vue'
// // import AddProject from '../views/AddProject'
// import Documentation from '../views/Documentation.vue'

Vue.use(VueRouter)

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/',
    name: 'admindashboard',
    component: AdminDashboard
  },
  // // WAS TO BE THE USER DASHBOARD
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Employee_Dashboard'
    },
    path: '/employeedashboard',
    name: 'EmployeeDashboard',
    component: EmployeeDashboard
  },
  {
    meta: {
      title: 'Tasks'
    },
    path: '/tasks',
    name: 'tasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tasks.vue')
  },
  {
    meta: {
      title: 'New Project'
    },
    path: '/addproject',
    name: 'Add a Project',
    component: () => import(/* webpackChunkName: "forms" */ '../views/AddProject.vue')
  },
  {
    meta: {
      title: 'All Projects'
    },
    path: '/allprojects',
    name: 'All Project',
    component: () => import(/* webpackChunkName: "forms" */ '../views/AllProjects.vue')
  },
  {
    meta: {
      title: 'Assign a Task'
    },
    path: '/assigntask',
    name: 'Add a Task',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/AssignTask.vue')
  },
  {
    meta: {
      title: 'Your New Task'
    },
    path: '/selfassignedtask',
    name: 'Your New Task',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/SelfAssignedTasks.vue')
  },
  {
    meta: {
      title: 'My Tasks'
    },
    path: '/mytasks',
    name: 'My Tasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/userTasks.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    meta: {
      title: 'Documentation'
    },
    path: '/documentation',
    name: 'Documentation',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Documentation.vue')
  },
  {
    meta: {
      title: 'New client'
    },
    path: '/client/new',
    name: 'client.new',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue')
  },
  {
    meta: {
      title: 'Edit client'
    },
    path: '/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Sign Up'
    },
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/auth/Signup.vue')
  },
  {
    meta: {
      title: 'Sign In'
    },
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/auth/Signin.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
