import {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SelectedLocate from '~/pages/partner/SetupOwner/StepperOne/SelectedLocate';
import SelectAddress from '~/components/SelectAddress/SelectAddress';
import './LocationSetting.scss';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { addressFormData } from '~/share/models/address';
import { useParams } from 'react-router-dom';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';

export default function LocationSetting(props) {
    const [expanded, setExpanded] = useState(false);
    const [address, setAddress] = useState(addressFormData);
    const [idProvince, setIdProvince] = useState('');

    const { handleSubmit, register, setValue } = useForm();

    const params = useParams();

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    const [nameProvince, setNameProvince] = useState('');
    useEffect(() => {
        if (props?.locationRoom.localName) {
            setNameProvince(props.locationRoom.localName);
        }
    }, [props.locationRoom.localName]);

    useEffect(() => {
        setValue('address', props?.locationRoom.address);
    }, [props.locationRoom.address, setValue]);

    const onSubmit= (dataAddress) => {
        const newData = {
            data: {
                address: dataAddress.address,
                provinceCode: idProvince,
            },
            id: params.idHome, 
        };
        partnerManageAPI
            .updateAddressHome(newData)
            .then((dataResponse) => {
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
            })
            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };

    return (
        <div style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px' }}>
            <h3>Vị trí</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <p style={{ width: '33%', flexShrink: 0 }}>Địa chỉ</p>
                        <p style={{ color: 'text.secondary' }}>{nameProvince}</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SelectAddress setData={setAddress} data ={address}></SelectAddress>

                        <input className="input-address" {...register('address')} />
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
