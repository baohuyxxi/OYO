import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

import 'react-calendar/dist/Calendar.css';
import './DateIsBooking.scss';
import { t } from 'i18next';

export default function DateIsBooking(props) {
    const [value, onChange] = useState(new Date());

    return (
        <div className="data-isbooking">
            <h1 style={{ marginBottom: '20px', marginTop: '20px' }}>{t('contentMain.dayBooked')}</h1>
            <Calendar
                className="paper"
                onChange={onChange}
                value={value}
                tileClassName={({ date, view }) => {
                    if (props.bookedDates?.find((x) => x === moment(date).format('DD/MM/YYYY'))) {
                        return 'highlight';
                    }
                    return '';
                }}
                // tileDisabled={({ date }) => date.getDay() === 0}
                minDate={new Date()}
            />
        </div>
    );
}
