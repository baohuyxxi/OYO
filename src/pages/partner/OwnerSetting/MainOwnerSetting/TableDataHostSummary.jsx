import { DataGrid } from '@mui/x-data-grid';
// import './TableDataHostSummary.scss';
import { useState, useEffect } from 'react';
import summaryHomeApi from '~/services/apis/partnerAPI/summaryHostApi';
import formatPrice from '~/utils/formatPrice';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import Skeleton from 'react-loading-skeleton';
import { FaSpinner } from 'react-icons/fa';

const TableDataHostSummary = (props) => {
    const [listSelected, setListSelected] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const [rows, setRows] = useState([]);

    const [refreshSelection, setRefreshSelection] = useState(false);
    useEffect(() => {
        const newRows = props.data.map((item, index) => ({
            id: index,
            bookingCode: item.bookingCode,
            nameAccom: item.nameAccom || '',
            nameCustomer: item.nameCustomer || '',
            checkIn: item.checkIn || '',
            checkOut: item.checkOut || '',
            guests: item.numAdult || '1',
            totalBill: item.totalBill ? formatPrice(item.totalBill) : '1 đ',
            totalTransfer: item.totalTransfer ? formatPrice(item.totalTransfer) : '0 đ'
        }));

        setRows(newRows);
    }, [props.data]);

    const handleSelectedChange = (value) => {
        setListSelected(value);
    };

    const handleCheck = () => {
        if (listSelected.length > 1) {
            enqueueSnackbar('Vui lòng chọn từng nhà để thao tác', { variant: 'warning' });
        } else {
            const dataCheckIn = {
                bookingCode: listSelected[0].bookingCode
            };
            if (props.idTab === '0') {
                summaryHomeApi.setCheckIn(listSelected[0].bookingCode).then((res) => {
                    enqueueSnackbar('Check in thành công', { variant: 'success' });
                    if (res.statusCode === 200) {
                        props.setLoad(props.load === false);
                        setRefreshSelection((prev) => !prev);
                    }
                });
            } else if (props.idTab === '1') {
                summaryHomeApi.setCheckOut(listSelected[0].bookingCode).then((res) => {
                    enqueueSnackbar('Check out thành công', { variant: 'success' });
                    if (res.statusCode === 200) {
                        props.setLoad(props.load === false);
                        setRefreshSelection((prev) => !prev);
                    }
                });
            }
        }
    };

    return (
        <div className="listdata_summary">
            <DataTable
                rows={rows}
                listSelected={handleSelectedChange}
                handleCheck={handleCheck}
                idTab={props.idTab}
                refreshSelection={refreshSelection}
            />
        </div>
    );
};

const columns = [
    { field: 'id', headerName: 'STT', width: 70 },

    { field: 'nameAccom', headerName: 'Nhà / phòng cho thuê', width: 260 },
    { field: 'nameCustomer', headerName: 'Tên khách hàng', width: 140 },
    {
        field: 'checkIn',
        headerName: 'Ngày nhận phòng',
        width: 160
    },
    {
        field: 'checkOut',
        headerName: 'Ngày trả phòng',
        width: 160
    },
    {
        field: 'guests',
        headerName: 'Lượng khách',
        width: 120
    },
    { field: 'totalBill', headerName: 'Tổng tiền', width: 130 },
    { field: 'totalTransfer', headerName: 'Đã thanh toán', width: 140 }
];

function DataTable(props) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (props.refreshSelection) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000); // Thời gian chờ 1 giây tương ứng với thời gian của animation CSS
        }
    }, [props.refreshSelection]);
    return (
        <div className="refresh-container" style={{ height: 400, width: '100%', marginBottom: '30px' }}>
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

            <div style={{ height: 400, width: '100%', marginBottom: '30px' }}>
                <DataGrid
                    rows={loading ? [] : props.rows} // Hiển thị một mảng trống khi đang loading
                    key={props.refreshSelection}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    sx={{ fontSize: '17px', overflowX: 'hidden' }}
                    onRowSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = props.rows.filter((row) => selectedIDs.has(row.id));
                        props.listSelected(selectedRows);
                    }}
                />
                {loading && (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <FaSpinner className="spinner" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableDataHostSummary;
