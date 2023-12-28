import FilterBar from '~/components/FilterBar/FilterBar';
import FramePage from '~/components/FramePage/FramePage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useMemo, useState } from 'react';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import SkeletonRoomItem from '~/components/Skeleton/SkeletonRoomItem';
import RoomItem from '~/components/RoomItem/RoomItem';
import loader from '~/assets/video/loader.gif';
import { transLateListTitle } from '~/services/apis/translateAPI/translateAPI';
import { useSelector, useDispatch } from 'react-redux';
import filterAcomSlice from '~/redux/filterAccom';
import './ListAccomPage.scss';
const ListAccomPage = () => {
    const [listDataRoom, setListDataRoom] = useState([]);
    const [queryParams, setQueryParams] = useState(false);
    const filterAccom = useSelector((state) => state.filterAccom);
    const dispatch = useDispatch();
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
        if (filterAccom?.facilityCode.length > 0) {
            query += `${filterAccom.facilityCode.map((item) => `facilityCode=${item}`).join('&')}`;
        }
        setQueryParams(query);
    }, [filterAccom]);
    const [state, setState] = useState({
        items: Array.from({ length: 0 }),
        hasMore: true
    });

    useEffect(() => {
        if (queryParams !== false) {
            publicAccomPlaceAPI
                .getAllRoomsWithFilter({ queryParams: queryParams, pageNum: state.items.length, pageSize: 8 })
                .then(async (res) => {
                    const data = await Promise.all(
                        res.data.content.flatMap((item) => {
                            return transLateListTitle(item);
                        })
                    );
                    if (state.items.length === 0) {
                        setListDataRoom(data);
                    } else {
                        setListDataRoom((prevState) => prevState.concat(data));
                    }
                    if (data.length === 0) {
                        dispatch(filterAcomSlice.actions.setMaxed(true));
                        setState((prevState) => ({
                            ...prevState,
                            hasMore: false
                        }));
                    } else {
                        dispatch(filterAcomSlice.actions.setMaxed(false));
                    }
                    dispatch(filterAcomSlice.actions.setLoading(false));
                })
                .catch((error) => {
                    dispatch(filterAcomSlice.actions.setLoading(false));
                });
        }
    }, [queryParams, state.items.length, filterAccom.loading]);

    const filterData = (listDataNew) => {
        setListDataRoom(listDataNew);
    };
    const fetchMoreData = () => {
        if (filterAccom.maxed === false) {
            setState((prevState) => ({
                items: prevState.items.concat(Array.from({ length: 1 })),
                hasMore: true
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                hasMore: false
            }));
        }
    };
    return (
        <FramePage>
            <FilterBar
                filterData={filterData}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                pagi={state.items.length}
                dataQueryDefauld={queryParams}
                setState={setState}
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
                    {filterAccom.loading ? (
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
