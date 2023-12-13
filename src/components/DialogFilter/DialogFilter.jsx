import { Button } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RangePriceFilter from './RangePriceFilter/RangePriceFilter';
// import LocateFilter from "~/components/DialogFilter/LocateFilter/LocateFilter";
import SelectAddress from '../SelectAddress/SelectAddress';
import ListFacilityFilter from './ListFacilityFilter/ListFacilityFilter';
import CountRoomFilter from './CountRoomFilter/CountRoomFilter';
import { addressFormData } from '~/share/models/address';
import './DialogFilter.scss';

const DialogFilter = () => {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState({});
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    console.log(address)
    return (
        <div className="dialog-filter">
            <Button variant="outlined" onClick={handleClickOpen} className="btn-show">
                Bộ lọc
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
                        Chọn tỉnh thành bạn muốn đến
                        <SelectAddress data={address} setData={setAddress} />
                        <br /> <hr />
                    </DialogContent>
                    <DialogContent sx={{ fontSize: '19px', fontWeight: 'bold' }}>
                        {t('label.priceRange')}
                        <div style={{ marginTop: '30px' }}>
                            <RangePriceFilter />
                        </div>
                        <br /> <hr />
                    </DialogContent>
                    <DialogContent sx={{ fontSize: '19px', fontWeight: 'bold' }}>
                        {t('label.convenient')}
                        <ListFacilityFilter />
                    </DialogContent>

                    <DialogContent sx={{ fontSize: '19px', fontWeight: 'bold' }}>
                        {t('label.room')}
                        <div style={{ marginTop: '30px', marginBottom: '50px' }}>
                            <CountRoomFilter name={t('label.bedroom')} />
                            <CountRoomFilter name={t('label.bed')} />
                            <CountRoomFilter name={t('label.bathroom')} />
                        </div>
                        <hr />
                    </DialogContent>
                </div>
                <div
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        marginBottom: '33px',
                        width: '885px'
                    }}
                >
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            color="error"
                            sx={{
                                fontSize: '16px',
                                textTransform: 'uppercase'
                            }}
                        >
                            CLOSE
                        </Button>
                        <Button
                            // onClick={handleFilter}
                            autoFocus
                            sx={{
                                fontSize: '16px',
                                textTransform: 'uppercase'
                            }}
                        >
                            OK
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
};
export default DialogFilter;
