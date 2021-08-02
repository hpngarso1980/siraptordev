import store from '@/store';
import { common } from '@/configs/store/modules';
import { getProfile } from '@/configs/store/action-types';

export default function checkLogin(to, from, next) {
  if (from.path === '/') {
    return next();
  }

  store.dispatch(`${common}/${getProfile}`).then(() => {
    next('/');
  }).catch(() => {
    next();
  });
};
