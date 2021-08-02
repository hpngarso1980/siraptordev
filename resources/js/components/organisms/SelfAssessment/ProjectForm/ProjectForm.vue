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
          v-model="formData.title"
          type="text"
          label="Judul"
          rules="required|max:255"
        />

        <CRow>
          <CCol lg="6">
            <ValidatedInput
              v-model="formData.start_date"
              type="date"
              label="Tgl. Mulai"
            />
          </CCol>

          <CCol lg="6">
            <ValidatedInput
              v-model="formData.end_date"
              type="date"
              label="Tgl. Selesai"
            />
          </CCol>
        </CRow>

        <ValidatedMultipleCheckbox
          v-if="!editMode"
          v-model="formData.stream_ids"
          :options="streamOptions"
          rules="required"
          label="Stream"
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
import format from 'date-fns/format';
import SaveButton from '@/components/atoms/SaveButton';
import ValidatedInput from '@/components/molecules/ValidatedInput';
import ValidatedMultipleCheckbox from '@/components/molecules/ValidatedMultipleCheckbox';
import accessLevelMixin from '@/mixins/access-level';
import modalFormMixin from '@/mixins/modal-form';

const formTitle = 'Project';
const initialFormData = {
  title: '',
  start_date: null,
  end_date: null,
  stream_ids: [],
};

export default {
  name: 'ProjectForm',

  components: {
    SaveButton,
    ValidatedInput,
    ValidatedMultipleCheckbox,
  },

  mixins: [
    accessLevelMixin,
    modalFormMixin,
  ],

  props: {
    streams: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    streamOptions() {
      return this.streams.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    },
  },

  methods: {
    getInitialFormData() {
      if (!this.editMode) {
        return {
          ...initialFormData,
          stream_ids: this.streams.map(({ id }) => id),
        };
      }

      return { ...initialFormData };
    },

    formatBeforeSave(formData) {
      const { start_date: start, end_date: end } = formData;
      const dateFormat = 'yyyy-MM-dd';

      return {
        ...formData,
        start_date: start ? format(new Date(start), dateFormat) : null,
        end_date: end ? format(new Date(end), dateFormat) : null,
      };
    },

    beforeReset() {
      this.$refs.formObserver.reset();
    },

    beforeSave() {
      return this.$refs.formObserver.validate();
    },
  },

  formTitle,
};
</script>
