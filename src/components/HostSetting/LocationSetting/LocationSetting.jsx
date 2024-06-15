import { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectAddress from '~/components/SelectAddress/SelectAddress';
import { decodeAddress } from '~/utils/decodeAddress';
import './LocationSetting.scss';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import { useDispatch } from 'react-redux';
import settingAccomSlice from '~/redux/settingAccomSlice';

export default function LocationSetting(props) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);

    const [address, setAddress] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    useEffect(() => {
        if (props.locationRoom.addressDetail !== undefined) {
            setAddress(decodeAddress(props.locationRoom.addressDetail));
        } else {
            console.error('Invalid address format:', addressParts);
        }
    }, [expanded]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    const onSubmit = () => {
        const newData = {
            data: {
                provinceCode: address.provinceCode,
                districtCode: address.districtCode,
                wardCode: address.wardCode,
                addressDetail: address.addressDetail
            },
            id: params.idHome
        };
        partnerManageAPI
            .updateAddressHome(newData)
            .then((res) => {
                enqueueSnackbar('Cập nhật thành công', {
                    variant: 'success'
                });
                dispatch(settingAccomSlice.actions.setAccom(res.data));
            })
            .catch((err) => {
                enqueueSnackbar(err, {
                    variant: 'error'
                });
            });
    };

    return (
        <div className="container__locationSetting">
            <h3>Vị trí</h3>
            <form onSubmit={onSubmit}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandicon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <p style={{ width: '33%', flexShrink: 0 }}>Địa chỉ chi tiết</p>
                        <p style={{ color: 'text.secondary' }}>{props.locationRoom.addressDetail}</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SelectAddress setData={setAddress} data={address}></SelectAddress>
                        <input
                            className="input-address"
                            value={address?.addressDetail}
                            onChange={(e) => setAddress({ ...address, addressDetail: e.target.value })}
                        />
                        <div className="btn">
                            <p onClick={handleClose} className="btn-close">
                                Hủy
                            </p>
                            <button type="submit" className="btn-save">
                                Lưu
                            </button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    );
}
