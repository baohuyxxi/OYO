import './CalendarManage.scss';
import React, { useState, useEffect } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { id } from 'date-fns/locale';

export default function CalendarManage({ accomApproved }) {
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

            const itemData = [];
            for (const item of accomApproved) {
                try {
                    const response = await publicAccomPlaceAPI.getRoomDetail(item.id);
                    const { bookedDates } = response.data;
                    if (bookedDates && bookedDates.length > 0) {
                        let start_time = moment(bookedDates[0], 'DD/MM/YYYY').add(12, 'hour');
                        let end_time = moment(bookedDates[0], 'DD/MM/YYYY').add(36, 'hour');
                        let i = 0;
                        while (i < bookedDates.length) {
                            if (start_time === null) {
                                start_time = moment(bookedDates[i], 'DD/MM/YYYY').add(12, 'hour');
                            }
                            end_time = moment(bookedDates[i], 'DD/MM/YYYY').add(36, 'hour');
                            if (end_time.diff(moment(bookedDates[i + 1], 'DD/MM/YYYY').add(36, 'hour'), 'days') == -1) {
                                i++;
                                continue;
                            } else if ((start_time !== null, end_time !== null)) {
                                itemData.push({
                                    id: `${item.id}-${i}`,
                                    group: item.id,
                                    title: 'Booked',
                                    start_time: start_time,
                                    end_time: end_time
                                });
                                start_time = null;
                                end_time = null;
                            }
                            i++;
                        }
                    }
                } catch (error) {
                    console.error('Error fetching room detail:', error);
                }
            }
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
                    />
                </div>
            )}
        </div>
    );
}
