import { useState, useEffect } from 'react';
import ListFacilityByCategory from './ListFacilityByCategory/ListFacilittByCategory';
import publicFacilityAPI from '~/services/apis/publicAPI/publicFacilityAPI';

const ListFacilityFilter = () => {
    const [facilityCateList, setFacilityCateList] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const res = await publicFacilityAPI.getAllDataFacility();
            setFacilityCateList(res.data);
        }
        fetchData();
    }, []);
    return (
        <div style={{ marginTop: '30px' }}>
            {/* {listAccomCateData?.map((current, index) => (
        <div key={index}>
          <div
            className={`slider__item-filter`}
            onClick={() => handleFilter(index, filter?.id)}
          >
            <div className="icon-filter">
              <img src={current?.icon} alt="icon-filter" />
            </div>
            <div className="title-filter">
              <p>{current?.accomCateName}</p>
            </div>
          </div>
        </div>
      ))} */}
            {/* {facilityCateList?.map((current, index) => (
                <div key={index}>
                    <ListFacilityByCategory
                        facilityList={current.facilityListName}
                        facilityCateName={current.faciCateName}
                    />
                </div>
            ))} */}
        </div>
    );
};
export default ListFacilityFilter;
