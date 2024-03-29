import { useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import './DateGo.scss';
const DateRangePickerComp = (props) => {
    const dataBooking = useSelector((state) => state.booking.info);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            // endDate: addDays(new Date(), 1),
            key: 'selection',
        }
    ]);

    const [open, setOpen] = useState(false);

    const refOne = useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', hideOnEscape, true);
        document.addEventListener('click', hideOnClickOutside, true);

        return () => {
            document.removeEventListener('keydown', hideOnEscape, true);
            document.removeEventListener('click', hideOnClickOutside, true);
        };
    }, []);

    const hideOnEscape = (e) => {
        if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target) && !e.target.closest('.calendarWrap')) {
            setOpen(false);
        }
    };

    return (
        <div className="calendarWrap">
            <div className="info_date">
                <div className="output start">
                    <input
                         value={`${format(range[0].startDate, 'dd/MM/yyyy')}`}
                        readOnly
                        className="inputBox"
                        onClick={() => setOpen((open) => !open)}
                    />
                </div>

                <div className="output end">
                    <input
                        value={`${format(range[0].endDate, 'dd/MM/yyyy')}`}
                        readOnly
                        className="inputBox"
                        onClick={() => setOpen((open) => !open)}
                    />
                </div>
            </div>

            <div ref={refOne}>
                {open && (
                    <DateRangePicker
                        onChange={(item) => {
                            setRange([item.selection]);
                            if (item?.selection) {
                                if (props?.setDataDay) {
                                    props.setDataDay([item.selection]);
                                }
                            }
                        }}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        minDate={new Date()} 
                        months={2}
                        direction={props.size}
                        className="calendarElement"
                    />
                )}
            </div>
        </div>
    );
};

export default DateRangePickerComp;