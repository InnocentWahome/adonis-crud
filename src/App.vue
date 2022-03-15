<template>
  <div id="app">
    <nav-bar/>
    <aside-menu :menu="menu" @menu-click="menuClick"/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        'Home',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Admin Dashboard'
          },
          {
            to: '/employeedashboard',
            icon: 'desktop-mac',
            label: 'Employee Dashboard'
          }
        ],
        'General',
        [
          // {
          //   action: 'dark-mode-toggle',
          //   label: 'Dark / White',
          //   icon: 'weather-night'
          // },
          {
            to: '/tasks',
            label: 'All Tasks',
            icon: 'table',
            updateMark: true
          },
          {
            to: '/mytasks',
            label: 'My Tasks',
            icon: 'table'
          },
          {
            to: '/assigntask',
            label: 'New Task',
            icon: 'square-edit-outline'
          },
          // {
          //   to: '/profile',
          //   label: 'Profile',
          //   icon: 'account-circle'
          // },
          {
            to: '/selfassignedtask',
            label: 'Your New Task',
            icon: 'square-edit-outline'
          },
          {
            label: 'Projects',
            subLabel: 'Projects Home',
            icon: 'view-list',
            menu: [
              {
                to: '/allprojects',
                label: 'All projects'
              },
              {
                to: '/addproject',
                label: 'Add a project'
              }
            ]
          }
        ],
        'About',
        [
          // {
          //   href: 'https://admin-null.justboil.me',
          //   label: 'Premium Demo',
          //   icon: 'credit-card'
          // },
          {
            href: 'http://primedevs.io',
            label: 'About',
            icon: 'help-circle'
          }
        ],
        'Extras',
        [
          // {
          //   href: 'https://admin-null.justboil.me',
          //   label: 'Premium Demo',
          //   icon: 'credit-card'
          // },
          {
            href: '/https://docs.google.com/document/d/1YkP4Vs9Ld7qB2hGtIfi6TbYlVWzAm9owns2j37aYqUY/edit',
            label: 'Documentation',
            icon: 'file'
          }
        ]
      ]
    }
  },
  created () {
    this.$store.commit('user', {
      name: 'Innocent Wahome',
      email: 'wahome@primedevs.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
  },
  methods: {
    menuClick (item) {
      if (item.action && item.action === 'dark-mode-toggle') {
        this.$store.commit('darkModeToggle')
      }
    }
  }
}
</script>
