<template>
  <CInput
    v-bind="$attrs"
    :value="value"
    :type="passwordFieldType"
    required
    @input="$emit('input', $event)"
  >

    <template #label>
      {{ label }}
    </template>

    <template #prepend-content>
      <CIcon name="cil-lock-locked"/>
    </template>

    <template #append-content>
      <div
        style="cursor: pointer;"
        @click="togglePassword"
      >
        {{ showPassword ? 'sembunyikan' : 'tampilkan' }}
      </div>
    </template>

    <div
      slot="invalid-feedback"
      class="invalid-feedback text-sentence-case"
    >
      {{ error }}
    </div>

  </CInput>
</template>

<script>
export default {
  name: 'PasswordInput',

  props: {
    value: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },

    error: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      showPassword: false,
    };
  },

  computed: {
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
