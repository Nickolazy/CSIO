<template>
  <tr class="info-table-body-other">
    <th>
      <span>{{ type.type }}</span>
    </th>
    <th>
      <span>{{ type.hours }}</span>
    </th>
    <th>
      <span>{{ type.length }}</span>
    </th>
    <th>
      <span>{{ type.cost }}</span>
    </th>
  </tr>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    type: {
      type: Object,
      required: false
    }
  });
</script>

<style scoped>

</style>
