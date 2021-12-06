<template>
  <!-- eslint-disable -->
  <div class='vue-calendar'>
    <div class="vue-calendar__content">
      <Header
        :onShowDatePicker="onShowDatePicker"
        :selectedView="selectedView"
        :currentDate="currentDate"
        :changeDate="changeDate"
        :selectView="selectView"
      />
      <MonthlyView
        :currentDate="currentDate"
        :daysNames="daysNames"
        :daysInAMonth="daysInAMonth"
        v-if="selectedView==='monthly'"
      />
    </div>
    <DatePicker
      :currentDate='currentDate'
      :changeDate='changeDate'
      :selectView='selectView'
      :onShowDatePicker='onShowDatePicker'
      :daysNames='daysNames'
      :daysInAMonth='daysInAMonth'
      :currentMonth='currentMonth'
      :currentYear='currentYear'
      :toPreviousMonth='toPreviousMonth'
      :toNextMonth='toNextMonth'
      :changeMonth='changeMonth'
      :showMonthlyDropdown= 'showMonthlyDropdown'
      :onMonthClick='onMonthClick'
      :changeYear='changeYear'
      :showYearlyDropdown= 'showYearlyDropdown'
      :onYearClick='onYearClick'
      :datePickerDropdownYears="datePickerDropdownYears"
      v-if='ifShowDatePicker'
      ref="datePicker"
    />
  </div>
</template>

<script>
import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";
import format from "date-fns/format";
import getDate from "date-fns/get_date";
import setMonth from "date-fns/set_month";
import setYear from "date-fns/set_year";

import Header from "./Header.vue";
import DatePicker from "./DatePicker.vue";
import MonthlyView from "./MonthlyView.vue";

import {
  ifDateHasPass,
  ifItsSameDay,
  ifItsSameHour,
  renderDayNames,
  renderDaysInMonth
} from "../utils";

export default {
  data() {
    return {
      showDatePicker: true,
      currentDate: new Date(),
      selectedView: "monthly",
      showMonthlyDropdown: false,
      showYearlyDropdown: false
    };
  },
  components: {
    MonthlyView,
    DatePicker,
    Header
  },
  props: {
    onDatePickerChangeDate: {
      type: Function,
      default: () => {}
    },
    datePickerDropdownYears: {
      type: Function,
      default: () => null
    },
    keepDatePickerOpen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    selectView(view) {
      this.selectedView = view;
    },
    changeDate(date) {
      this.currentDate = date;
      this.onDatePickerChangeDate(this.selectedView, date);
      if(this.showDatePicker) {
        this.showDatePicker = false;
      }
    },
    onShowDatePicker() {
      this.showDatePicker !== this.showDatePicker;
    },
    toPreviousMonth() {
      this.currentDate = subMonths(this.currentDate, 1);
    },
    toNextMonth() {
      this.currentDate = addMonths(this.currentDate, 1);
    },
    changeMonth(month) {
      this.currentDate = setMonth(this.currentDate, month - 1);
    },
    onMonthClick(close = false) {
      if (close) {
        this.showMonthlyDropdown = false;
      } else this.showMonthlyDropdown = !this.showMonthlyDropdown;
      this.showYearlyDropdown = false;
    },
    changeYear(year) {
      this.currentDate = setYear(this.currentDate, year);
    },
    onYearClick(close = false) {
      if (close) {
        this.showYearlyDropdown = false;
      } else this.showYearlyDropdown = !this.showYearlyDropdown;
      this.showMonthlyDropdown = false;
    },
    onShowDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    handleClickOutside(e) {
      if (this.showDatePicker) {
        if (
          this.$refs.datePicker &&
          !e.path.includes(this.$refs.datePicker.$el)
        ) {
          this.showDatePicker = false;
        }
      }
    }
  },
  computed: {
    daysNames() {
      return renderDayNames(this.currentDate);
    },
    daysInAMonth() {
      return renderDaysInMonth(this.currentDate);
    },
    currentMonth() {
      return format(this.currentDate, "MMMM");
    },
    currentYear() {
      return format(this.currentDate, "YYYY");
    },
    ifShowDatePicker() {
      return this.keepDatePickerOpen
        ? this.keepDatePickerOpen
        : this.showDatePicker;
    }
  }
};
</script>

<style lang='scss' scoped>
.vue-calendar {
  position: relative;
  &__content {
    padding: 0 40px;
  }
}
</style>
