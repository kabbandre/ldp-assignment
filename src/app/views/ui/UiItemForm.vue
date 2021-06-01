<template>

  <div class="query-form card">
    <div class="card-content">
      <h2 class="title">New issue</h2>
      <ui-input name="title"
                label="Title"
                v-model="title"
                v-validate="'required'"
                :error="getError('title')"
                @enter="validate"
      />
      <ui-input name="description"
                type="textarea"
                label="Description"
                v-model="description"
      />
      <ui-input name="date"
                type="date"
                label="Due date"
                v-model="date"
                @enter="validate"
      />
      <ui-input name="priority"
                type="select"
                label="Priority"
                v-model="priority"
      />
      <div class="field is-grouped">
        <ui-button type="primary" @click="validate">{{ id ? 'Update' : 'Add' }}</ui-button>
        <ui-button v-if="id" type="danger" @click="deleteItem">Delete</ui-button>
        <ui-button type="text" @click="cancel">Cancel</ui-button>
      </div>
    </div>
  </div>

</template>

<script>

function data () {
  return {
    id: null,
    title: '',
    description: '',
    date: null,
    message: '',
    priority: ''
  }
}

export default {
  data () {
    return data()
  },

  computed: {
    values () {
      return this.$data
    }
  },

  methods: {
    show (data) {
      Object.assign(this, data)
      this.$el.querySelector('input').focus()
    },

    validate () {
      this.$validator
        .validate()
        .then(state => {
          if (state) {
            return this.submit()
          }
          this.message = 'Please complete the required fields!'
        })
    },

    submit () {
      this.$emit('submit', this.values)
      this.reset()
    },

    cancel () {
      this.$emit('cancel', this.values)
      this.reset()
    },

    reset () {
      Object.assign(this, data())
    },

    deleteItem () {
      this.$emit('delete', this.values)
    },

    getError (name) {
      return (this.errors.first(name) || '').replace(/The .+ field/, 'This field')
    }
  }
}

</script>

<style lang="scss">

</style>
