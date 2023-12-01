import { useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import './DateBooking.scss';
// import pricesOfHomeApi from '~/services/pricesOfHomeApi';
import { useDispatch } from 'react-redux';
// import bookingSlice from '~/pages/BookingPage/bookingSlice';
import { t } from 'i18next';

const DateBooking = (props) => {
    const [range, setRange] = useState([
        {
            checkIn: new Date(props.checkIn),
            checkOut: new Date(props.checkOut),
            key: 'selection',
        },
    ]);

    const [open, setOpen] = useState(false);
    const refOne = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener('keydown', hideOnEscape, true);
        document.addEventListener('click', hideOnClickOutside, true);
    }, []);

    const hideOnEscape = (e) => {
        if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false);
        }
    };

    const handleChangeDayBooking = async (value) => {
        const dateFrom = format(value[0].checkIn, 'dd/MM/yyyy');
        const dateTo = format(value[0].checkOut, 'dd/MM/yyyy');
        // dispatch(bookingSlice.actions.addDay({ dateFrom, dateTo }));
        // pricesOfHomeApi.showPriceByRangeDay(props?.idHome, dateFrom, dateTo).then((dataResponse) => {
        //     if (props.handleChangePriceDay) {
        //         props.handleChangePriceDay(dataResponse?.data?.totalCost);
        //         dispatch(
        //             bookingSlice.actions.addPriceTotal({ priceTotal: dataResponse?.data?.totalCostWithSurcharge }),
        //         );
        //     }
        // });
    };

    return (
        <div className="date__booking">
            <div className="info-day">
                <div className="day">
                    <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{t('title.bookingOfYou.day')}</p>
                    <p className="info_date">{`${format(range[0].checkIn, 'dd/MM/yyyy')} -- ${format(
                        range[0].checkOut,
                        'dd/MM/yyyy',
                    )}`}</p>
                </div>

                <p onClick={() => setOpen((open) => !open)} className="edit-date">
                    {t('common.edit')}
                </p>
            </div>
            <div ref={refOne}>
                {open && (
                    <DateRangePicker
                        onChange={(item) => {
                            setRange([item.selection]);
                            handleChangeDayBooking([item.selection]);
                        }}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={2}
                        direction={props.size}
                        className="calendarElement"
                        showDateDisplay={false}
                    />
                )}
            </div>
        </div>
    );
};

export default DateBooking;
