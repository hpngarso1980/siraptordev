<template>
  <ValidationObserver
    ref="formObserver"
    slim
    v-slot="{ valid }"
  >
    <CModal
      :title="title"
      :show="show"
      :close-on-backdrop="false"
      size="sm"
      centered
      @update:show="updateShow"
    >
      <CForm>
        <ValidatedInput
          v-model="formData.name"
          :disabled="!canManage"
          type="text"
          label="Nama"
          rules="required|max:255"
        />
      </CForm>

      <template #footer-wrapper>
        <div class="p-3">

          <SaveButton
            :disabled="!valid"
            class="float-right"
            @click="save"
          />

          <CancelButton
            class="float-right mr-2"
            @click="updateShow(false)"
          />

        </div>
      </template>

    </CModal>
  </ValidationObserver>
</template>

<script>
import CancelButton from '@/components/atoms/CancelButton';
import SaveButton from '@/components/atoms/SaveButton';
import ValidatedInput from '@/components/molecules/ValidatedInput';
import modalFormMixin from '@/mixins/modal-form';
import accessLevelMixin from '@/mixins/access-level';

const formTitle = 'Area';
const initialFormData = {
  name: '',
};

export default {
  name: 'AreaForm',

  components: {
    CancelButton,
    SaveButton,
    ValidatedInput,
  },

  mixins: [
    modalFormMixin,
    accessLevelMixin,
  ],

  props: {
    selectedStreamId: {
      type: Number,
      default: null,
    },
  },

  methods: {
    beforeReset() {
      this.$refs.formObserver.reset();
    },

    beforeSave() {
      return this.$refs.formObserver.validate();
    },

    formatBeforeSave(formData) {
      return {
        ...formData,
        stream_id: this.selectedStreamId,
      };
    },
  },

  formTitle,
};
</script>
