import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ConvenientItem from '~/components/ConvenientItem/ConvenientItem';
import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';
import ScrollspyComponent from '~/components/Scrollspy/Scrollspy';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import publicFacilityAPI from '~/services/apis/publicAPI/publicFacilityAPI';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
const infoLink = {
    name: 'Tiện nghi',
    urlLink: '/host/setting/convenient'
};

const backUrl = '/host/setting';

var item = [''];

var children = [];

const ConvenientOwnerSetting = () => {
    const [loading, setLoading] = useState(true);
    const [dataListCatagoryConvenient, setDataListCategoryConvenient] = useState([]);
    const [data, setData] = useState([]);
    const params = useParams();
    console.log(data)
    useEffect(() => {
        publicFacilityAPI.getAllDataFacility().then((dataResponse) => {
            setDataListCategoryConvenient(dataResponse.data);
        });
        publicAccomPlaceAPI.getRoomDetail(params.idHome).then((res) => {
            const temp = res.data.facilityCategoryList.flatMap((result) => {
                return result.infoFacilityList.flatMap((code) => {
                    return code.facilityCode;
                });
            });
            setData(temp);
            setLoading(false);
        });
    }, [params?.idHome]);
    useEffect(() => {
        for (var i = 0; i < dataListCatagoryConvenient.length; i++) {
            let indexTemp = i + 1;
            const temp = {
                id: `#section${indexTemp}`,
                to: `section${indexTemp}`,
                info: dataListCatagoryConvenient[i]?.faciCateName,
                comp: (
                    <ConvenientItem
                        data={data}
                        setData={setData}
                        dataConveni={dataListCatagoryConvenient[i]?.infoFacilityList}
                        name={dataListCatagoryConvenient[i].faciCateName}
                    />
                )
            };

            if (!children.some((person) => person.id === temp.id)) {
                children.push(temp);
                item.push(`section${indexTemp}`);
            }
        }
    }, [data]);

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <div className="owner-convenient__setting">
                    <NavbarOwner />
                    <ScrollspyComponent
                        children={children}
                        item={item}
                        infoLink={infoLink}
                        backUrl={backUrl}
                        childrenData={dataListCatagoryConvenient}
                    />
                </div>
              
            )}
        </>
    );
};

export default ConvenientOwnerSetting;
