import set from 'lodash-es/set';

export default function mutateGroupedState(stateKey) {
  return function mutate(state, { key, value }) {
    set(state, `${key}.${stateKey}`, value);
  };
}
