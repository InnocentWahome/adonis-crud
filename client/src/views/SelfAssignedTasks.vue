<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      What else can you do?
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Fill This Form to Add Your New Task" icon="ballot">
        <form @submit.prevent="submit">
          <!-- Task Name area -->
          <b-field label="Task Name" horizontal>
            <b-field>
              <b-input icon="" v-model="task_name" placeholder="Name of the Task" name="" required />
            </b-field>

            <!-- Task Lead Area -->
            <!-- <b-field label="Task Lead" horizontal>
             <b-field>
              <b-input icon="account" v-model="form.name" placeholder="Who's incharge of this project" name="name" required />
            </b-field> -->
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
          <b-field label="Project Name" horizontal>
            <b-select placeholder="Select the Project" v-model="project_name" required>
              <option v-for="(Projects, index) in Projects" :key="index" :value="Projects">
                {{ Projects }}
              </option>
            </b-select>
          </b-field>
          <hr>
          <!-- Selecting team to work on the project -->
          <b-field label="Employee Assigned" message="Who will do this task" horizontal>
            <b-select placeholder="Select an Employee" v-model="employee_assigned" required>
              <option v-for="(employees, index) in employees" :key="index" :value="employees">
                {{ employees }}
              </option>
            </b-select>
          </b-field>
          <!-- Project Description Area -->
          <b-field label="Task Description" message="Max 255 characters" horizontal>
            <b-input type="textarea" placeholder="Explain what the assigned needs to do." v-model="task_description" maxlength="255" required/>
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
          <hr>
            <b-field horizontal>
              <b-button @click="assigntask" type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
            </b-field>
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
      <!-- <card-component>
        <b-field label="File" horizontal>
          <file-picker v-model="customElementsForm.file"/>
        </b-field>
      </card-component> -->
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
// import FilePicker from '@/components/FilePicker'
import HeroBar from '@/components/HeroBar'
import CardComponent from '../components/CardComponent.vue'

export default {
  name: 'AssignTask',
  components: {
    HeroBar,
    // FilePicker,
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
      Projects: [
        'Tujenge Pay',
        'MXC',
        'TaskTracker',
        'Sasa'
      ],
      task_name: '',
      project_name: '',
      employee_assigned: '',
      task_description: '',
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
    assigntask () {
      const newTask = {
        task_name: this.task_name,
        project_name: this.project_name,
        employee_assigned: this.employee_assigned,
        task_description: this.task_description,
        start_date: this.start_date,
        due_date: this.due_date
      }
      axios.post('http://localhost:4000/addtask', newTask)
        .then(res => {
          console.log(res)
          this.error = ''
          this.$router.push('/tasks')
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
