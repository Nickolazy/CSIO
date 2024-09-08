<template>
  <tr>
    <th class="info-table-body-more">
      <span>{{ form.form }}</span>
      <button v-show="haveTypes" class="button info-table-body-more-button" type="button">
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

  <!-- Дополнительные строки будут добавляться или удаляться здесь -->
  <tr class="info-table-more-rows" data-parent-row="1">
    <td colspan="4">
  <!-- Содержание дополнительных строк -->
    Дополнительная информация 1
  </td>
  </tr>
  <tr class="info-table-more-rows" data-parent-row="1">
    <td colspan="4">
  <!-- Содержание дополнительных строк -->
    Дополнительная информация 2
    </td>
  </tr>
</template>

<script setup>
  import { defineProps } from 'vue';

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
      type: Object,
      required: false
    }
  });

</script>

<style>

</style>
