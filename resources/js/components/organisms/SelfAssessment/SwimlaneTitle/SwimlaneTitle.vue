<template>
  <CRow class="mb-3">
    <CCol
      v-for="(key) in Object.keys(taskStateMap)"
      :key="key"
      lg="3"
    >
      <CCard
        class="text-uppercase font-weight-bold m-0 p-3 shadow-sm border-0 rounded"
        :style="`
          background: ${taskStateMap[key].background};
          color: ${taskStateMap[key].textColor};
        `"
      >
        {{ taskStateMap[key].title }}
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { taskStateMap } from '@/configs/data';

export default {
  name: 'SwimlaneTitle',

  computed: {
    taskStateMap() {
      return taskStateMap;
    },
  },
};
</script>
