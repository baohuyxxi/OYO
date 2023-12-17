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



    const handleCheck = (id) => {
            if (props.idTab === 'Check In') {
                summaryHomeApi.setCheckIn(id).then((res) => {
                    enqueueSnackbar('Check in thành công', { variant: 'success' });
                    if (res.statusCode === 200) {
                        props.setLoad(props.load === false);
                        setRefreshSelection((prev) => !prev);   
                    }
                });
            } else if (props.idTab === 'Check Out') {
                summaryHomeApi.setCheckOut(id).then((res) => {
                    enqueueSnackbar('Check out thành công', { variant: 'success' });
                    if (res.statusCode === 200) {
                        props.setLoad(props.load === false);
                        setRefreshSelection((prev) => !prev);
                    }
                });
            }
    };

    return (
        <div className="listdata_summary">
            <DataTable
                rows={rows}
                handleCheck={handleCheck}
                idTab={props.idTab}
                refreshSelection={refreshSelection}
            />
        </div>
    );
};

function DataTable(props) {
    const columns = [
        { field: 'id', headerName: 'STT', width: 50 },

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
        { field: 'totalTransfer', headerName: 'Đã thanh toán', width: 140 },
        {
            field: 'CheckIn',
            headerName: 'Check In',
            width: 140,
            renderCell: (params) => (
                <button onClick={(e) => props.handleCheck(params.row.bookingCode)} className="btn-check-status">
                  {props.idTab}
                </button>
            )
        }
    ];

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
            <div style={{ height: 400, width: '100%', marginBottom: '30px' }}>
                <DataGrid
                    rows={loading ? [] : props.rows} // Hiển thị một mảng trống khi đang loading
                    key={props.refreshSelection}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={{ fontSize: '17px', overflowX: 'hidden' }}
                    onRowSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = props.rows.filter((row) => selectedIDs.has(row.id));
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
