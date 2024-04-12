import './Amenities.scss';
import ListFacilityByCategory from '~/components/DialogFilter/ListFacilityFilter/ListFacilityByCategory/ListFacilittByCategory';
import publicFacilityAPI from '~/services/apis/publicAPI/publicFacilityAPI';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createAccomSlice from '~/redux/createAccomSlice';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
export default function Amenities({ id, save, doneSave }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [facilityCateList, setFacilityCateList] = useState(null);
    useEffect(() => {
        publicFacilityAPI.getAllDataFacility().then((res) => {
            setFacilityCateList(res.data);
        });
        if (id) {
            partnerCreateAccomAPI.getFacilitiesAccom(id).then((res) => {
                setData(res.data.facilities.map((item) => item.facilityCode));
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        if (save) {
            partnerCreateAccomAPI.updateFacilitiesAccom({ id, data }).then((res) => {
                doneSave();
            });
            doneSave();
        }
    }, [save]);

    const firstHalf = facilityCateList?.slice(0, Math.ceil(facilityCateList.length / 2));
    const secondHalf = facilityCateList?.slice(Math.ceil(facilityCateList.length / 2));

    const setFacility = (facility) => {
        setData(facility);
    };
    console.log(data);

    useEffect(() => {
        if (save) {
            partnerCreateAccomAPI.updateFacilitiesAccom({ id, data }).then((res) => {
                console.log(res);
            });
            doneSave();
        }
    }, [save]);
    return (
        <div className="amenities row">
            <div className="col l-6">
                {firstHalf?.map((current, index) => (
                    <ListFacilityByCategory
                        key={index}
                        data={data}
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
                        data={data}
                        setData={setFacility}
                        facilityList={current.infoFacilityList}
                        facilityCateName={current.faciCateName}
                    />
                ))}
            </div>
        </div>
    );
}
