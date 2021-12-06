<template>
  <!-- eslint-disable -->
  <div
    class='datePicker--dropdown'
    v-bind:class="{
      'datePicker--dropdown-month': ifItsMonth,
      'datePicker--dropdown-year': ifItsYear
      }"
  >
    <ul class='datePicker--dropdown--lists'>
      <li @click='onChangeMonth(value.number)' class='datePicker--dropdown--list' v-if="type==='month'" v-for='value in dropDownValues'>
        <span>{{value.month}}</span>
        <span> {{value.number}}</span>
      </li>
      <li v-if="type==='year'" @click='onChangeYear(year)' class='datePicker--dropdown--list' v-for='year in dropDownValues'>
        {{year}}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: ["type", "dropDownValues", "onClick", "onChangeMonth", "onChangeYear"],
  computed: {
    ifItsMonth() {
      return this.type === "month";
    },
    ifItsYear() {
      return this.type === "year";
    }
  }
};
</script>

<style lang='scss' scoped>
.datePicker--dropdown {
  position: absolute;
  background-color: #f0f0f0;
  &-month {
    top: 42px;
    left: 50px;
  }
  &-year {
    top: 42px;
    left: 120px;
    max-height: 300px;
    overflow: auto;
  }
  &--lists {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding-top: 10px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 10px;
  }
  &--list {
    padding: 5px;
    &:hover {
      background-color: white;
      cursor: pointer;
    }
  }
}
</style>
