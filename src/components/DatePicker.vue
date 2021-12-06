<template>
  <!-- eslint-disable -->
  <div class='datePicker'>
    <div class='datePicker--content'>
      <div class='datePicker--top'>
        <button @click='toPreviousMonth()' class='arrow datePicker-to-previous-month' />
        <div class='datePicker-display'>
          <span class='datePicker-display--month' @click='onMonthClick()'>{{currentMonth}}</span>
          <span class='datePicker-display--year' @click='onYearClick()'> {{currentYear}}</span>
        </div>
        <button @click='toNextMonth()' class='arrow datePicker-to-next-month' />
      </div>
      <div class='datePicker--bottom'>
        <div class='datePicker--bottom--days' v-for='dayName in daysNames'>
          <div class='datePicker--bottom--dayName'>
            {{dayName.slice(0,2)}}
          </div>
          <div>
            <div
              class='datePicker--bottom--day'
              v-for='day in correspondDates(daysInAMonth,dayName)'
              v-bind:class="{
                'datePicker-isSameDay': ifItsSameDay(day.date,currentDate),
                'datePicker-hasPass': ifDateHasPass(day.date)
                }"
              @click='changeDate(day.date)'
              >
              {{day.dayNumber}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <DropDown
      v-if='showMonthlyDropdown'
      :onChangeMonth='onChangeMonth'
      ref="dropdownMonth"
      :dropDownValues='getMonthsInAYear()'
      :type="'month'"
    />
    <DropDown
      v-if='showYearlyDropdown'
      :onChangeYear='onChangeYear'
      ref="dropdownYear"
      :dropDownValues='dropdownYears || get20YearsInRange(currentYear)'
      :type="'year'"
    />
  </div>
</template>
<script>
/* eslint-disable */
import {
  ifDateHasPass,
  ifItsSameDay,
  ifItsSameHour,
  renderDayNames,
  renderDaysInMonth,
  getCurrentWeekNumber,
  getMonthsInAYear,
  get20YearsInRange,
  correspondDates
} from "../utils";
import DropDown from "./DropDown";

export default {
  data() {
    return {
      ifItsSameDay,
      ifDateHasPass,
      getMonthsInAYear,
      get20YearsInRange,
      correspondDates,
      dropdownYears: null
    };
  },
  components: {
    DropDown
  },
  // propsTypes to do..
  props: [
    "currentDate",
    "daysNames",
    "currentMonthYear",
    "daysInAMonth",
    "changeDate",
    "toPreviousMonth",
    "toNextMonth",
    "currentMonth",
    "currentYear",
    "changeMonth",
    "showMonthlyDropdown",
    "onMonthClick",
    "showYearlyDropdown",
    "changeYear",
    "onYearClick",
    "datePickerDropdownYears"
  ],
  created() {
    const getDropdownYears = this.datePickerDropdownYears();
    if (getDropdownYears) {
      this.dropdownYears = getDropdownYears;
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    onChangeMonth(month) {
      this.changeMonth(month);
      this.onMonthClick(true);
    },
    onChangeYear(year) {
      this.changeYear(year);
      this.onYearClick(true);
    },
    handleClickOutside(e) {
      if (
        this.$refs.dropdownMonth &&
        !e.path.includes(this.$refs.dropdownMonth.$el)
      ) {
        this.onMonthClick(true);
      }
      if (
        this.$refs.dropdownYear &&
        !e.path.includes(this.$refs.dropdownYear.$el)
      ) {
        this.onYearClick(true);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.datePicker {
  position: absolute;
  width: 250px;
  max-width: 250px;
  right: 0;
  bottom: 0;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  &-month-display {
    color: #000;
    font-weight: bold;
    font-size: 0.944rem;
  }
  &--content {
    margin: 10px;
    padding: 5px;
  }
  &--top {
    display: flex;
    justify-content: space-between;
    background-color: #f0f0f0;
    border-bottom: 1px solid #aeaeae;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    padding: 5px;
  }
  &--bottom {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    &--dayName {
      margin-bottom: 5px;
    }
    &--days {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    &--day {
      padding: 2px;
      cursor: pointer;
      &:hover {
        background-color: rgb(228, 231, 231);
      }
    }
  }
  &-hasPass {
    background-color: rgb(255, 255, 255);
    color: rgb(202, 204, 205);
    cursor: initial;
    &:hover {
      background-color: rgb(255, 255, 255);
    }
  }
}
.datePicker-to-previous-month {
  border: 0.45rem solid transparent;
  border-right-color: #ccc;
}
.datePicker-to-next-month {
  border: 0.45rem solid transparent;
  border-left-color: #ccc;
}
.arrow {
  height: 10px;
  width: 10px;
  cursor: pointer;
  outline: none;
  padding: 0;
  background: none;
}
.datePicker-isSameDay {
  border-radius: 0.3rem;
  background-color: rgb(130, 136, 138);
  color: white;
  &:hover {
    background-color: rgb(130, 136, 138);
  }
}
.datePicker-display {
  &--month {
    cursor: pointer;
  }
  &--year {
    cursor: pointer;
  }
}
</style>
