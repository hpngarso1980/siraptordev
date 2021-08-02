<template>
  <CCard
    class="m-0 mb-1 p-3 shadow-sm border-light"
    :class="`c-task--${stateLabel}`"
    style="cursor: pointer;"
    @click="$emit('click')"
  >
    <div
      class="mb-3"
      data-testid="title"
    >
      {{ task.title }}
    </div>

    <CRow
      class="mb-2"
      style="font-size: 12px;"
    >
      <CCol
        lg="4"
        data-testid="attachment"
      >
        <CIcon
          name="cil-paperclip"
          class="mr-1"
        />
        {{ task.attachments_count }}
      </CCol>

      <CCol
        v-if="overdue"
        lg="8"
        class="text-uppercase text-danger text-right"
        data-testid="overdue-alert"
      >
        <CIcon
          name="cil-clock"
          class="mr-1"
        />
        terlambat
      </CCol>
    </CRow>

    <CRow style="font-size: 12px;">
      <CCol
        v-if="task.assignees && task.assignees.length"
        data-testid="assignee"
      >
        <CIcon
          name="cil-user"
          class="mr-1"
        />
        {{ task.assignees[0].name }}
        {{ task.assignees.length > 1 ? `+${task.assignees.length - 1}` : '' }}
      </CCol>
    </CRow>
  </CCard>
</template>

<script>
const stateLabel = {
  1: 'todo',
  2: 'in-progress',
  3: 'revision',
  4: 'done',
};

export default {
  name: 'TaskCard',

  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    stateLabel() {
      return stateLabel[this.task.state] || '';
    },

    overdue() {
      return !!this.task.due_date && new Date(this.task.due_date) < Date.now();
    },
  },
};

</script>

<style lang="scss" scoped>
.c-task {
  &--todo {
    border-left: 3px solid #d82121 !important;
  }

  &--in-progress {
    border-left: 3px solid #DA773A !important;
  }

  &--revision {
    border-left: 3px solid#F3C050 !important;
  }

  &--done {
    border-left: 3px solid #219B53 !important;
  }
}
</style>
