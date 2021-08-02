import api from '@/api';
import {
  setCurrentFilter,
  setData,
  setMeta,
} from '@/configs/store/mutation-types';

function generateGetAllAction(options) {
  const { stateKey, apiInterface } = options;

  return function getAll({ commit }, filter) {
    commit(setCurrentFilter, {
      key: stateKey,
      value: filter,
    });

    return api[apiInterface]({ query: filter })
      .then(({ data }) => {
        commit(setData, {
          key: stateKey,
          value: data.data,
        });
        commit(setMeta, {
          key: stateKey,
          value: data.meta,
        });
      });
  };
}

function generateCreateAction(options) {
  const { stateKey, apiInterface, getAllAction } = options;

  return function create({ dispatch, state }, data) {
    return api[apiInterface](data)
      .then(() => dispatch(getAllAction, state[stateKey].currentFilter));
  };
}

function generateUpdateAction(options) {
  const { stateKey, apiInterface } = options;

  return function update({ commit, state }, newData) {
    return api[apiInterface](newData.id, newData)
      .then(({ data }) => {
        const updatedData = data.data;
        const list = state[stateKey].data.map((item) => {
          if (item.id === updatedData.id) {
            return updatedData;
          }
          return item;
        });

        commit(setData, {
          key: stateKey,
          value: list,
        });
      });
  };
}

function generateDeleteAction(options) {
  const { stateKey, apiInterface, getAllAction } = options;

  return function deleteData({ dispatch, state }, id) {
    return api[apiInterface](id)
      .then(() => dispatch(getAllAction, state[stateKey].currentFilter));
  };
}

const generatorTypes = {
  getAll: generateGetAllAction,
  create: generateCreateAction,
  update: generateUpdateAction,
  delete: generateDeleteAction,
};

export default function generateAction(actionType, options) {
  return generatorTypes[actionType](options);
}
