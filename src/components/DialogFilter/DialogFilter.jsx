import { Button } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RangePriceFilter from './RangePriceFilter/RangePriceFilter';
// import LocateFilter from "~/components/DialogFilter/LocateFilter/LocateFilter";
import SelectAddress from '../SelectAddress/SelectAddress';
import ListFacilityFilter from './ListFacilityFilter/ListFacilityFilter';
import CountRoomFilter from './CountRoomFilter/CountRoomFilter';
import { useSearchParams } from 'react-router-dom';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import './DialogFilter.scss';
const DialogFilter = (props) => {
    const [searchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState({});
    const [valuePriceRange, setValuePriceRange] = useState([1, 5000000]);
    const [facility, setFacility] = useState([]);
    const [numBathRoom, setNumBathRoom] = useState(0);
    const [numBedRoom, setNumBedRoom] = useState(0);
    const [filter, setFilter] = useState('');
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (searchParams.get('provinceCode')) {
            setAddress({
                provinceCode: searchParams.get('provinceCode')
            });
        }
    }, [searchParams]);

    useEffect(() => {
        let temp = '';
        if (address.provinceCode) {
            temp = `provinceCode=${address.provinceCode}`;
            if (address.districtCode) {
                temp += `&districtCode=${address.districtCode}`;
                if (address.wardCode) {
                    temp += `&wardCode=${address.wardCode}`;
                }
            }
        }
        if (valuePriceRange[0] !== 1 || valuePriceRange[1] !== 5000000) {
            temp += `&priceFrom=${valuePriceRange[0]}&priceTo=${valuePriceRange[1]}`;
        }
        if (facility.length > 0) {
            temp += `&${facility.map((item) => `facilityCode=${item}`).join('&')}`;
        }
        if (numBathRoom > 0) {
            temp += `&numBathRoom=${numBathRoom}`;
        }
        if (numBedRoom > 0) {
            temp += `&numBedRoom=${numBedRoom}`;
        }
        setFilter(temp);
    }, [address, valuePriceRange, facility, numBathRoom, numBedRoom]);
    const handleFilter = () => {
        publicAccomPlaceAPI
            .getAllRoomsWithFilter({ queryParams: filter, pageSize: props?.pagi })
            .then((dataResponse) => {
                props.filterData(dataResponse.data.content);
                handleClose();
            });
    };

    return (
        <div className="dialog-filter">
            <Button variant="outlined" onClick={handleClickOpen} className="btn-show">
                <FilterAltOutlinedIcon/>{t('common.filter')}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="md"
                
            >
                <div className="container__filter paper">
                    <DialogTitle
                        id="alert-dialog-title"
                        sx={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            width: '600px',
                            marginBottom: '20px'
                        }}
                        
                    >
                        {t('common.filter')}
                    </DialogTitle>
                    <DialogContent sx={{ fontSize: '19px', fontWeight: 'bold' }}>
                        {t('common.selectAddressYouWant')}
                        <SelectAddress data={address} setData={setAddress} />
                        <br /> <hr />
                    </DialogContent>
                    <DialogContent sx={{ fontSize: '19px', fontWeight: 'bold' }}>
                        {t('label.priceRange')}
                        <div style={{ marginTop: '30px' }}>
                            <RangePriceFilter values={valuePriceRange} setValues={setValuePriceRange} />
                        </div>
                        <br /> <hr />
                    </DialogContent>
                    <DialogContent sx={{ fontSize: '19px', fontWeight: 'bold' }}>
                        {t('label.convenient')}
                        <ListFacilityFilter data={facility} setData={setFacility} />
                    </DialogContent>

                    <DialogContent sx={{ fontSize: '19px', fontWeight: 'bold' }}>
                        {t('label.room')}
                        <div style={{ marginTop: '30px', marginBottom: '50px' }}>
                            <CountRoomFilter name={t('label.bedroom')} data={numBedRoom} setData={setNumBedRoom} />
                            <CountRoomFilter name={t('label.bathroom')} data={numBathRoom} setData={setNumBathRoom} />
                        </div>
                    </DialogContent>
                </div>

                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="error"
                        sx={{
                            fontSize: '16px',
                            textTransform: 'uppercase'
                        }}
                    >
                        {t('common.close')}
                    </Button>
                    <Button
                        onClick={handleFilter}
                        autoFocus
                        sx={{
                            fontSize: '16px',
                            textTransform: 'uppercase'
                        }}
                    >
                        {t('common.save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default DialogFilter;
