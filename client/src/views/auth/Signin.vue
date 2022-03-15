<template>
  <div>
    <!-- <h1>New Employee</h1> -->
    <!-- <title-bar :title-stack="titleStack"/> -->
    <hero-bar>
      <!-- {{ heroTitle }} -->
      <h2>Sign In</h2>
      <!-- Dashboard Button -->
      <!-- <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link> -->
    </hero-bar>
    <section class="section is-main-section">
      <!-- DEMO NOTIFICATION -->
      <!-- <notification class="is-info">
        <div>
          <span><b>Demo only.</b> No data will be saved/updated</span>
        </div>
      </notification> -->
      <tiles>
        <card-component title="Sign in to Continue Where You Left Off" icon="account" class="tile is-child">
          <!-- <form @submit.prevent="submit"> -->
            <form>
            <b-field label="Email" message="Your email" horizontal>
              <b-input placeholder="example@example.com" v-model="email" required />
            </b-field>
            <b-field label="Password" message="Your password" horizontal>
              <b-input placeholder="must have at least 6 characters" v-model="password" required />
            </b-field>
            <b-field horizontal>
              <b-button @click="add_employee" type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
            </b-field>
          </form>
        </card-component>
        <!-- <card-component v-if="isProfileExists" title="Employee Profile" icon="account" class="tile is-child">
          <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
          <hr>
          <b-field label="Name">
            <b-input :value="form.name" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Email">
            <b-input :value="form.email" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Role">
            <b-input :value="form.role" custom-class="is-static" aria-placeholder="intern" readonly/>
          </b-field>
          <b-field label="Phone Number">
            <b-input :value="form.number" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Created">
            <b-input :value="createdReadable" custom-class="is-static" readonly/>
          </b-field>
          <hr>
          <b-field label="Progress">
            <progress class="progress is-small is-primary" :value="form.progress" max="100">{{ form.progress }}</progress>
          </b-field>
        </card-component> -->
      </tiles>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import find from 'lodash/find'
// import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
// import FilePicker from '@/components/FilePicker'
// import UserAvatar from '@/components/UserAvatar'
// import Notification from '@/components/Notification'

export default {
  name: 'ClientForm',
  components:
  {
    // UserAvatar,
    // FilePicker,
    CardComponent,
    Tiles,
    HeroBar
    // TitleBar
    // Notification
  },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      // -------------------------------------if profile exists
      isProfileExists: false,
      email: '',
      password: ''
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'New client'
      }

      return [
        'Admin',
        'Clients',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Create Client'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'client.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'New client'
      } else {
        return 'Dashboard'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Edit Client'
      } else {
        return 'New Client'
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        id: null,
        name: null,
        company: null,
        city: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null,
        progress: 0
      }
    },
    getData () {
      if (this.id) {
        axios
          .get(`${this.$router.options.base}data-sources/employees.json`)
          .then(r => {
            const item = find(r.data.data, item => item.id === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'client.new' })
            }
          })
          .catch(e => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    submit () {
      // this.isLoading = true

      // setTimeout(() => {
      //   this.isLoading = false

      //   this.$buefy.snackbar.open({
      //     message: 'Demo only',
      //     queue: false
      //   })
      // }, 500)
    },
    add_employee () {
      const Employee = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:4000/login', Employee)
        .then(res => {
          // if successfull
          if (res.status === 200) {
            // localStorage.setItem('token', res.data.token)
            this.$router.push('/')
          }
        }, err => {
          console.log(err.response)
          this.error = err.response.data.error
        })
    }
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
      } else {
        this.getData()
      }
    }
  }
}
</script>
<style scoped>
h2 {
  text-align: center;
}
</style>
