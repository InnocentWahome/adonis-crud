<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Add a Project
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Fill This Form to Add Your New Project ** dropdown selection in beta**" icon="ballot">
        <form @submit.prevent="submit">
          <!-- Project Name area -->
          <b-field label="Project Name" horizontal>
            <b-field>
              <b-input icon="" v-model="project_name" placeholder="Your project name" name="" required />
            </b-field>

            <!-- Project Lead Area -->
            <b-field label="Project Lead" horizontal>
              <b-input icon="" v-model="project_lead" placeholder="Who's incharge of this project" name="" required />
             <!-- <b-field>
              <b-input icon="account" v-model="form.name" placeholder="Who's incharge of this project" name="name" required />
            </b-field> -->
            <!-- <b-select placeholder="Who's in charge of this project" v-model="project_lead" required>
              <option v-for="(employees, index) in employees" :key="index" :value="employees">
                {{ employees }}
              </option>
            </b-select> -->
          </b-field>

            <!-- Email imput area -->
          <!-- <b-field label="Project Lead Email" horizontal>
            <b-field>
              <b-input icon="email" type="email" v-model="form.email" placeholder="E-mail" name="email" required />
            </b-field>  -->
            <!-- Phone number input area -->
          <!-- </b-field>
          <b-field message="Do not enter the leading zero" horizontal>
            <b-field>
              <p class="control">
                <a class="button is-static">
                  +44
                </a>
              </p>
              <b-input type="tel" v-model="form.phone" name="phone" expanded />
            </b-field> -->

            <!-- Project Category Area -->
          </b-field>
          <b-field label="Project Category" horizontal>
            <b-input icon="" v-model="project_category" placeholder="Your project category" name="" required />
            <!-- <b-select placeholder="Select a category" v-model="project_category" required>
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department }}
              </option>
            </b-select> -->
          </b-field>
          <hr>
          <!-- Selecting team to work on the project -->
          <b-field label="Project Team" message="These people will be working on the project" horizontal>
            <b-input icon="" v-model="project_team" placeholder="Your project team" name="" required />
            <!-- <b-select placeholder="Select a team" v-model="project_team" required>
              <option v-for="(employees, index) in employees" :key="index" :value="employees">
                {{ employees }}
              </option>
            </b-select> -->
          </b-field>
          <!-- Project Description Area -->
          <b-field label="Project Description" message="Max 255 characters" horizontal>
            <b-input type="textarea" placeholder="Describe what this project is about." v-model="project_description" maxlength="255" required/>
          </b-field>
          <hr>
          <!-- Start and Due dates Area -->
          <b-field label="Start Date" horizontal>
            <b-field>
              <b-datepicker
                @input="input"
                v-model="start_date"
                placeholder="Click to select..."
                icon="calendar-today">
              </b-datepicker>
            </b-field>
            <b-field label="Due Date" horizontal>
              <b-datepicker
                @input="input"
                v-model="due_date"
                placeholder="Click to select..."
                icon="calendar-today">
              </b-datepicker>
            </b-field>
            </b-field>
          <hr>
          <b-field horizontal></b-field>
            <!-- <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Submit</b-button>
              </div>
              <div class="control">
                <b-button type="is-primary is-outlined" @click="reset">Reset</b-button>
              </div>
            </b-field>
          </b-field> -->
        </form>
      </card-component>
    <!-- CUSTOMIZABLE ELEMENTS -->
      <!-- <card-component title="More Details About the Project" icon="ballot-outline">
        <b-field label="Checkbox" class="has-check" horizontal>
          <checkbox-picker :options="{lorem:'Lorem', ipsum:'Ipsum', dolore:'Dolore'}" v-model="customElementsForm.checkbox" type="is-primary"/>
        </b-field>
        <hr>
        <b-field label="Radio" class="has-check" horizontal>
          <radio-picker :options="{one:'One',two:'Two'}" v-model="customElementsForm.radio"></radio-picker>
        </b-field>
        <hr>
        <b-field label="Switch" horizontal>
          <b-switch v-model="customElementsForm.switch">
            Default
          </b-switch>
        </b-field> -->
        <hr>
    <!-- UPLOAD THE PROJECT FILE FOR MORE DETAILS -->
      <card-component>
        <b-field label="File" horizontal>
          <file-picker v-model="customElementsForm.file"/>
        </b-field>
      </card-component>
      <hr>
      <b-field horizontal>
        <b-button @click="addproject" type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
      </b-field>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
// import TitleBar from '@/components/TitleBar'
// import CardComponent from '@/components/CardComponent'
import mapValues from 'lodash/mapValues'
// import CheckboxPicker from '@/components/CheckboxPicker'
// import RadioPicker from '@/components/RadioPicker'
import FilePicker from '@/components/FilePicker'
import HeroBar from '@/components/HeroBar'
import CardComponent from '../components/CardComponent.vue'

export default {
  name: 'AddProject',
  components: {
    HeroBar,
    FilePicker,
    // RadioPicker,
    //  CheckboxPicker,
    CardComponent
    // TitleBarCardComponent
  },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        email: null,
        phone: null,
        department: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        checkbox: [],
        radio: null,
        switch: true,
        file: null
      },
      departments: [
        'Debugging',
        'Design',
        'Stand-Up Meetings'
      ],
      employees: [
        'Innocent Wahome',
        'Victor Kariuki',
        'Daniel Waruo',
        'Caren Nduta'
      ],
      project_name: '',
      project_lead: '',
      project_category: '',
      project_team: '',
      project_description: '',
      start_date: '',
      due_date: ''
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Forms'
      ]
    }
  },
  methods: {
    addproject () {
      const newProject = {
        project_name: this.project_name,
        project_lead: this.project_lead,
        project_category: this.project_category,
        project_team: this.project_team,
        project_description: this.project_description,
        start_date: this.start_date,
        due_date: this.due_date
      }
      axios.post('http://localhost:4000/addproject', newProject)
        .then(res => {
          console.log(res)
          this.error = ''
          this.$router.push('/allprojects')
        }, err => {
          console.log(err.response)
          this.error = err.response.data.error
        })
    },
    reset () {
      this.form = mapValues(this.form, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
    }
  }
}
</script>
