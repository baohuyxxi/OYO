import * as React from 'react';
import { useState } from 'react';
import { t } from 'i18next';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

import ConfirmOwner from '~/pages/partner/ConfirmOwner/ConfirmOwner';
import setupOwnerSlice from '~/pages/partner/SetupOwner/setupOwnerSlice';
import StepperFive from '~/pages/partner/SetupOwner/StepperFive/StepperFive';
import StepperFour from '~/pages/partner/SetupOwner/StepperFour/StepperFour';
import StepperOne from '~/pages/partner/SetupOwner/StepperOne/StepperOne';
import StepperThree from '~/pages/partner/SetupOwner/StepperThree/StepperThree';
import StepperTwo from '~/pages/partner/SetupOwner/StepperTwo/StepperTwo';

import { addressFormData } from '~/share/models/address';
import { typeRoom } from '~/share/models/roomHome';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import LoadingMaster from '../LoadingMaster/LoadingMaster';
import cloudinaryAPI from '~/services/thirdPartyAPI/cloudinaryAPI';

const steps = [
    t('setupOwner.nameStep.one'),
    t('setupOwner.nameStep.two'),
    t('setupOwner.nameStep.three'),
    t('setupOwner.nameStep.four'),
    t('setupOwner.nameStep.five')
];

export default function StepperComponent() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const dispatch = useDispatch();

    const setupRoomHost = useSelector((state) => state.settingowner.detailRoom);

    const { enqueueSnackbar } = useSnackbar();

    const [load, setLoad] = useState(false);

    const [dataStep1, setDataStep1] = useState(addressFormData);

    const [addressDetail, setAddressDetail] = useState('');
    const [guide, setGuide] = useState('');

    const [dataStep2, setDataStep2] = useState(typeRoom);
    const [countGuest, setCountGuest] = useState(1);
    const [accomCate, setAccomCate] = useState('');
    const [dataStep3, setDataStep3] = useState([]);
    const [dataStep4, setDataStep4] = useState([]);
    const [videoIntro, setVideoIntro] = useState(null);
    const [dataStep5, setDataStep5] = useState('');
    const navigate = useNavigate();

    const handleSetAddressDetail = (value) => {
        setAddressDetail(value);
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (activeStep === 0) {
            if (addressDetail !== '' && dataStep1.wardCode !== undefined && dataStep1.wardCode !== null) {
                dispatch(setupOwnerSlice.actions.addAddressRoom(dataStep1));
                dispatch(setupOwnerSlice.actions.addAddressDetailRoom({ addressDetail, guide }));
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                enqueueSnackbar(t('message.addressEmpty'), {
                    anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                    variant: 'warning'
                });
            }
        } else if (activeStep === 1) {
            if (dataStep2.length > 0) {
                dispatch(setupOwnerSlice.actions.setUpRoomOfAccom(dataStep2));
            }
            if (accomCate !== '') dispatch(setupOwnerSlice.actions.addAccomCateName(accomCate));
            if (countGuest !== 0) {
                dispatch(setupOwnerSlice.actions.addNumberOfGuestsRoom(countGuest));
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else if (activeStep === 2) {
            const dataIdList = [];

            for (let i = 0; i < dataStep3.length; i++) {
                if (dataStep3[i]?.label !== undefined) dataIdList.push(dataStep3[i]?.label);
            }
            dispatch(setupOwnerSlice.actions.addamenitiesOfHomeRoom(dataIdList));
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else if (activeStep === 3) {
            if (dataStep4.length < 5) {
                enqueueSnackbar(t('message.maxImage'), {
                    anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                    variant: 'warning'
                });
            } else {
                if (videoIntro !== null) {
                    dispatch(cloudinaryAPI.uploadVideoIntro(videoIntro));
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else if (activeStep === 4) {
            if (
                dataStep5 !== '' &&
                dataStep5?.name !== '' &&
                dataStep5?.description !== '' &&
                dataStep5?.costPerNightDefault !== '' &&
                dataStep5?.acreage !== ''
            ) {
                dispatch(setupOwnerSlice.actions.addInfoOfHomeRoom(dataStep5));
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                enqueueSnackbar(t('message.fullinfo'), {
                    anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                    variant: 'warning'
                });
            }
        }
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSetDataStep3 = (value) => {
        setDataStep3(value);
    };

    const handleSetDataStep5 = (value) => {
        setDataStep5(value);
    };

    const handlePostRoom = (e) => {
        e.preventDefault();
        setLoad(true);
        partnerManageAPI
            .createHomeDetailByHost(setupRoomHost)
            .then((dataResponse) => {
                enqueueSnackbar(t('message.postHomeSuccess'), {
                    anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                    variant: 'success'
                });
                const id = dataResponse.data.id;
                partnerManageAPI.addImageHomeByHost({ imageList: dataStep4, id: id });
                setLoad(false);
                navigate('/congratulation');
                dispatch(setupOwnerSlice.actions.reset());
            })
            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, {
                    anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                    variant: 'error'
                });
                setLoad(false);
            });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <LoadingMaster loadingMaster={load} />
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {
                        completed: undefined
                    };

                    const labelProps = {
                        optional: undefined
                    };
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step
                            key={label}
                            {...stepProps}
                            sx={{ fontSize: '30px', paddingLeft: '30px', paddingRight: '30px' }}
                        >
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <ConfirmOwner imagesOfHome={dataStep4} />
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginRight: '40px' }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handlePostRoom}>Đăng lên</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/* Content */}
                    {(() => {
                        if (activeStep === 0) {
                            return (
                                <StepperOne
                                    setData={setDataStep1}
                                    data={dataStep1}
                                    handleSetAddressDetail={handleSetAddressDetail}
                                    setGuide={setGuide}
                                />
                            );
                        } else if (activeStep === 1) {
                            return (
                                <StepperTwo
                                    dataStep2={dataStep2}
                                    setDataStep2={setDataStep2}
                                    countGuest={countGuest}
                                    setCountGuest={setCountGuest}
                                    accomCate={accomCate}
                                    setAccomCate={setAccomCate}
                                />
                            );
                        } else if (activeStep === 2) {
                            return <StepperThree setDataStep3={handleSetDataStep3} />;
                        } else if (activeStep === 3) {
                            return (
                                <StepperFour
                                    setDataStep4={setDataStep4}
                                    setVideoIntro={setVideoIntro}
                                    dataStep4={dataStep4}
                                    videoIntro={videoIntro}
                                />
                            );
                        } else if (activeStep === 4) {
                            return <StepperFive handleSetDataStep5={handleSetDataStep5} data={dataStep5} />;
                        }
                    })()}
                    <Box sx={{ display: 'flex', pt: 2, position: 'absolute', right: '50px', bottom: '-90vh' }}>
                        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Trở lại
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}</Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
