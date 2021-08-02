<template>
  <dl class="row">

    <template v-for="({ title, key }) in fields">
      <dt
        :key="`${key}-title`"
        class="col-sm-3"
      >
        {{ title }}
      </dt>

      <dd
        :key="`${key}-value`"
        class="col-sm-9"
      >
        {{ item[key] }}
      </dd>
    </template>

  </dl>
</template>

<script>
export default {
  name: 'DescriptionList',

  props: {
    fields: {
      type: Array,
      default: () => [],
    },

    item: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
