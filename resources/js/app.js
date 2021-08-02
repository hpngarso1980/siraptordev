import Vue from 'vue';
import VueRouter from 'vue-router';
import CoreuiVue from '@coreui/vue';
import VueSvgGauge from 'vue-svg-gauge';
import VueNotification from 'vue-notification';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import VueSelect from 'vue-select';
import VueProgressBar from 'vue-progressbar';
import debounce from 'lodash-es/debounce';
import { mapGetters } from 'vuex';

import { common } from '@/configs/store/modules';
import { login, logout } from '@/configs/store/action-types';

import { uniquePush, removeItem } from '@/helpers/array-helpers';
import toHumanDate from '@/helpers/date-helpers/to-human-date';
import toHumanDateTime from '@/helpers/date-helpers/to-human-date-time';
import initializeValidationRules from '@/helpers/validation-helpers/initialize-validation-rules';

import eventHub from './event-hub';
import { iconsSet as icons } from './icons';
import './bootstrap';

import App from './App.vue';
import routes from './routes';
import store from './store';

Vue.config.errorHandler = function (error, vm) {
  const { response } = error;
  const { status } = response || {};

  if (status === 403) {
    vm.$root.showErrorNotification('Anda tidak memiliki hak akses');
  } else if (status >= 500) {
    vm.$root.showGeneralErrorNotification();
  } else {
    console.error(error);
  }
};

Vue.use(VueRouter);
Vue.use(CoreuiVue);
Vue.use(VueNotification);
Vue.use(VueSvgGauge);
Vue.use(VueProgressBar, {
  color: '#2D9D5B',
  autoFinish: false,
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('VueSelect', VueSelect);

Vue.filter('toHumanDate', toHumanDate);
Vue.filter('toHumanDateTime', toHumanDateTime);
Vue.filter('toCompactHumanDateTime', (value) => toHumanDateTime(value, { compact: true }));

initializeValidationRules();

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({ // eslint-disable-line no-new
  icons,
  router,
  store,
  el: '#app',

  components: {
    App,
  },

  data() {
    return {
      requestStack: [],
      evaluateFinishRequest: null,
    };
  },

  computed: {
    ...mapGetters(common, ['permissions', 'role']),
  },

  created() {
    this.$router.beforeEach((to, from, next) => {
      this.startRequest(to.name);

      next();
    });

    this.$router.afterEach((to) => {
      this.finishRequest(to.name);
    });

    window.axios.interceptors.request.use((config) => {
      this.startRequest(config.url);

      return config;
    });

    window.axios.interceptors.response.use(
      (response) => {
        const url = response && response.config ? response.config.url : '';

        this.finishRequest(url);

        return response;
      },
      (error) => {
        const url = error.response && error.response.config ? error.response.config.url : '';

        this.finishRequest(url);

        return Promise.reject(error);
      },
    );
  },

  methods: {
    login(email, password) {
      return this.$store
        .dispatch(`${common}/${login}`, {
          email,
          password,
        })
        .then(() => {
          this.$router.push({ name: 'Home' });
        });
    },

    logout() {
      return this.$store.dispatch(`${common}/${logout}`).then(() => {
        this.$router.push({ name: 'Login' });
      });
    },

    confirmAction(payload) {
      eventHub.$emit('open-confirmation', payload);
    },

    confirmDeletion(type, title, payload) {
      eventHub.$emit('open-delete-confirmation', {
        type,
        title,
        payload,
      });
    },

    closeConfirmation() {
      eventHub.$emit('close-confirmation');
    },

    showGeneralErrorNotification() {
      this.showErrorNotification('Terjadi kesalahan');
    },

    showSuccessNotification(text, title = null) {
      this.$notify({
        text,
        title,
        group: 'app',
        type: 'success',
      });
    },

    showErrorNotification(text, title = null) {
      this.$notify({
        text,
        title,
        group: 'app',
        type: 'error',
      });
    },

    startRequest(url) {
      this.requestStack = uniquePush(this.requestStack, url);

      this.$Progress.start();
    },

    finishRequest(url) {
      this.requestStack = removeItem(this.requestStack, url);

      this.evaluateFinishRequest = debounce(() => {
        if (!this.requestStack.length) {
          this.$Progress.finish();
        }
      }, 1000);

      this.evaluateFinishRequest();
    },

    hasPermissionTo(permission = null) {
      return this.permissions.includes(permission);
    },

    hasAnyPermissionTo(permissions = []) {
      return permissions.some((permission) => this.permissions.includes(permission));
    },

    hasRole(role = null) {
      return this.role && this.role.name === role;
    },
  },
});
