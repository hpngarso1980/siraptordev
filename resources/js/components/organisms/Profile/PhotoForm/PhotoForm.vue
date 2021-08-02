<template>
  <ContentPanel title="Foto Profil">
    <form ref="form">
      <div
        class="text-center mt-3 input-wrapper"
        :class="{ 'is-invalid': errors.length }"
        @click="toggleFileExplorer"
      >
        <input
          ref="file"
          type="file"
          class="hidden-file-input"
          @input="setFile"
        >

        <CImg
          :src="image || '/images/logo-dark-initial.png'"
          width="128"
          height="128"
          shape="rounded-circle"
          class="border"
        />
      </div>

      <div
        v-if="errors.length"
        class="mt-2 invalid-feedback text-sentence-case text-center"
      >
        {{ errors[0] }}
      </div>
    </form>

    <CAlert
      color="light"
      class="mt-4 text-left"
    >
      Ukuran foto maksimal 1MB dalam format .jpg, .jpeg atau .png.
    </CAlert>

    <CButton
      color="light"
      class="mt-4"
      block
      @click="$emit('input', null)"
    >
      Hapus Foto
    </CButton>
  </ContentPanel>
</template>

<script>
import ContentPanel from '@/components/molecules/ContentPanel';

export default {
  name: 'PhotoForm',

  components: {
    ContentPanel,
  },

  props: {
    image: {
      type: String,
      default: '',
    },

    errors: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      password: '',
      passwordConfirmation: '',
    };
  },

  methods: {
    toggleFileExplorer() {
      const click = new MouseEvent('click');
      this.$refs.file.dispatchEvent(click);
    },

    setFile(event) {
      const { files } = event.target;

      if (files.length > 0) {
        this.$emit('input', files[0]);
      }

      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.hidden-file-input {
  position: absolute;
  height: 0;
  width: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.input-wrapper {
  position: relative;
  cursor: pointer;

  &::after {
    content: 'Ganti';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 128px;
    height: 128px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    border-radius: 50%;
    line-height: 128px;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.15s ease-in;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
}
</style>
