<template>
  <div :class="{ 'is-collapsed': isCollapsed, 'mb-3': !isCollapsed }">
    <h6
      class="
        c-group-title
        d-flex flex-row justify-content-between align-items-center
        bg-light text-body shadow-sm block px-3 py-2 mb-2 rounded u-pointer
      "
      @click="$emit('titleClick')"
    >
      <div>
        {{ title }}
        <small
          v-if="!hideSub"
          class="ml-4"
        >
          {{ taskCount }} sub area
        </small>
        <small
          v-for="(message, index) in customMessages"
          :key="index"
          class="ml-4"
        >
          {{ message }}
        </small>
      </div>

      <CIcon name="cil-chevron-top" />
    </h6>

    <CRow>
      <CCol
        v-for="column in $options.columns"
        :key="column"
        lg="3"
      >
        <Container
          group-name="column"
          class="h-100"
          style="background: #f3f3f3;"
          :get-child-payload="getCardPayload(column)"
          @drop="handleTaskCardDrop(column, $event)"
        >
          <Draggable
            v-for="item in tasks[column]"
            :key="item.id"
          >
            <TaskCard
              :task="item"
              @click="handleTaskCardClick(item)"
            />
          </Draggable>
        </Container>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
import TaskCard from '@/components/organisms/SelfAssessment/TaskCard';

const columns = [
  'todo',
  'documentUploaded',
  'revision',
  'done',
];

export default {
  name: 'SwimlaneGroup',

  components: {
    Container,
    Draggable,
    TaskCard,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    tasks: {
      type: Object,
      default: () => ({}),
    },

    isCollapsed: {
      type: Boolean,
      default: false,
    },

    customMessages: {
      type: Array,
      default: () => [],
    },

    hideSub: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    taskCount() {
      return Object.keys(this.tasks).reduce((total, column) => (
        total + this.tasks[column].length
      ), 0);
    },
  },

  methods: {
    handleTaskCardClick(item) {
      this.$emit('taskClick', item);
    },

    handleTaskCardDrop(columnKey, dragResult) {
      const newPayload = this.applyDrag(this.tasks[columnKey], dragResult);

      this.$emit('change', {
        columnKey,
        newPayload,
      });
    },

    getCardPayload(columnKey) {
      return (index) => this.tasks[columnKey].find((task, taskIndex) => taskIndex === index);
    },

    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]; //eslint-disable-line
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },
  },

  columns,
};
</script>

<style lang="scss" scoped>
.c-group-title {
  .c-icon {
    transition: transform 0.25s ease-in;
  }
}

.is-collapsed {
  .row {
    height: 0;
    overflow: hidden;
  }

  .c-icon {
    transform: rotate(180deg);
  }
}
</style>
