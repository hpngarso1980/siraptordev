import api from '@/api'
import {
  getPermissions,
  getRoles,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '@/configs/store/action-types'
import {
  setPermissions,
  setRoles,
  setUsers,
  setMeta,
} from '@/configs/store/mutation-types'
import userSettings from '.'

export default {
  [getPermissions]({ commit }) {
    return api.getPermissions()
      .then(({ data }) => {
        commit(setPermissions, data.data);
      });
  },

  [getRoles]({ commit }) {
    return api.getRoles()
      .then(({ data }) => {
        commit(setRoles, data.data);
      });
  },

  [getUsers]({ commit }, page) {
    return api.getUsers(page)
      .then(({ data }) => {
        commit(setUsers, data.data);
        commit(setMeta, data.meta);
      });
  },

  [createUser]({ dispatch }, user) {
    return api.createUser(user)
      .then(() => dispatch(getUsers));
  },

  [updateUser]({ commit, state }, user) {
    return api.updateUser(user.id, user)
      .then(({ data }) => {
        const updatedUser = data.data;
        const users = state.users.map(user => {
          if (user.id === updatedUser.id) {
            return updatedUser;
          } else {
            return user;
          }
        });

        commit(setUsers, users);
      })
  },

  [deleteUser]({ dispatch }, id) {
    return api.deleteUser(id)
      .then(() => dispatch(getUsers));
  },
}
