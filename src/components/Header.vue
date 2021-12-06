<template>
  <header class='vue-calendar__header'>
    <div class="vue-calendar__header--left">
      <button class='vue-calendar__header--button' @click="toToday()">
        Today
      </button>
      <button class='vue-calendar__header--button' @click="toPrevious()">
        previous
      </button>
      <button class='vue-calendar__header--button' @click="toNext()">
        Next
      </button>
    </div>
    <div class="vue-calendar__header--middle">
      <button @click="onShowDatePicker()" class="vue-calendar__header--middle--headline">
        {{renderHeadLine}}
      </button>
    </div>
    <div class="vue-calendar__header--right">
      <button class='vue-calendar__header--button' @click="selectView('monthly')">
        Month
      </button>
      <button class='vue-calendar__header--button' @click="selectView('weekly')">
        Week
      </button>
      <button class='vue-calendar__header--button' @click="selectView('daily')">
        Day
      </button>
      <button class='vue-calendar__header--button' @click="selectView('agenda')">
        Agenda
      </button>
    </div>
  </header>
</template>

<script>
import format from "date-fns/format";
import addWeeks from "date-fns/add_weeks";
import addDays from "date-fns/add_days";
import subWeeks from "date-fns/sub_weeks";
import subDays from "date-fns/sub_days";
import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";

import { getCurrentWeekInRange } from "../utils";

export default {
  props: {
    onShowDatePicker: {
      type: Function,
      default: () => {}
    },
    changeDate: {
      type: Function,
      default: () => {}
    },
    selectView: {
      type: Function,
      default: () => {}
    },
    selectedView: {
      type: String,
      default: "monthly"
    },
    currentDate: {
      type: Date,
      default: ""
    },
    headlineMonthFormat: {
      type: String,
      default: "YYYY MMMM DD"
    },
    headlineDayFormat: {
      type: String,
      default: "dddd MMM DD"
    },
    headlineWeekFormat: {
      type: String,
      default: "MMM DD"
    }
  },
  computed: {
    renderHeadLine() {
      if (this.selectedView === "monthly") {
        return format(this.currentDate, this.headlineMonthFormat);
      } else if (this.selectedView === "weekly") {
        return getCurrentWeekInRange(this.currentDate, this.headlineWeekFormat);
      } else if (this.selectedView === "daily") {
        return format(this.currentDate, this.headlineDayFormat);
      }
    }
  },
  methods: {
    toPrevious() {
      if (this.selectedView === "monthly") {
        this.toPreviousMonth();
      } else if (this.selectedView === "weekly") {
        this.toPreviousWeek();
      } else {
        this.toPreviousDay();
      }
    },
    toNext() {
      if (this.selectedView === "monthly") {
        this.toNextMonth();
      } else if (this.selectedView === "weekly") {
        this.toNextWeek();
      } else {
        this.toNextDay();
      }
    },
    toToday() {
      this.changeDate(new Date());
    },
    toPreviousMonth() {
      const previousMonth = subMonths(this.currentDate, 1);
      this.changeDate(previousMonth);
    },
    toPreviousWeek() {
      const previousWeek = subWeeks(this.currentDate, 1);
      this.changeDate(previousWeek);
    },
    toPreviousDay() {
      const previousDay = subDays(this.currentDate, 1);
      this.changeDate(previousDay);
    },
    toNextMonth() {
      const nextMonth = addMonths(this.currentDate, 1);
      this.changeDate(nextMonth);
    },
    toNextWeek() {
      const nextWeek = addWeeks(this.currentDate, 1);
      this.changeDate(nextWeek);
    },
    toNextDay() {
      const nextDay = addDays(this.currentDate, 1);
      this.changeDate(nextDay);
    }
  }
};
</script>


<style lang="scss" scoped>
.vue-calendar {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: #373a3c;
      text-align: center;
      background: none;
      background-image: none;
      border: 1px solid #ccc;
      padding: 0.375rem 1rem;
      border-radius: 4px;
      line-height: normal;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        color: #373a3c;
        background-color: #e6e6e6;
        border-color: #adadad;
      }
    }
    &--left {
    }
    &--middle {
      &--headline {
        outline: 0;
        border: 0;
        background: none;
        cursor: pointer;
      }
    }
    &--right {
    }
  }
}
</style>
