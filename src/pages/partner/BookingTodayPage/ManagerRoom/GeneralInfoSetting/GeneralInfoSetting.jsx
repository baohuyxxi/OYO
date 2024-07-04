import { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import './GeneralInfoSetting.scss';
import { useParams } from 'react-router-dom';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';

export default function GeneralInfoSetting({ accomId }) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { isSubmitting }
    } = useForm();
    const [surchargeList, setSurchargeList] = useState([]);
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    useEffect(() => {
        partnerManageAccomAPI.getGeneralInfo(accomId).then((dataResponse) => {
            setValue('accomName', dataResponse?.data?.nameAccom);
            setValue('description', dataResponse?.data?.description);
            setValue('acreage', dataResponse?.data?.acreage);
            setValue('pricePerNight', dataResponse?.data?.pricePerNight);
            setValue('checkInFrom', dataResponse?.data?.checkInFrom);
            setValue('checkOutTo', dataResponse?.data?.checkOutTo);
            setSurchargeList(dataResponse?.data?.surchargeList);
            setValue('SUR_001', dataResponse?.data?.surchargeList[0].cost);
            setValue('SUR_002', dataResponse?.data?.surchargeList[1].cost);
            setValue('SUR_003', dataResponse?.data?.surchargeList[2].cost);
            setValue('discountPercent', dataResponse?.data?.discountPercent);
        });
    }, [accomId]);

    const onSubmit = (data) => {
        const newData = {
            data: {
                accomName: data.accomName,
                description: data.description,
                pricePerNight: data.pricePerNight,
                acreage: data.acreage,
                checkInFrom: data.checkInFrom,
                checkOutTo: data.checkOutTo,
                discountPercent: data.discountPercent,
                surchargeList: [
                    {
                        surchargeCode: 'SUR_001',
                        cost: data.SUR_001
                    },
                    {
                        surchargeCode: 'SUR_002',
                        cost: data.SUR_002
                    },
                    {
                        surchargeCode: 'SUR_003',
                        cost: data.SUR_003
                    }
                ]
            },
            id: params.idHome
        };

        partnerManageAccomAPI
            .updateGeneralInfo(newData)
            .then((res) => {
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
                dispatch(settingAccomSlice.actions.setAccom(res.data));
            })
            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };

    return (
        <div style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px' }}>
            <h3>Thông tin chung</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <p style={{ width: '33%', flexShrink: 0, fontWeight: '600' }}>Tiêu đề nhà/phòng cho thuê</p>
                        <p style={{ color: 'text.secondary', fontWeight: '600' }}>{getValues('accomName')}</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="content-input">
                            <h4>Tiêu đề nhà/phòng cho thuê</h4>
                            <p>Tiêu đề nhà/phòng cho thuê của bạn cần nổi bật được những điểm đặc biệt của chỗ ở.</p>
                            <input className="input-info" {...register('accomName')} />
                        </div>

                        <div className="content-input">
                            <h4>Mô tả nhà/phòng cho thuê</h4>
                            <p>
                                Hãy giúp khách hình dung về cảm giác khi ở chỗ của bạn, bao gồm cả lý do tại sao họ sẽ
                                thích ở đó.
                            </p>
                            <textarea className="text-input" {...register('description')} />
                        </div>

                        {/* <div className="content-input">
                            <h4>Hướng dẫn nhà/phòng cho thuê</h4>
                            <p>Thêm hướng dẫn cho nơi ở của bạn để khách có thể dể dàng tiếp cận hơn.</p>
                            <textarea className="text-input" {...register('guide')} />
                        </div> */}

                        <div className="content-input">
                            <h4>Mức giá cố định</h4>
                            <p>Mức giá này sẽ được áp dụng mặc định cho những ngày bình thường.</p>
                            <input
                                className="input-info"
                                {...register('pricePerNight', {
                                    required: 'pricePerNight'
                                })}
                            />
                        </div>

                        <div className="content-input">
                            <h4>Diện tích nhà</h4>
                            <p>Diện tích nhà hiện tại của bạn.</p>
                            <input
                                className="input-info"
                                {...register('acreage', {
                                    required: 'acreage'
                                })}
                            />
                        </div>

                        <div className="content-input">
                            <h4>Thời gian nhận/trả nhà</h4>
                            <p>Thời gian khách có thể nhận nhà.</p>
                            <input
                                type="time"
                                className="info__input"
                                {...register('checkInFrom', {
                                    required: 'checkInFrom'
                                })}
                            />

                            <p>Thời gian khách có thể trả nhà.</p>
                            <input
                                type="time"
                                className="info__input"
                                {...register('checkOutTo', {
                                    required: 'checkOutTo'
                                })}
                            />
                        </div>

                        <div className="content-input">
                            <h4>Giảm giá</h4>
                            <p>Giá giảm sẽ được áp dụng cho nhà của bạn.</p>
                            <input
                                className="input-info"
                                {...register('discountPercent', {
                                    required: 'discountPercent'
                                })}
                            />
                        </div>

                        <div className="content-input-discount">
                            <h4>Các loại phụ phí</h4>
                            <p>Các loại phụ phí này sẽ được áp dụng cho nhà của bạn</p>

                            {surchargeList.map((charge, index) => (
                                <div key={index} className="content-input">
                                    <h4>{charge?.surchargeName}</h4>
                                    <input className="input-info" name={index} {...register(`SUR_00${index + 1}`)} />
                                </div>
                            ))}
                        </div>

                        {/* <div className="content-input">
                            <h4>Chính sách hoàn tiền cho căn nhà của bạn</h4>
                            <p>Thời gian được phép hủy</p>
                            <select className="input-info">
                                <option value="value1">Trước 1 ngày</option>
                                <option value="value2">Trước 2 ngày</option>
                                <option value="value3">Trước 3 ngày</option>
                                <option value="value2">Trước 5 ngày</option>
                                <option value="value2">Trước 1 tuần</option>
                            </select>
                            <p>Phí hủy</p>
                            <select className="input-info">
                                <option value="value1">5%</option>
                                <option value="value2">10%</option>
                                <option value="value3">15%</option>
                                <option value="value2">20%</option>
                                <option value="value2">25%</option>
                                <option value="value2">50%</option>
                                <option value="value2">Không hoàn trả</option>
                            </select>
                        </div> */}
                        <div className="btn">
                            <p onClick={handleClose} className="btn-close">
                                Hủy
                            </p>
                            <button className="btn-save" disabled={isSubmitting}>
                                Lưu
                            </button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    );
}
