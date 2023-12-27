import FilterBar from '~/components/FilterBar/FilterBar';
import FramePage from '~/components/FramePage/FramePage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useMemo, useState } from 'react';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import SkeletonRoomItem from '~/components/Skeleton/SkeletonRoomItem';
import RoomItem from '~/components/RoomItem/RoomItem';
import loader from '~/assets/video/loader.gif';
import { transLateListTitle } from '~/services/apis/translateAPI/translateAPI';
import { useSelector } from 'react-redux';
import './ListAccomPage.scss';
const ListAccomPage = () => {
    const [listDataRoom, setListDataRoom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [queryParams, setQueryParams] = useState(false);
    const filterAccom = useSelector((state) => state.filterAccom);
    useEffect(() => {
        const fildeFiler = [
            'provinceCode',
            'districtCode',
            'wardCode',
            'priceFrom',
            'priceTo',
            'numBathRoom',
            'numBedRoom',
            'accomCateName'
        ];
        let query = '';
        fildeFiler.forEach((item) => {
            if (filterAccom[item]) {
                query += `${item}=${filterAccom[item]}&`;
            }
        });
        if(filterAccom?.facilityCode.length > 0){
            query += `${filterAccom.facilityCode.map((item) => `facilityCode=${item}`).join('&')}`;
        }
        setQueryParams(query);
    }, [filterAccom]);
    console.log(queryParams);
    const [state, setState] = useState({
        items: Array.from({ length: 8 }),
        hasMore: true
    });
    console.log(state.items.length);

    useEffect(() => {
        if (queryParams !== false) {
            publicAccomPlaceAPI
                .getAllRoomsWithFilter({ queryParams: queryParams, pageNum: 0, pageSize: state.items.length })
                .then(async (res) => {
                    const data = await Promise.all(
                        res.data.content.flatMap((item) => {
                            return transLateListTitle(item);
                        })
                    );
                    setListDataRoom(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy dữ liệu:', error);
                    setLoading(false);
                }); 
        }
    }, [queryParams, state.items.length]);

    const filterData = (listDataNew) => {
        setListDataRoom(listDataNew);
    };

    const fetchMoreData = () => {
        setTimeout(() => {
            if (listDataRoom.length < state.items.length) {
                setState((prevState) => ({
                    ...prevState,
                    hasMore: false
                }));
                return;
            }

            const newItems = Array.from({ length: 4 });
            setState((prevState) => ({
                items: prevState.items.concat(newItems),
                hasMore: true
            }));
        }, 1000);
    };
    return (
        <FramePage>
            <FilterBar
                filterData={filterData}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                pagi={state.items.length}
                dataQueryDefauld={queryParams}
                setLoading={setLoading}
            />

            <InfiniteScroll
                dataLength={listDataRoom.length}
                next={fetchMoreData}
                hasMore={state.hasMore}
                loader={
                    <div className="loader">
                        <img src={loader} alt="loading..." className="image__loader" />
                    </div>
                }
                scrollableTarget="scrollableDiv"
                style={{ paddingTop: '10px', zIndex: '-1', margin: '0 100px' }}
            >
                <div className="row" style={{ margin: 0 }}>
                    {loading ? (
                        <SkeletonRoomItem />
                    ) : (
                        listDataRoom.map((room, index) => <RoomItem key={index} infoRoom={room} />)
                    )}
                </div>
            </InfiniteScroll>
        </FramePage>
    );
};
export default ListAccomPage;
