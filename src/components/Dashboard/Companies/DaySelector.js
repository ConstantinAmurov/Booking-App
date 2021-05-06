import React, { useState } from 'react'
import styles from "../../../css/Dashboard/Dashboard.module.css";
import Switch from "react-switch"
import { TimePicker } from 'antd';
import moment from 'moment';

const DaySelector = ({ day }) => {
    const [checked, setChecked] = useState(false);
    const [openTime, setOpenTime] = useState(null);
    const [closeTime, setCloseTime] = useState('21:00');


    function handleChange(checked) {
        setChecked(checked);
    }

    const onChange = time => {
        setOpenTime(time);
    };

    return (
        <div className={styles.daySelector}>
            <div className={styles.day}>
                <h4>{day}</h4>
            </div>
            <div className={styles.details}>

                <div className={styles.workingSwitch}><p>WORKING</p>
                    <Switch className={styles.switch} offColor="#E0E0E0" onColor="#F29F57" onHandleColor="#EF6313" offHandleColor="#4F4F4F" onChange={handleChange} checked={checked} />
                </div>
                <div className={styles.openHours}>
                    <p>OPEN</p> <input type="time"></input>

                </div>
                <div className={styles.closeHours}>
                    <p>CLOSE</p> <input type="time"></input>


                </div>
                {/* <div className={styles.closeHours}><p>CLOSE</p><TimePicker onChange={setCloseTime} value={closeTime} /> */}
            </div>
        </div>

    )
}

export default DaySelector
