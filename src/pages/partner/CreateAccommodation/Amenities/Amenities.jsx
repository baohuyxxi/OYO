import './Amenities.scss';
import ListFacilityByCategory from '~/components/DialogFilter/ListFacilityFilter/ListFacilityByCategory/ListFacilittByCategory';
import publicFacilityAPI from '~/services/apis/publicAPI/publicFacilityAPI';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createAccomSlice from '~/redux/createAccomSlice';
export default function Amenities({createAccom}) {
    console.log(createAccom);
    const dispatch = useDispatch();

    const [facilityCateList, setFacilityCateList] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const res = await publicFacilityAPI.getAllDataFacility();
            setFacilityCateList(res.data);
        }
        fetchData();
    }, []);
    const firstHalf = facilityCateList?.slice(0, Math.ceil(facilityCateList.length / 2));
    const secondHalf = facilityCateList?.slice(Math.ceil(facilityCateList.length / 2));

    const setFacility = (facility) => {
        dispatch(createAccomSlice.actions.setFacilityNameList(facility));
    }
    return (
        <div className="amenities row">
           <div className="col l-6">
                {firstHalf?.map((current, index) => (
                    <ListFacilityByCategory
                        key={index}
                        data={createAccom.facilityNameList}
                        setData={setFacility}
                        facilityList={current.infoFacilityList}
                        facilityCateName={current.faciCateName}
                    />
                ))}
            </div>
            <div className="col l-6">
                {secondHalf?.map((current, index) => (
                    <ListFacilityByCategory
                        key={index}
                        data={createAccom.facilityNameList}
                        setData={setFacility}
                        facilityList={current.infoFacilityList}
                        facilityCateName={current.faciCateName}
                    />
                ))}
            </div>
        </div>
    );
}
