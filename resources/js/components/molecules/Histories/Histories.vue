<template>
  <div v-if="histories.length">

    <div class="h5 mb-4">
      Riwayat Perubahan
    </div>

    <ul
      class="m-0 p-0"
      style="max-height: 150px; overflow: auto;"
    >
      <li
        v-for="(item, index) in histories"
        :key="index"
        class="d-flex flex-row mb-3"
      >

        <Avatar
          :src="item.user.photo"
          class="mr-3 flex-shrink-0"
        />

        <div class="d-flex flex-row justify-content-between flex-grow-1">

          <div class="d-flex flex-column mr-3">

            <div>
              <span class="font-weight-bolder">
                {{ item.user.name }}
              </span>
              <span>
                {{ item.change_type_displayed }}
              </span>
              <span class="font-weight-bolder">
                {{ item.field_name_displayed || title }}
              </span>
            </div>

            <div
              v-if="item.from || item.to"
              class="d-flex flox-row text-muted"
            >
              <div>{{ item.from || '-' }}</div>
              <div class="mx-3">&rarr;</div>
              <div>{{ item.to || '-' }}</div>
            </div>
          </div>

          <div class="text-secondary flex-shrink-0">
            {{ item.created_at | toCompactHumanDateTime }}
          </div>

        </div>

      </li>
    </ul>

  </div>
</template>

<script>
import Avatar from '@/components/atoms/Avatar';

export default {
  name: 'Histories',

  components: {
    Avatar,
  },

  props: {
    title: {
      type: String,
      default: 'item'
    },

    histories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
