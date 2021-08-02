import {
  setPermissions,
  setRoles,
  setUsers,
  setMeta,
} from '@/configs/store/mutation-types'
import simpleMutate from '@/helpers/vuex-helpers/simple-mutate'

export default {
  [setPermissions]: simpleMutate('permissions'),
  [setRoles]: simpleMutate('roles'),
  [setUsers]: simpleMutate('users'),
  [setMeta]: simpleMutate('meta'),
}
