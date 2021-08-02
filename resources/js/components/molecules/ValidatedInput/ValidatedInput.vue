<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="rules"
    :vid="vid"
  >
    <template v-if="type === 'date'">
      <div
        role="group"
        class="form-group"
      >
        <div>
          {{ label }}
        </div>

        <Datepicker
          v-bind="$attrs"
          :value="value"
          :language="$options.id"
          :input-class="{ 'is-invalid': getError(errors), 'form-control bg-white': true }"
          :highlighted="{ dates: [new Date()] }"
          :disabled-dates="disabledDates"
          @input="$emit('input', $event)"
        />

        <div
          v-if="getError(errors)"
          class="invalid-feedback text-sentence-case"
        >
          {{ getError(errors) }}
        </div>
      </div>
    </template>

    <CTextarea
      v-else-if="type === 'textarea'"
      v-bind="$attrs"
      :value="value"
      :type="type"
      :is-valid="getError(errors) ? false : null"
      @input="$emit('input', $event)"
    >
      <template #label>
        {{ label }}
      </template>

      <div
        slot="invalid-feedback"
        class="invalid-feedback text-sentence-case"
      >
        {{ getError(errors) }}
      </div>
    </CTextarea>

    <PasswordInput
      v-else-if="type === 'password'"
      v-bind="$attrs"
      :label="label"
      :value="value"
      :is-valid="getError(errors) ? false : null"
      :error="getError(errors)"
      @input="$emit('input', $event)"
    />

    <CInput
      v-else
      v-bind="$attrs"
      :value="value"
      :type="type"
      :is-valid="getError(errors) ? false : null"
      @input="$emit('input', $event)"
    >
      <template #label>
        {{ label }}
      </template>

      <div
        slot="invalid-feedback"
        class="invalid-feedback text-sentence-case"
      >
        {{ getError(errors) }}
      </div>
    </CInput>
  </ValidationProvider>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { id } from 'vuejs-datepicker/dist/locale';
import PasswordInput from '@/components/molecules/PasswordInput';

export default {
  name: 'ValidatedInput',

  components: {
    Datepicker,
    PasswordInput,
  },

  props: {
    type: {
      type: String,
      default: 'text',
    },

    rules: {
      type: String,
      default: '',
    },

    vid: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },

    value: {
      type: [String, Number, Boolean, Date],
      default: null,
    },

    errors: {
      type: Array,
      default: () => [],
    },

    disabledDates: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    getError(validatorErrors) {
      return validatorErrors.length
        ? validatorErrors[0]
        : this.errors[0];
    },
  },

  id,
};
</script>
