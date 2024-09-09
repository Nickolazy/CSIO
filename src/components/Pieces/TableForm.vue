<template>
  <tr>
    <th class="info-table-body-more">
      <span>{{ form.form }}</span>
      <button @click="openTypes" v-show="haveTypes" class="button info-table-body-more-button" type="button">
        <img
          src="../../assets/img/icons/table-icon-more-arrow.svg"
          alt="Больше информации"
          loading="lazy">
      </button>
    </th>
    <th>
      <span>{{ form.hours }}</span>
    </th>
    <th>
      <span>{{ form.length }}</span>
    </th>
    <th>
      <span>{{ form.cost }}</span>
    </th>
  </tr>

  <template v-if="haveTypes && isOpenTypes">
    <TableType v-for="(type, index) in types"
      :key="index"
      :type="type"/>
  </template>
</template>

<script setup>
  import { defineProps, ref } from 'vue';
  import TableType from '../Opened sections/TableType.vue';

  const props = defineProps({
    form: {
      type: Object,
      required: true
    },
    haveTypes: {
      type: Boolean,
      required: true
    },
    types: {
      type: Array,  
      required: false,
      default: () => [] 
    }
  });

  const isOpenTypes = ref(false);
  const openTypes = () => {
    isOpenTypes.value = !isOpenTypes.value;
  }
</script>