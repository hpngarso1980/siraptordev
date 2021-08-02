<template>
  <CCol
    sm="6"
    lg="3"
    class="mb-4"
  >
    <CWidgetSimple
      :footer="note"
      color="success"
      class="bg-gradient-success shadow text-white h-100"
      style="cursor: pointer;"
    >
      <CDropdown
        color="transparent p-0"
        placement="bottom-end"
        class="position-absolute p-3"
        style="top: 0; right: 0;"
      >
        <template #toggler-content>
          <CIcon name="cil-settings" />
        </template>

        <CDropdownItem @click.stop="editItem">
          Edit
        </CDropdownItem>

        <CDropdownItem
          v-show="false"
          @click.stop="deleteItem"
        >
          Hapus
        </CDropdownItem>
      </CDropdown>

      <a
        :href="href"
        class="d-flex flex-column justify-content-between h-100 text-reset text-decoration-none"
        @click.prevent="$emit('click')"
      >
        <h3 class="text-left pr-4">
          {{ title }}
        </h3>

        <div>
          <div class="text-left">
            {{ secondaryTitle }}
          </div>

          <CProgress
            height="8px"
            color="transparent"
            class="mt-3 mb-3"
            style="background: rgba(255, 255, 255, 0.3);"
            animated
          >
            <CProgressBar
              :value="progress"
              color="white"
            />
          </CProgress>

          <div class="text-left">
            <small>
              {{ note }}
            </small>
          </div>
        </div>
      </a>
    </CWidgetSimple>
  </CCol>
</template>

<script>
export default {
  name: 'ProjectCard',

  props: {
    title: {
      type: String,
      default: '',
    },

    secondaryTitle: {
      type: String,
      default: '',
    },

    note: {
      type: String,
      default: '',
    },

    progress: {
      type: Number,
      default: 0,
    },

    href: {
      type: String,
      default: '',
    },
  },

  methods: {
    editItem() {
      this.$emit('edit');
    },

    deleteItem() {
      this.$emit('delete');
    },
  },
};
</script>
