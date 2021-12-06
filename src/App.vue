<template>
  <div>
    <Calendar
      :onDatePickerChangeDate="onDatePickerChangeDate"
      :DatePickerDropdownYears="renderDatePickerDropdownYears"
      :keepDatePickerOpen="false"
    />
  </div>
</template>

<script>
import Calendar from './components/Calendar'

export default {
  name: 'app',
  components: {
    Calendar
  },
  methods: {
    onDatePickerChangeDate(view, date) {
      console.log(view,date)
    },
    renderDatePickerDropdownYears(currentDate) {
      return [2011,2012,2013,2014,2015,2016]
    }
  }
}
</script>

<style>

</style>
