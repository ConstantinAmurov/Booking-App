import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import ButtonGroup from "@ramonak/react-button-group";
import {
  calculatePrice,
  setDuration,
  setHour,
} from "../../../services/Booking.service";
import styles from "../../../css/Services/EditService.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/DatePicker.css";
import "../../../css/Modals.css";

import {
  getDayName,
  getIndexDaysWorking,
  isWorking,
} from "../../../services/Search.service";
import { getWorkingHours } from "../../../contexts/CompanyContext";
import { isValidReservation } from "../../../contexts/DatabaseContext";
import { setSeconds } from "date-fns";
import addMinutes from "date-fns/addMinutes";
const BookServiceForm = ({ service, handleSectionChange }) => {
  const handleDateChange = (date) => {
    var day = getDayName(date.getDay()).toUpperCase();
    var openCloseHours = getWorkingHours(service, "book-service", day);

    return openCloseHours;
  };
  const durations = setDuration(service.duration);
  const [openCloseHours, setOpenCloseHours] = useState(
    handleDateChange(new Date())
  );

  const workingDaysIndexes = getIndexDaysWorking(service.workingDays);

  //   const startHour = setHour(service.openHour);
  const formik = useFormik({
    initialValues: {
      duration: null,
      capacity: null,
      hour: openCloseHours[0],
      date: new Date(),
    },
    //validationSchema,
    onSubmit: async (values) => {
      var validReservation = await isValidReservation(
        service.id,
        service.duration,
        service.capacity,
        values
      );
      var totalPrice = calculatePrice(
        service.duration,
        values.hour,
        addMinutes(values.hour, values.duration),
        service.price,
        values.capacity
      );
      if (validReservation) {
        handleSectionChange("user-information", {
          ...values,
          totalPrice: totalPrice,
        });
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formInput}>
          <p>Duration</p>
          <ButtonGroup
            containerClassName={styles.container}
            buttonClassName={styles.buttonContainer}
            activeButtonClassName={styles.activeButtonContainer}
            buttons={durations}
            onButtonClick={(e) => {
              e.preventDefault();

              formik.setFieldValue("duration", parseInt(e.target.name));
              formik.setFieldTouched("duration", true);
            }}
          />
        </div>
        <div className={styles.formInput}>
          <p>Capacity</p>
          <ButtonGroup
            containerClassName={styles.container}
            buttonClassName={styles.buttonContainer}
            activeButtonClassName={styles.activeButtonContainer}
            buttons={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            onButtonClick={(e) => {
              e.preventDefault();
              formik.setFieldValue("capacity", parseInt(e.target.name));
              formik.setFieldTouched("capacity", true);
            }}
          />
        </div>
        <div className={styles.formInput}>
          <p>Time and Date</p>
          <div className={styles.datePickers}>
            <DatePicker
              wrapperClassName="timeDatePicker"
              selected={formik.values.hour}
              placeholderText="Choose an hour"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              minTime={openCloseHours[0]}
              maxTime={openCloseHours[1]}
              onChange={(date) => formik.setFieldValue("hour", date)}
            />
            <DatePicker
              wrapperClassName="bookingDatePicker"
              selected={formik.values.date}
              minDate={new Date()}
              filterDate={(date) => isWorking(workingDaysIndexes, date)}
              onChange={(date) => {
                formik.setFieldValue("date", date);
                var openCloseHours = handleDateChange(date);
                setOpenCloseHours(openCloseHours);

                formik.setFieldValue("hour", setSeconds(openCloseHours[0], 0));
              }}
            />
          </div>
        </div>
        <button type="submit" className={styles.bookButton}>
          Book services
        </button>
      </form>
    </>
  );
};

export default BookServiceForm;
