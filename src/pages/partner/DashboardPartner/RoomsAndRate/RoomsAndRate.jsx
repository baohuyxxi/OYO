import './RoomsAndRate.scss';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import arrowRight from '~/assets/svg/arrow-right.svg';
import arrowLeft from '~/assets/svg/arrow-left.svg';
import { useSnackbar } from 'notistack';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton

export default function RoomsAndRate({ accomApproved }) {
    const [loading, setLoading] = useState(true);
    const [currentWeek, setCurrentWeek] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [changePrice, setChangePrice] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [listHomeOfPartner, setListHomeOfPartner] = useState([]);

    useEffect(() => {
        setCurrentWeek(getCurrentWeekDates());
        partnerManageAPI.getListAccomWithPriceCustom().then((res) => {
            const data = res.data.content.map((item) => {
                const transformedPriceList = item.priceCustomForAccomList.reduce((acc, current) => {
                    acc[current.dateApply] = { priceApply: current.priceApply };
                    return acc;
                }, {});

                return {
                    ...item,
                    priceCustomForAccomList: transformedPriceList
                };
            });

            setAccommodations(data);
            setLoading(false); // Set loading to false once data is fetched
        });
    }, [accomApproved]);

    const getCurrentWeekDates = () => {
        let weekStart = moment().startOf('week');
        let days = [];
        for (let i = 0; i < 7; i++) {
            days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));
        }
        return days;
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

    const getPriceAccommodation = (accommodation, date) => {
        if(changePrice[accommodation.accomId] ) {
            return changePrice[accommodation.accomId][date]
        }
        if (accommodation.priceCustomForAccomList[date] !== undefined) {
            return accommodation.priceCustomForAccomList[date].priceApply;
        } else {
            return accommodation.pricePerNight;
        }
    };

    const getPriceClass = (accommodation, date) => {
        const defaultPrice = accommodation.pricePerNight;
        const customPrice = accommodation.priceCustomForAccomList[date]?.priceApply;

        if (customPrice === undefined || customPrice === defaultPrice) {
            return 'default-price';
        } else if (customPrice > defaultPrice) {
            return 'higher-price';
        } else {
            return 'lower-price';
        }
    };

    const renderAccommodationRows = () => {
        return accommodations.map((accommodation, index) => (

            <tr key={accommodation.accomId} className="rate-room">
                <td className="rate-room__name">{accommodation.accomName}</td>
                {currentWeek.map((date) => (
                    <td key={`${accommodation.accomId}-${date}`}>
                        <input
                            type="text"
                            value={
                              getPriceAccommodation(accommodation, date)?.toLocaleString('vi-VN')
                            }
                            className={`rate-room__input ${getPriceClass(accommodation, date)}`}
                            onChange={(event) => handlePriceChange(accommodation.accomId, date, event)}
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
        return currentWeek.map((date) => moment(date).subtract(7, 'days').format('YYYY-MM-DD'));
    };

    const getNextWeekDates = () => {
        return currentWeek.map((date) => moment(date).add(7, 'days').format('YYYY-MM-DD'));
    };

    const handleSave = () => {
        const data = Object.keys(changePrice).reduce((acc, accomId) => {
            return [
                ...acc,
                ...Object.keys(changePrice[accomId]).map((date) => ({
                    accomId: parseInt(accomId),
                    dateApply: moment(date).format('DD/MM/YYYY'),
                    priceApply: changePrice[accomId][date]
                }))
            ];
        }, []);
        partnerManageAPI.updatePriceCustom(data).then((res) => {
            enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
        });
    };

    return (
        <div className="rooms-and-rate-container">
            {loading ? (
                <Skeleton variant="rectangular" width="100%" height={400} /> // Use Skeleton component for loading state
            ) : (
                <>
                    <div className="week-navigation">
                        <button
                            className="week-navigation__button"
                            onClick={() => setCurrentWeek(getPreviousWeekDates())}
                        >
                            <img src={arrowLeft} alt="arrow-right" className="week-navigation__icon" />
                        </button>
                        <button className="week-navigation__button" onClick={() => setCurrentWeek(getNextWeekDates())}>
                            <img src={arrowRight} alt="arrow-right" className="week-navigation__icon" />
                        </button>
                        <div style={{ marginLeft: 'auto' }}></div>
                        <button className="week-navigation__save" onClick={handleSave}>
                            Lưu
                        </button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        {currentWeek[0]} &rarr; {currentWeek[6]}
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
