import './RoomsAndRate.scss';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { set } from 'date-fns';

export default function RoomsAndRate({ accomApproved }) {
    const [loading, setLoading] = useState(true);
    const [currentWeek, setCurrentWeek] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [changePrice, setChangePrice] = useState([]);

    useEffect(() => {
        setCurrentWeek(getCurrentWeekDates());
        initializeAccommodations();
        setLoading(false);
    }, [accomApproved]);

    const getCurrentWeekDates = () => {
        let weekStart = moment().startOf('days');
        let days = [];
        for (let i = 0; i < 7; i++) {
            days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));
        }
        return days;
    };

    const initializeAccommodations = () => {
        setAccommodations(accomApproved);
    };

    const renderTableHeader = () => {
        return currentWeek.map((date) => (
            <th key={date}>
                {`${moment(date).format('d') === '0' ? 'CN' : `T${parseInt(moment(date).format('d')) + 1}`}, ${moment(
                    date
                ).format('DD')}`}
            </th>
        ));
    };

    const renderAccommodationRows = () => {
        return accommodations.map((accommodation, index) => (
            <tr key={accommodation.id} className="rate-room">
                <td className="rate-room__name">{accommodation.accomName}</td>
                {currentWeek.map((date) => (
                    <td key={`${accommodation.id}-${date}`}>
                        <input
                            type="text"
                            defaultValue={accommodation.pricePerNight.toLocaleString('vi-VN')}
                            value={
                                changePrice[accommodation.id]
                                    ? changePrice[accommodation.id][date]?.toLocaleString('vi-VN')
                                    : accommodation.pricePerNight.toLocaleString('vi-VN')
                            }
                            onChange={(event) => handlePriceChange(accommodation.id, date, event)}
                        />
                    </td>
                ))}
            </tr>
        ));
    };

    const handlePriceChange = (id, date, event) => {
        let newChangePrice = parseInt(event.target.value.replace(/\D/g, ''));
        if (newChangePrice < 0 || isNaN(newChangePrice)) {
            newChangePrice = 0;
        }
        setChangePrice({ ...changePrice, [id]: { ...changePrice[id], [date]: newChangePrice } });
    };
    const getPreviousWeekDates = () => {
        return currentWeek.map((date) => moment(date).subtract(7, 'days').format('YYYY-MM-DD')); // Thay đổi 14 ngày cho hai tuần
    };

    const getNextWeekDates = () => {
        return currentWeek.map((date) => moment(date).add(7, 'days').format('YYYY-MM-DD')); // Thay đổi 14 ngày cho hai tuần
    };
    return (
        <div className="rooms-and-rate-container">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="week-navigation">
                        <button onClick={() => setCurrentWeek(getPreviousWeekDates())}>Tuần trước</button>{' '}
                        {/* Thay đổi nút và chuỗi */}
                        <button onClick={() => setCurrentWeek(getNextWeekDates())}>Tuấn tiếp theo</button>{' '}
                        {/* Thay đổi nút và chuỗi */}
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        {currentWeek[0]} - {currentWeek[6]}
                                    </th>
                                    {renderTableHeader()}
                                </tr>
                            </thead>
                            <tbody>{renderAccommodationRows()}</tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
