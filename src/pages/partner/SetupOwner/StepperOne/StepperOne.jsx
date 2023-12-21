import { ChangeEvent } from 'react';
import SelectAddress from '~/components/SelectAddress/SelectAddress';
import './StepperOne.scss';
import { t } from 'i18next';
import ConfirmClose from '~/components/ConfirmClose/ConfirmClose';
import location_marker from '~/assets/imageMaster/location_marker.png';

const StepperOne = (props) => {
    const handleChangeAddrees = (event) => {
        if (props?.handleSetAddressDetail) {
            props?.handleSetAddressDetail(event.currentTarget?.value);
        }
    };

    return (
        <div className="step-one">
            <div className="row">
                <div className="col l-6 m-6 c-6">
                    <div className="require-step1">
                        <img src={location_marker} height={400} alt="" className="image-step1" />
                        <h1>{t('setupOwner.content_step_one')}</h1>
                    </div>
                </div>
                <div className="col l-6 m-6 c-6">
                    <div className="box-address">
                        <label>{t('label.address')}</label>
                        <SelectAddress setData={props.setData} data={props.data} />
                        <p className="span-address-step1">{t('contentMess.address')}</p>
                        <input
                            name="input-address-step1"
                            type="text"
                            className="input-address-step1"
                            onChange={handleChangeAddrees}
                            required
                        />
                        <ConfirmClose />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepperOne;
