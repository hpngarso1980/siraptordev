import store from '@/store';
import { common } from '@/configs/store/modules';
import { getProfile } from '@/configs/store/action-types';

export default function checkMe(to, from, next) {
  if (store.state.common.me) {
    return next();
  };

  store.dispatch(`${common}/${getProfile}`).then(next);
};
