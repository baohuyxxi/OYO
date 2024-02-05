import React, { useState, useEffect } from "react";
import { RangePicker as ReactRangePicker } from "react-trip-date";
import dayjs from "dayjs";

export const Calendar = ({
  initialRangeValuesProps,
  onRangeChange,
  initialMonthAndYear,
  setOnRangeDateInScreen
}) => {
  const [rangeValues, setRangeValues] = useState(initialRangeValuesProps);

  useEffect(() => {
    setRangeValues(initialRangeValuesProps);
  }, [initialRangeValuesProps]);

  const rangePickerProps = {
    initialMonthAndYear: initialMonthAndYear,
    selectedDays: rangeValues,
    autoResponsive: false,
    numberOfMonths: 2,
    disabledBeforeToday: true,
    disabledBeforeDate: dayjs().add(1, "day"),
    onRangeDateInScreen: (e) => setOnRangeDateInScreen(e)
  };

  const onChange = (e) => {
    setRangeValues(e);
    onRangeChange(e);
  };

  return <ReactRangePicker {...rangePickerProps} onChange={onChange} />;
};
