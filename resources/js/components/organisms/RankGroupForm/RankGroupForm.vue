<template>
  <ValidationObserver
    ref="formObserver"
    v-slot="{ valid }"
    slim
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
          v-model="formData.order"
          :disabled="!canManage"
          type="number"
          min="1"
          label="Peringkat"
          rules="required"
        />

        <ValidatedInput
          v-model="formData.title"
          :disabled="!canManage"
          type="text"
          label="Nama"
          rules="required|max:100"
        />

        <ValidatedInput
          v-model="formData.color"
          :disabled="!canManage"
          type="color"
          label="Warna"
          rules="required"
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

const formTitle = 'Level ranking';
const initialFormData = {
  title: '',
  order: 1,
  color: '#ffffff',
};

export default {
  name: 'RankGroupForm',

  components: {
    CancelButton,
    SaveButton,
    ValidatedInput,
  },

  mixins: [
    modalFormMixin,
    accessLevelMixin,
  ],

  methods: {
    beforeReset() {
      this.$refs.formObserver.reset();
    },

    beforeSave() {
      return this.$refs.formObserver.validate();
    },
  },

  formTitle,
  initialFormData,
};
</script>
