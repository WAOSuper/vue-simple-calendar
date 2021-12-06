<template>
  <div class='vue-calendar__monthly-view'>
    <div class='vue-calendar__monthly-view--content'>
      <div class='vue-calendar__monthly-view--cells' v-for="dayName in daysNames">
        <h6>{{dayName}}</h6>
        <div
          class='datePicker--bottom--day'
          v-for='day in correspondDates(daysInAMonth,dayName)'
          >
          {{day.dayNumber}}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { correspondDates } from "../utils";
export default {
  data() {
    return {
      correspondDates
    };
  },
  props: {
    currentDate: {
      type: Date,
      default: new Date()
    },
    daysNames: {
      type: Array
    },
    daysInAMonth: {
      type: Array
    }
  }
};
</script>

<style lang='scss' scoped>
.vue-calendar__monthly-view {
  &--content {
    display: flex;
  }
  &--cells {
    display: flex;
    flex-direction: column;
  }
}
</style>
