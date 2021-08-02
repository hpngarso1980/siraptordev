import { mapState, mapActions } from 'vuex';
import { performanceMonitoring } from '@/configs/store/modules';
import {
  getTemplate,
  getIndicators,
} from '@/configs/store/action-types';

export default {
  computed: {
    ...mapState(performanceMonitoring, [
      'template',
      'indicators',
    ]),

    title() {
      return this.template.name || '';
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    ...mapActions(performanceMonitoring, [
      getTemplate,
      getIndicators,
    ]),

    fetchData() {
      const { id: templateId } = this.$route.params;

      Promise
        .all([
          this.getTemplate(templateId),
          this.getIndicators(templateId),
        ]);
    },
  },
}
