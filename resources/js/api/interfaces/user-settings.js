import queryString from 'query-string';
import createUrl from './create-url';

const accountUrl = path => createUrl(`/account${path}`);

export default {
  getPermissions() {
    return this.get(accountUrl('/permissions'));
  },

  getRoles() {
    return this.get(accountUrl('/roles'));
  },

  getUsers(page = 1) {
    const query = queryString.stringify({ page });

    return this.get(accountUrl(`/users?${query}`));
  },

  createUser(user) {
    return this.post(accountUrl('/users'), user);
  },

  updateUser(id, user) {
    return this.patch(accountUrl(`/users/${id}`), user);
  },

  deleteUser(id) {
    return this.delete(accountUrl(`/users/${id}`));
  },
};
