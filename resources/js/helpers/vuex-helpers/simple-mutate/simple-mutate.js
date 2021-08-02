import set from 'lodash-es/set';

export default function(stateKey) {
  return function(state, value) {
    set(state, stateKey, value);
  }
}
