<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      These are all the current projects we have
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default"/>
          <b>Sorted and paginated table.</b>&nbsp;
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced" title="Projects" icon="stack">
        <projects-table-sample :projects='projects' :checkable="true"/>
      </card-component>

      <hr>

      <!-- <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default"/>
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced">
        <clients-table-sample :data-url="`${$router.options.base}data-sources/employees.json`" :checkable="true"/>
      </card-component>

      <hr>

      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default"/>
          <b>Empty table.</b> When there's nothing to show
        </div>
      </notification> -->

      <!-- <card-component class="has-table has-thead-hidden">
        <clients-table-sample/>
      </card-component> -->
    </section>
  </div>

</template>

<script>
import axios from 'axios'
import Notification from '@/components/Notification'
import ProjectsTableSample from '@/components/ProjectsTableSample'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'

export default {
  name: 'Projects',

  components: { HeroBar, TitleBar, CardComponent, ProjectsTableSample, Notification },

  data: () => ({
    projects: []
  }),

  computed: {
    titleStack () {
      return [
        'Projects',
        'All Projects'
      ]
    }
  },

  async created () {
    try {
      const response = await axios.get('http://localhost:4000/projects')
      this.projects = response.data.data
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
