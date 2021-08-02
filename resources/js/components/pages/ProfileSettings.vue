<template>
  <div>

    <CRow>

      <CCol lg="6">
        <ProfileForm
          :profile="profile"
          @save="updateProfile"
        />

        <PasswordForm
          :errors="passwordErrors"
          @changeInput="changePasswordInput"
          @save="updatePassword"
        />
      </CCol>

      <CCol lg="4">
        <PhotoForm
          :image="profile.photo"
          :errors="photoErrors.photo"
          @input="updatePhoto"
        />
      </CCol>
    </CRow>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PasswordForm from '@/components/organisms/Profile/PasswordForm';
import PhotoForm from '@/components/organisms/Profile/PhotoForm';
import ProfileForm from '@/components/organisms/Profile/ProfileForm';
import { common } from '@/configs/store/modules';
import {
  updateProfile,
  updatePassword,
  updatePhoto,
} from '@/configs/store/action-types';

export default {
  name: 'ProfileSettings',

  components: {
    PasswordForm,
    PhotoForm,
    ProfileForm,
  },

  data() {
    return {
      passwordErrors: {},
      photoErrors: {},
    };
  },

  computed: {
    ...mapState(common, [
      'profile',
    ]),
  },

  methods: {
    ...mapActions(common, {
      updateProfile(dispatch, profile) {
        return dispatch(updateProfile, profile)
          .then(() => {
            this.$root.showSuccessNotification('Profil berhasil diperbarui.');
            this.$root.closeConfirmation();
          });
      },

      updatePassword(dispatch, data) {
        return dispatch(updatePassword, data)
          .then(() => {
            this.$root.showSuccessNotification('Password berhasil diperbarui.');
            this.$root.closeConfirmation();
          })
          .catch(error => {
            if (error.response) {
              const { errors } = error.response.data;

              this.passwordErrors = errors;
            }
          });
      },

      updatePhoto(dispatch, file) {
        return dispatch(updatePhoto, file)
          .then(() => {
            this.$root.showSuccessNotification('Foto berhasil diperbarui.');
          })
          .catch(error => {
            if (error.response) {
              const { errors } = error.response.data;

              this.photoErrors = errors;
            }
          });
      },
    }),

    changePasswordInput() {
      this.passwordErrors = {};
    },
  },
};
</script>
