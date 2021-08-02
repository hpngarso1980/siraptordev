<template>
  <ValidationProvider
    :rules="rules"
    v-slot="{ validated, errors }"
  >
    <div role="group" class="form-group">

      <div>
        {{ label }}
      </div>

      <VueSelect
        :value="value"
        :options="options"
        :placeholder="placeholder"
        :class="{'is-invalid': errors.length }"
        v-bind="$attrs"
        @input="$emit('input', $event)"
      />

      <div
        v-if="true"
        class="invalid-feedback"
      >
        {{ errors[0] }}
      </div>

    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'ValidatedInput',

  props: {
    options: {
      type: Array,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: '',
    },

    rules: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },

    value: {
      default: null,
    },
  },
};
</script>
