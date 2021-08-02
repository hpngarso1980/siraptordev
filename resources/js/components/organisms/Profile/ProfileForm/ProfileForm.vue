<template>
  <ContentPanel title="Profil">
    <ValidationObserver
      ref="formObserver"
      slim
      v-slot="{ valid }"
    >
      <CForm>
        <CRow>
          <CCol>
            <ValidatedInput
              v-model="name"
              type="text"
              label="Nama"
              rules="required|max:500"
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol lg="6">
            <ValidatedInput
              v-model="email"
              type="email"
              label="Email"
              rules="required|email|max:500"
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol lg="6">
            <ValidatedInput
              v-model="phone"
              type="text"
              label="No.Telepon"
              rules="numeric|max:15"
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <SaveButton
              :disabled="!valid"
              @click="confirmSaveAction"
            />
          </CCol>
        </CRow>

      </CForm>
    </ValidationObserver>
  </ContentPanel>
</template>

<script>
import eventHub from '@/event-hub';
import SaveButton from '@/components/atoms/SaveButton';
import ContentPanel from '@/components/molecules/ContentPanel'
import ValidatedInput from '@/components/molecules/ValidatedInput';

export default {
  name: 'ProfileForm',

  components: {
    ContentPanel,
    SaveButton,
    ValidatedInput,
  },

  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      name: '',
      email: '',
      phone: '',
    };
  },

  watch: {
    profile() {
      this.syncLocalData();
    },
  },

  mounted() {
    eventHub.$on('confirm-action', this.save);
    this.syncLocalData();
  },

  beforeDestroy() {
    eventHub.$off('confirm-action', this.save)
  },

  methods: {
    syncLocalData() {
      Object.keys(this.profile).forEach(key => {
        this[key] = this.profile[key];
      });
    },

    confirmSaveAction() {
      this.$root.confirmAction({
        type: 'profile-save',
        message: 'Pastikan data profil sudah benar. Update profil?',
        successActionText: 'Update profil',
      });
    },

    save({ type }) {
      if (type === 'profile-save') {
        this.$emit('save', {
          name: this.name,
          email: this.email,
          phone: this.phone,
        });
      }
    },
  },
};
</script>
