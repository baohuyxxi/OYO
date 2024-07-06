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
                        className="accordion-summary"
                    >
                        <p className="accordion-summary__title">Tiêu đề nhà/phòng cho thuê</p>
                        <p className="accordion-summary__subtitle">{getValues('accomName')}</p>
                    </AccordionSummary>
                    <AccordionDetails className="accordion-details">
                        <div className="accordion-details__section">
                            <h4 className="accordion-details__title">Tiêu đề nhà/phòng cho thuê</h4>
                            <p className="accordion-details__description">
                                Tiêu đề nhà/phòng cho thuê của bạn cần nổi bật được những điểm đặc biệt của chỗ ở.
                            </p>
                            <input className="accordion-details__input" {...register('accomName')} />
                        </div>

                        <div className="accordion-details__section">
                            <h4 className="accordion-details__title">Mô tả nhà/phòng cho thuê</h4>
                            <p className="accordion-details__description">
                                Hãy giúp khách hình dung về cảm giác khi ở chỗ của bạn, bao gồm cả lý do tại sao họ sẽ
                                thích ở đó.
                            </p>
                            <textarea className="accordion-details__textarea" {...register('description')} />
                        </div>

                        <div className="accordion-details__section">
                            <h4 className="accordion-details__title">Mức giá cố định</h4>
                            <p className="accordion-details__description">
                                Mức giá này sẽ được áp dụng mặc định cho những ngày bình thường.
                            </p>
                            <input
                                className="accordion-details__input"
                                {...register('pricePerNight', { required: 'pricePerNight' })}
                            />
                        </div>

                        <div className="accordion-details__section">
                            <h4 className="accordion-details__title">Diện tích nhà</h4>
                            <p className="accordion-details__description">Diện tích nhà hiện tại của bạn.</p>
                            <input
                                className="accordion-details__input"
                                {...register('acreage', { required: 'acreage' })}
                            />
                        </div>

                        <div className="accordion-details__section">
                            <h4 className="accordion-details__title">Thời gian nhận/trả nhà</h4>
                            <p className="accordion-details__description">Thời gian khách có thể nhận nhà.</p>
                            <input
                                type="time"
                                className="accordion-details__time-input"
                                {...register('checkInFrom', { required: 'checkInFrom' })}
                            />
                            <p className="accordion-details__description">Thời gian khách có thể trả nhà.</p>
                            <input
                                type="time"
                                className="accordion-details__time-input"
                                {...register('checkOutTo', { required: 'checkOutTo' })}
                            />
                        </div>

                        <div className="accordion-details__section">
                            <h4 className="accordion-details__title">Giảm giá</h4>
                            <p className="accordion-details__description">Giá giảm sẽ được áp dụng cho nhà của bạn.</p>
                            <input
                                className="accordion-details__input"
                                {...register('discountPercent', { required: 'discountPercent' })}
                            />
                        </div>

                        <div className="accordion-details__section">
                            <h4 className="accordion-details__title">Các loại phụ phí</h4>
                            <p className="accordion-details__description">
                                Các loại phụ phí này sẽ được áp dụng cho nhà của bạn.
                            </p>

                            {surchargeList.map((charge, index) => (
                                <div key={index} className="accordion-details__charge">
                                    <h4>{charge?.surchargeName}</h4>
                                    <input
                                        className="accordion-details__input"
                                        name={index}
                                        {...register(`SUR_00${index + 1}`)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="accordion-details__section accordion-details__btn">
                            <p onClick={handleClose} className="accordion-details__btn-close">
                                Hủy
                            </p>
                            <button className="accordion-details__btn-save" disabled={isSubmitting}>
                                Lưu
                            </button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    );
}
