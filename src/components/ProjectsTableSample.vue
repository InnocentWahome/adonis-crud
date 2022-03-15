<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="projects">

      <b-table-column cell-class="has-no-head-mobile is-image-cell" v-slot="props">
        <div class="image">
          <img :src="props.row.avatar" class="is-rounded">
        </div>
      </b-table-column>
      <b-table-column label="Project Name" field="name" sortable v-slot="props">
        {{ props.row.project_name }}
      </b-table-column>
      <b-table-column label="Project Lead" field="Project Lead" sortable v-slot="props">
        {{ props.row.project_lead }}
      </b-table-column>
      <b-table-column label="Project Category" field="Project Category" sortable v-slot="props">
        {{ props.row.project_category }}
      </b-table-column>
      <b-table-column label="Project Team" field="Project Team" sortable v-slot="props">
        {{ props.row.project_team }}
      </b-table-column>
      <b-table-column label="Project Description" field="Project Description" sortable v-slot="props">
        {{ props.row.project_description }}
      </b-table-column>
      <b-table-column label="Created" sortable v-slot="props">
        <small class="has-text-grey is-abbr-like" sortable :title="props.row.created">{{ props.row.created }}</small>
      </b-table-column>
      <b-table-column label="Due" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.due }}</small>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'project.edit', params: {id: props.row.id}}" class="button is-small is-primary">
            <b-icon icon="account-edit" size="is-small"/>
          </router-link>
          <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
            <b-icon icon="trash-can" size="is-small"/>
          </button>
        </div>
      </b-table-column>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/ModalBox'

export default {
  name: 'ProjectsTableSample',
  components: { ModalBox },
  props: {
    projects: {
      type: Array,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },

  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
