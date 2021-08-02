import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import epics from './modules/epics';
import managementActionPlans from './modules/management-action-plans';
import performanceMonitoring from './modules/performance-monitoring';
import selfAssessment from './modules/self-assessment';
import tasks from './modules/tasks';
import userSettings from './modules/user-settings';

Vue.use(Vuex);

export const storeOptions = {
  modules: {
    common,
    epics,
    managementActionPlans,
    performanceMonitoring,
    selfAssessment,
    tasks,
    userSettings,
  },
};

export default new Vuex.Store(storeOptions);
