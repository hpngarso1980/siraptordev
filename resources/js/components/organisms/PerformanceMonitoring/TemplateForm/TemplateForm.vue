<template>
  <ValidationObserver
    ref="formObserver"
    v-slot="{ valid }"
    slim
  >
    <CModal
      :title="title"
      :show="show"
      size="sm"
      :close-on-backdrop="false"
      centered
      @update:show="updateShow"
    >
      <CForm>
        <ValidatedInput
          v-model="formData.name"
          type="text"
          label="Nama Periode"
          rules="required|max:255"
        />

        <ValidatedSelect
          v-if="false"
          v-model="formData.copy_form"
          :options="copyFromOptions"
          placeholder="Pilih template"
          rules=""
          label="Salin dari template (opsional)"
          :reduce="item => item.value"
        />
      </CForm>

      <template #footer-wrapper>
        <div class="p-3">
          <SaveButton
            :disabled="!valid"
            class="float-right"
            @click="save"
          />
        </div>
      </template>
    </CModal>
  </ValidationObserver>
</template>

<script>
import SaveButton from '@/components/atoms/SaveButton';
import ValidatedInput from '@/components/molecules/ValidatedInput';
import ValidatedSelect from '@/components/molecules/ValidatedSelect';
import modalFormMixin from '@/mixins/modal-form';

const formTitle = 'Periode Monitoring Kinerja';
const initialFormData = {
  name: '',
  copy_form: null,
};

export default {
  name: 'TemplateForm',

  components: {
    SaveButton,
    ValidatedInput,
    ValidatedSelect,
  },

  mixins: [
    modalFormMixin,
  ],

  props: {
    existingTemplates: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    copyFromOptions() {
      return this.existingTemplates.map(({ name, id }) => ({
        label: name,
        value: id,
      }));
    },
  },

  methods: {
    formatBeforeSave(formData) {
      const finalFormData = { ...formData };

      if (!finalFormData.copy_form) {
        delete finalFormData.copy_form;
      }

      return finalFormData;
    },
  },

  formTitle,
  initialFormData,
};
</script>
