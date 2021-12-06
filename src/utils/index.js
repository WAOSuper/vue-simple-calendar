/* eslint-disable */
import getDay from "date-fns/get_day";
import addWeeks from "date-fns/add_weeks";
import addDays from "date-fns/add_days";
import startOfWeek from "date-fns/start_of_week";
import endOfWeek from "date-fns/end_of_week";
import format from "date-fns/format";
import getDate from "date-fns/get_date";
import lastDayOfMonth from "date-fns/last_day_of_month";
import startOfMonth from "date-fns/start_of_month";
import subWeeks from "date-fns/sub_weeks";
import isPast from "date-fns/is_past";
import isBefore from "date-fns/is_before";
import isSameDay from "date-fns/is_same_day";
import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";

function ifDateHasPass(date, selectedDate = new Date()) {
  return isPast(date) && !isSameDay(date, selectedDate);
}

function ifItsSameDay(date, selectedDate = new Date()) {
  return isSameDay(date, selectedDate);
}

function ifItsSameHour(date, selectedDate = new Date()) {
  return getHours(date) === getHours(selectedDate);
}

function renderDayNames(date = new Date()) {
  const dayNameFormat = "dddd";
  const startWeek = startOfWeek(date);
  return Array(7)
    .fill(0)
    .map((item, index) => {
      const dayName = format(addDays(startWeek, index), dayNameFormat);
      return dayName;
    });
}

function renderDaysInMonth(date) {
  const lastDayOftheMonth = lastDayOfMonth(date);
  const startOftheMonth = startOfMonth(date);
  const currentDate = getDate(date);
  const dayFormat = "dddd";
  const startDate = startOfWeek(startOftheMonth);
  const endDate = endOfWeek(lastDayOftheMonth);

  function dayModal(date) {
    return {
      date,
      dayName: format(date, dayFormat),
      dayNumber: getDate(date),
      MonthBelongTo: format(date, "M")
    };
  }

  let daysInAMonth = [];
  let selectedDate = startDate;
  while (selectedDate <= endDate) {
    daysInAMonth.push(dayModal(selectedDate));
    selectedDate = addDays(selectedDate, 1);
  }
  return daysInAMonth;
}

function getCurrentWeekNumber(date) {
  const lastDayOftheMonth = getDate(lastDayOfMonth(date));
  const startOftheMonth = getDate(startOfMonth(date));
  const currentDate = getDate(date);
  let week = 0;
  let count = 0;
  for (let day = startOftheMonth; day <= lastDayOftheMonth; day++) {
    count++;
    if (count > 7) {
      count = 0;
      week++;
    }
    if (day === currentDate) {
      return week + 1;
    }
  }
}

function getCurrentWeekInRange(date, weekFormat) {
  const startOfTheWeek = startOfWeek(date);
  const endOfTheWeek = endOfWeek(date);
  const startWeekDate = format(startOfTheWeek, weekFormat);
  const endWeekDate = format(endOfTheWeek, weekFormat);
  return `${startWeekDate} - ${endWeekDate}`;
}

function getMonthsInAYear() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const monthsData = [];
  months.forEach((item, index) => {
    monthsData.push({
      month: item,
      number: index + 1
    });
  });
  return monthsData;
}

function get20YearsInRange(date) {
  const currentYear = format(date, "YYYY");
  let downCount = 10;
  let upCount = 0;
  let downYears = [];
  let upYears = [];
  while (downCount !== 0) {
    downCount--;
    downYears.push(currentYear - downCount);
  }
  while (upCount <= 10) {
    upCount++;
    upYears.push(Number(currentYear) + Number(upCount));
  }
  return [...downYears, ...upYears];
}

function correspondDates(dayPool, dayName) {
  return dayPool.filter(day => day.dayName === dayName);
}
export {
  ifDateHasPass,
  ifItsSameDay,
  ifItsSameHour,
  renderDayNames,
  renderDaysInMonth,
  getCurrentWeekNumber,
  getMonthsInAYear,
  get20YearsInRange,
  getCurrentWeekInRange,
  correspondDates
};
