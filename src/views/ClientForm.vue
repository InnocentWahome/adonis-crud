<template>
  <div>
    <h1>New Employee</h1>
    <!-- <title-bar :title-stack="titleStack"/> -->
    <hero-bar>
      <!-- {{ heroTitle }} -->
      <h2>Add a New Employee to your Company</h2>
      <!-- Dashboard Button -->
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <!-- DEMO NOTIFICATION -->
      <!-- <notification class="is-info">
        <div>
          <span><b>Demo only.</b> No data will be saved/updated</span>
        </div>

      </notification> -->
      <tiles>
        <card-component title="New Employee" icon="account-edit" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="Employee ID" horizontal>
              <b-input v-model="form.id" custom-class="is-static" readonly />
            </b-field>
            <hr>
            <b-field label="Avatar" horizontal>
              <file-picker/>
            </b-field>
            <hr>
            <b-field label="First Name" message="Employee's first name" horizontal>
              <b-input placeholder="John" v-model="firstname" required />
            </b-field>
            <b-field label="Last Name" message="Employee's last name" horizontal>
              <b-input placeholder="Doe" v-model="lastname" required />
            </b-field>
            <b-field label="Username" message="Employee's prefered username" horizontal>
              <b-input placeholder="WillSmith" v-model="username" required />
            </b-field>
            <b-field label="Email" message="Employee's Email" horizontal>
              <b-input placeholder="example@example.com" v-model="email" required />
            </b-field>
            <b-field label="Role" message="Employee's Role" horizontal>
              <b-select placeholder="Who's in charge of this project" v-model="role" required>
              <option v-for="(roles, index) in roles" :key="index" :value="roles">
                {{ roles }}
              </option>
            </b-select>
            </b-field>
            <b-field label="Phone Number" message="Employee's phone number" v-model="phone_number" horizontal>
              <b-field>
              <p class="control">
                <a class="button is-static">
                  +254
                </a>
              </p>
              <b-input type="tel" v-model="phone_number" name="phone" expanded />
            </b-field>
            </b-field>
            <b-field>
              <b-field label="Member Since" v-model="member_since" horizontal>
              <b-datepicker
                @input="input"
                v-model="member_since"
                placeholder="Click to select..."
                icon="calendar-today">
              </b-datepicker>
            </b-field>
            <b-field label="Date Of Birth" horizontal>
              <b-datepicker
                @input="input"
                v-model="date_of_birth"
                placeholder="Click to select..."
                icon="calendar-today">
              </b-datepicker>
            </b-field>
            </b-field>
            <hr>
            <b-field label="Default Password"  message="Employee's default password" horizontal>
              <b-input placeholder="Will@Smith2020" type="password"  v-model="password" required />
            </b-field>
            <hr>
            <b-field horizontal>
              <b-button @click="add_employee" type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
            </b-field>
          </form>
        </card-component>
        <card-component v-if="isProfileExists" title="Employee Profile" icon="account" class="tile is-child">
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
        </card-component>
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
import FilePicker from '@/components/FilePicker'
import UserAvatar from '@/components/UserAvatar'
// import Notification from '@/components/Notification'

export default {
  name: 'ClientForm',
  components:
  {
    UserAvatar,
    FilePicker,
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
      isProfileExists: false,
      employees: [
        'Innocent Wahome',
        'Victor Kariuki',
        'Daniel Waruo',
        'Caren Nduta',
        'Add others From DB'
      ],
      roles: [
        'Intern',
        'Junior Dev',
        'Senior Dev',
        'Graphics Designed',
        'Consultant'
      ],
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      role: '',
      phone_number: '',
      member_since: '',
      date_of_birth: ''
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
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Demo only',
          queue: false
        })
      }, 500)
    },
    add_employee () {
      const newEmployee = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password,
        email: this.email,
        role: this.role,
        phone_number: this.phone_number,
        member_since: this.member_since,
        date_of_birth: this.date_of_birth
      }
      axios.post('http://localhost:4000/addemployee', newEmployee)
        .then(res => {
          console.log(res)
          this.error = ''
          this.$router.push('/')
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
