<template>
  <div>
    <CRow
      v-if="showLabels"
      class="mb-1"
    >

      <CCol lg="1">
        <div class="form-text">
          Kode
        </div>
      </CCol>

      <CCol lg="8">
        <div class="form-text">
          Indikator
        </div>
      </CCol>

      <template v-if="!deduction">
        <CCol lg="1">
          <div class="form-text">
            Satuan
          </div>
        </CCol>

        <CCol lg="1">
          <div class="form-text">
            Bobot
          </div>
        </CCol>
      </template>

      <template v-else>
        <CCol lg="2" />
      </template>
    </CRow>

    <CRow>
      <CCol lg="1">
        <CInput
          type="text"
          :value="code"
          @input="updateValue('code', $event)"
        />
      </CCol>

      <CCol lg="8">
        <CInput
          type="text"
          :value="indicator"
          @input="updateValue('indicator', $event)"
        />
      </CCol>

      <template v-if="!deduction">
        <CCol lg="1">
          <CInput
            type="text"
            :value="unit"
            @input="updateValue('unit', $event)"
          />
        </CCol>

        <CCol lg="1">
          <template v-if="weightDisabled">
            {{ weight }}
          </template>
          <CInput
            v-else
            type="text"
            :value="weight"
            @input="updateValue('weight', $event)"
          />
        </CCol>
      </template>

      <template v-else>
        <CCol lg="2" />
      </template>

      <CCol
        lg="1"
        class="text-right"
      >
        <CButtonClose @click="$emit('remove')" />
      </CCol>

    </CRow>
  </div>
</template>

<script>
import debounce from 'lodash-es/debounce';

const createDebouncedInput = context =>
  debounce(function(input) {
    context.$emit('input', {
      code: context.code,
      indicator: context.indicator,
      ...input,
    });
  }, 500);

export default {
  name: 'ParentIndicatorForm',

  props: {
    showLabels: {
      type: Boolean,
      default: false,
    },

    code: {
      type: String,
      default: '',
    },

    indicator: {
      type: String,
      default: '',
    },

    unit: {
      type: String,
      default: '',
    },

    weight: {
      type: Number,
      default: 0,
    },

    weightDisabled: {
      type: Boolean,
      default: false,
    },

    deduction: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.changeInput = createDebouncedInput(this);
  },

  methods: {
    updateValue(key, value) {
      this.changeInput({
        [key]: value,
      });
    },
  },
};
</script>
