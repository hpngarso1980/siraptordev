<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="rules"
  >
    <div
      role="group"
      class="form-group"
    >
      <div>
        {{ label }}
      </div>
      <div
        v-for="(option, index) in options"
        :key="index"
        role="group"
        class="form-check"
        :class="{ 'is-invalid': errors.length }"
      >
        <input
          v-model="selectedOptions"
          type="checkbox"
          class="form-check-input"
          :value="option.value"
        >
        {{ option.label }}
      </div>
      <div
        v-if="errors.length"
        class="invalid-feedback"
      >
        {{ errors[0] }}
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
import isEqual from 'lodash-es/isEqual';

export default {
  name: 'ValidatedMultipleCheckbox',

  props: {
    options: {
      type: Array,
      default: () => [],
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
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedOptions: [],
    };
  },

  watch: {
    value(newValue) {
      if (!isEqual(newValue, this.selectedOptions)) {
        this.syncSelectedOptions();
      }
    },

    selectedOptions(newSelectedOptions) {
      this.$emit('input', newSelectedOptions);
    },
  },

  mounted() {
    this.syncSelectedOptions();
  },

  methods: {
    syncSelectedOptions() {
      this.selectedOptions = this.value;
    },
  },
};
</script>
