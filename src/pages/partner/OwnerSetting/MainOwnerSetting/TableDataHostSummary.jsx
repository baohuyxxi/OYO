import { DataGrid } from '@mui/x-data-grid';
// import './TableDataHostSummary.scss';
import { useState } from 'react';
import summaryHomeApi from '~/services/apis/partnerAPI/summaryHostApi';
import formatPrice from '~/utils/formatPrice';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

const TableDataHostSummary = (props) => {
    const [listSelected, setListSelected] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const rows = [];
    for (var i = 0; i < props.data.length; i++) {
        rows.push({
            id: i,
            idroom: props.data[i].bookingCode,
            name: props.data[i]?.nameAccom ? props.data[i].nameAccom : '',
            nameCustomer: props.data[i]?.nameCustomer ? props.data[i].nameCustomer : '',
            dateStart: props.data[i]?.checkIn ? props.data[i].checkIn : '',
            dateEnd: props.data[i]?.checkOut ? props.data[i].checkOut : '',
            guests: props.data[i]?.numAdult ? props.data[i].numAdult : '1',
            price: props.data[i]?.totalBill ? formatPrice(props.data[i].totalBill) : '1 đ',
            priceBefore: props.data[i]?.totalTransfer ? formatPrice(props.data[i].totalTransfer) : '0 đ'
        });
    }

    const handleSelectedChange = (value) => {
        setListSelected(value);
    };

    const handleCheck = () => {
        if (listSelected.length > 1) {
            enqueueSnackbar('Vui lòng chọn từng nhà để thao tác', { variant: 'warning' });
        } else {
            const dataCheckIn = {
                bookingId: listSelected[0].idroom
            };
            if (props.idTab === '0') {
                summaryHomeApi
                    .setCheckIn(dataCheckIn)
                    .then((dataResponse) => {
                        enqueueSnackbar('Check in thành công', { variant: 'success' });
                        if (props?.setDataCheckIn) {
                            props?.setDataCheckIn(dataCheckIn);
                        }
                    })
                    .catch((error) => {
                        enqueueSnackbar(error.response?.data.message, { variant: 'error' });
                    });
            } else if (props.idTab === '1') {
                summaryHomeApi
                    .setCheckOut(dataCheckIn)
                    .then((dataResponse) => {
                        enqueueSnackbar('Check out thành công', { variant: 'success' });
                    })
                    .catch((error) => {
                        enqueueSnackbar(error.response?.data.message, { variant: 'error' });
                    });
            }
        }
    };

    return (
        <div className="listdata_summary">
            <DataTable rows={rows} listSelected={handleSelectedChange} handleCheck={handleCheck} idTab={props.idTab} />
        </div>
    );
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'idroom', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Nhà / phòng cho thuê', width: 260 },
    { field: 'nameCustomer', headerName: 'Tên khách hàng', width: 140 },
    {
        field: 'dateStart',
        headerName: 'Ngày nhận phòng',
        width: 160
    },
    {
        field: 'dateEnd',
        headerName: 'Ngày trả phòng',
        width: 160
    },
    {
        field: 'guests',
        headerName: 'Lượng khách',
        width: 120
    },
    { field: 'price', headerName: 'Tổng tiền', width: 130 },
    { field: 'priceBefore', headerName: 'Đã thanh toán', width: 140 }
];

function DataTable(props) {
    return (
        <div style={{ height: 400, width: '100%', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                {props?.idTab === '0' ? (
                    <button onClick={props.handleCheck} className="btn-check-status">
                        Check in
                    </button>
                ) : (
                    <button onClick={props.handleCheck} className="btn-check-status">
                        Check out
                    </button>
                )}
            </div>

            <DataGrid
                rows={props.rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                sx={{ fontSize: '17px', overflowX: 'hidden' }}
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRows = props.rows.filter((row) => selectedIDs.has(row.id));
                    props.listSelected(selectedRows);
                }}
            />
        </div>
    );
}

export default TableDataHostSummary;
