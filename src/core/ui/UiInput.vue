<template>

  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <textarea v-if="type === 'textarea'"
                :name="name"
                class="textarea"
                :class="{'is-danger': error}"
                v-model.trim="input"
                v-bind="$attrs"
      ></textarea>
      <div v-else-if="type === 'select'" class="select" style="width: 100%">
        <select
                style="width: 100%"
                class="select"
                :name="name"
                :class="{'is-danger': error}"
                v-model.trim="input"
                v-bind="$attrs"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <input v-else
             :type="type"
             :name="name"
             class="input"
             :class="{'is-danger': error}"
             v-model.trim="input"
             v-bind="$attrs"
             @keydown.enter="onEnter"
      >
    </div>
    <p v-if="error" class="help is-danger">{{ error }}</p>
  </div>

</template>

<script>
import field from '../mixins/field'

/**
 * @emits {KeyboardEvent} enter
 */
export default {
  extends: field,
  props: {
    type: {
      type: [String, Number],
      default: 'text'
    }
  },

  methods: {
    onEnter ($event) {
      this.$emit('enter', $event)
    }
  }
}

</script>

<style lang="scss">

</style>
