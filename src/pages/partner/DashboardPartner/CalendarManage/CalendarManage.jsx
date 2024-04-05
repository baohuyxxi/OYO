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
                    for (const date of bookedDates) {
                        const newItem = {
                            id: `${item.id}-${date}`,
                            group: item.id,
                            title: 'item 1',
                            start_time: moment(date, 'DD/MM/YYYY').startOf('day'),
                            end_time: moment(date, 'DD/MM/YY').startOf('day').add(24, 'hour')
                        };
                        itemData.push(newItem);
                    }
                } catch (error) {
                    console.error('Error fetching room detail:', error);
                }
            }

            // Add additional item
            itemData.push({
                id: 1,
                group: 5,
                title: 'item test',
                start_time: moment(),
                end_time: moment().add(36, 'hour')
            });

            setItems(itemData);
            setLoading(false);
        };

        if (accomApproved.length > 0) {
            fetchData();
        }
    }, [accomApproved]);

    console.log(items);
  
    return (
        <div className="calendar-manage">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    Rendered by react!
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
