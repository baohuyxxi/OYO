import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConvenientItem from '~/components/ConvenientItem/ConvenientItem';
import publicFacilityAPI from '~/services/apis/publicAPI/publicFacilityAPI';
import { useSnackbar } from 'notistack';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';
import { useState, useEffect } from 'react';
import './FacilitySetting.scss';

export default function FacilitySetting() {
    const [expanded, setExpanded] = useState(false);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [dataListCatagoryConvenient, setDataListCategoryConvenient] = useState([]);
    const [facilitiesApply, setFacilitiesApply] = useState([]);
    const facilitiesList = dataListCatagoryConvenient.flatMap((category) => category.infoFacilityList);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        publicFacilityAPI.getAllDataFacility().then((dataResponse) => {
            setDataListCategoryConvenient(dataResponse.data);
        });
        partnerManageAccomAPI.getFacilitiesAccom(params.idHome).then((dataResponse) => {
            const temp = dataResponse.data.facilities.flatMap((result) => {
                return result.facilityCode;
            });
            setFacilitiesApply(temp);
            setLoading(false);
        });
    }, [params?.idHome]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    const nameFacilities = `${
        facilitiesApply.length &&
        facilitiesList.find((item) => item.facilityCode === facilitiesApply[0]) &&
        facilitiesList.find((item) => item.facilityCode === facilitiesApply[0]).facilityName
    }, ${
        facilitiesApply.length &&
        facilitiesList.find((item) => item.facilityCode === facilitiesApply[1]) &&
        facilitiesList.find((item) => item.facilityCode === facilitiesApply[1]).facilityName
    } ....`;

    const handleSave = (e) => {
        e.preventDefault();
        const newData = {
            id: params?.idHome,
            data: {
                facilityCodes: data
            }
        };
        partnerManageAccomAPI
            .updateFacility(newData)
            .then((dataResponse) => {
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
            })
            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };

    return (
        <div style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px', fontWeight: '600' }}>
            <h3>Tiện ích</h3>
            <form onSubmit={handleSave}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <p style={{ width: '33%', flexShrink: 0 }}>Tiện ích</p>
                        <p style={{ color: 'text.secondary' }}>{nameFacilities}</p>
                    </AccordionSummary>

                    <>
                        {loading ? (
                            <></>
                        ) : (
                            <AccordionDetails
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className="container__facilityCate"
                            >
                                {dataListCatagoryConvenient?.map((child, index) => (
                                    <div key={index}>
                                        <ConvenientItem
                                            data={facilitiesApply}
                                            setData={setFacilitiesApply}
                                            dataConveni={child.infoFacilityList}
                                            name={child.faciCateName}
                                        />
                                    </div>
                                ))}
                            </AccordionDetails>
                        )}
                    </>
                    <AccordionDetails>
                        <div className="btn">
                            <p onClick={handleClose} className="btn-close">
                                Hủy
                            </p>
                            <button className="btn-save">Lưu</button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    );
}
