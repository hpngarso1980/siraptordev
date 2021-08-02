import accessLevels from '@/configs/access-levels';

export default {
  props: {
    accessLevel: {
      type: String,
      default: accessLevels.manage,
    },
  },

  computed: {
    canManage() {
      return this.accessLevel === accessLevels.manage;
    },

    canSupervise() {
      return this.accessLevel === accessLevels.supervise;
    },

    canReport() {
      return this.accessLevel === accessLevels.report;
    },

    canView() {
      return this.accessLevel === accessLevels.view;
    },
  },
};
