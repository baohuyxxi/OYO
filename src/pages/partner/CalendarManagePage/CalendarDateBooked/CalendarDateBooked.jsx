import './CalendarDateBooked.scss';
import React, { useState, useEffect } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';

export default function CalendarDateBooked({ accomApproved }) {
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const groupData = accomApproved.map((item) => ({
                id: item.id,
                title: item.accomName
            }));
            setGroups(groupData);
            const res = await partnerManageAccomAPI.getListAccomWithPriceCustom();
            const itemData = [];
            const currentDate = moment();
            res.data.content.forEach((accom) => {
                if (accom.rangeDateBookingList.length > 0) {
                    accom.rangeDateBookingList.forEach((dateBooking, index) => {
                        const startDate = moment(dateBooking.dateStart, 'DD/MM/YYYY');
                        const endDate = moment(dateBooking.dateEnd, 'DD/MM/YYYY');

                        if (startDate.isBefore(currentDate) || endDate.isBefore(currentDate)) {
                            return;
                        }

                        itemData.push({
                            id: `${accom.accomId}-${index}`,
                            group: accom.accomId,
                            title: dateBooking.nameCustomer,
                            start_time: startDate.add(12, 'hour'),
                            end_time: endDate.add(12, 'hour')
                        });
                    });
                }
            });
            setItems(itemData);
            setLoading(false);
        };

        if (accomApproved.length > 0) {
            fetchData();
        }
    }, [accomApproved]);
    return (
        <div className="calendar-manage">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Timeline
                        groups={groups}
                        items={items}
                        defaultTimeStart={moment().add(0, 'hour')}
                        defaultTimeEnd={moment().add(14, 'day')}
                        canResize={false}
                    />
                </div>
            )}
        </div>
    );
}
