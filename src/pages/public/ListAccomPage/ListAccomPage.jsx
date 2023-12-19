import FilterBar from '~/components/FilterBar/FilterBar';
import FramePage from '~/components/FramePage/FramePage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useMemo, useState } from 'react';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import SkeletonRoomItem from '~/components/Skeleton/SkeletonRoomItem';
import RoomItem from '~/components/RoomItem/RoomItem';

const ListAccomPage = () => {
    const [listDataRoom, setListDataRoom] = useState([]);
    const [loading, setLoading] = useState(true);

    const queryParams = useMemo(() => {
        return location.search.slice(1);
    }, [location.search]);

    const [state, setState] = useState({
        items: Array.from({ length: 12 }),
        hasMore: true
    });
 
    useEffect(() => {
        publicAccomPlaceAPI
            .getAllRoomsWithFilter({ queryParams: queryParams, pageNum: 0, pageSize: state.items.length })
            .then((res) => {
                setListDataRoom(res.data.content);
                setLoading(false);
            }).catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
               
            });
    }, [queryParams, state.items.length]);

    const filterData = (listDataNew) => {
        setListDataRoom(listDataNew);
    };

    const fetchMoreData = () => {

        setTimeout(() => {
            if (listDataRoom.length < state.items.length) {
                // Không cần lấy thêm dữ liệu
                setState((prevState) => ({
                    ...prevState,
                    hasMore: false
                }));
                return;
            }

            // Lấy thêm 8 phần tử tiếp theo
            const newItems = Array.from({ length: 8 });
            setState((prevState) => ({
                items: prevState.items.concat(newItems),
                hasMore: true
            }));
        }, 1500);
    };
    return (
        <FramePage>
            <FilterBar
                filterData={filterData}
                queryParams={queryParams}
                pagi={state.items.length}
                dataQueryDefauld={queryParams}
                setLoading={setLoading}
            />
            <div>
                <InfiniteScroll
                    dataLength={listDataRoom.length}
                    next={fetchMoreData}
                    hasMore={state.hasMore}
                    loader={<h4>Loading...</h4>}
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
            </div>
        </FramePage>
    );
};
export default ListAccomPage;
