import { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import settingAccomSlice from '~/redux/settingAccomSlice';
import './TitleSetting.scss';
import { useParams } from 'react-router-dom';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';

export default function TittleSetting(props) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { isSubmitting }
    } = useForm();
    const [refundTitle, setRefundTitle] = useState('');

    const params = useParams();

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    useEffect(() => {
        setValue('accomName', props?.infoRoom?.accomName);
        setValue('description', props.infoRoom.description);
        setValue('guide', props.infoRoom.guide);
        setValue('refundPolicy', props.infoRoom.refundPolicy);
        if (props.infoRoom.refundPolicy === 'BEFORE_ONE_DAY') {
            setValue('refundPolicy', 'Trước 1 ngày');
            setRefundTitle('Trước 1 ngày');
        } else if (props.infoRoom.refundPolicy === 'NO_REFUND') {
            setValue('refundPolicy', 'Không hoàn tiền');
            setRefundTitle('Không hoàn tiền');
        } else if (props.infoRoom.refundPolicy === 'BEFORE_SEVEN_DAYS') {
            setValue('refundPolicy', 'Trước 7 ngày');
            setRefundTitle('Trước 7 ngày');
        }
    }, [
        props.infoRoom.accomName,
        props.infoRoom.description,
        props.infoRoom.guide,
        props.infoRoom.refundPolicy,
        setValue
    ]);

    const onSubmit = (data) => {
        if (
            data.refundPolicy === 'Trước 1 ngày' ||
            data.refundPolicy === 'Không hoàn tiền' ||
            data.refundPolicy === 'Trước 7 ngày'
        ) {
            var tempRefund = '';
            if (data.refundPolicy === 'Trước 1 ngày') {
                tempRefund = 'BEFORE_ONE_DAY';
            } else if (data.refundPolicy === 'Không hoàn tiền') {
                tempRefund = 'NO_REFUND';
            } else if (data.refundPolicy === 'Trước 7 ngày') {
                tempRefund = 'BEFORE_SEVEN_DAYS';
            }
            const newData = {
                data: {
                    nameAccom: data.accomName,
                    description: data.description,
                    guide: data.guide,
                    refundPolicy: tempRefund
                },
                id: params.idHome
            };
            partnerManageAccomAPI
                .updateTitleHome(newData)
                .then((res) => {
                    enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
                    dispatch(settingAccomSlice.actions.setAccom(res.data));
                })
                .catch((error) => {
                    enqueueSnackbar(error.response?.data.message, { variant: 'error' });
                });
        } else {
            enqueueSnackbar('Vui lòng điền đúng format của chính sách hoàn tiền', { variant: 'warning' });
        }
    };

    return (
        <div style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px' }}>
            <h3>Thông tin cơ bản</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <p style={{ width: '33%', flexShrink: 0, fontWeight: '600' }}>Tiêu đề phòng cho thuê</p>
                        <p style={{ color: 'text.secondary', fontWeight: '600' }}>{props?.infoRoom?.accomName}</p>
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

                        <div className="content-input">
                            <h4>Hướng dẫn nhà/phòng cho thuê</h4>
                            <p>Thêm hướng dẫn cho nơi ở của bạn để khách có thể dể dàng tiếp cận hơn.</p>
                            <textarea className="text-input" {...register('guide')} />
                        </div>

                        {/* <div className="content-input">
                            <h4>Chính sách hoàn tiền cho căn nhà của bạn</h4>
                            <p>Vui lòng điền theo mẫu: Không hoàn tiền, Trước 1 ngày, Trước 7 ngày</p>
                            <input className="input-info" {...register('refundPolicy')} />
                        </div> */}
                        <div className="content-input">
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
                        </div>
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
