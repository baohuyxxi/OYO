import './AddFormFacility.scss';
import { useEffect, useState, useRef } from 'react';

import { useForm } from 'react-hook-form';

const renderItem = ({ item, dataFacilityCategory, setValue, register }) => {
    const handleChangeFaciCateName = (e) => {
        const faciCateName = e.target.value;
        const faciCateCode =
            dataFacilityCategory.find((item) => item.faciCateName === faciCateName)?.faciCateCode ||
            'Mã loại tiện ích tương ứng';
        console.log(faciCateCode);
        setValue('facilityCateCode', faciCateCode);
    };

    switch (item.nameRegister) {
        case 'status':
            return (
                <select {...register(item.nameRegister, { required: item.nameRequire })} className="add-form__select">
                    <option value="">Chọn trạng thái</option>
                    <option value="ENABLE">ENABLE</option>
                    <option value="DISABLE">DISABLE</option>
                </select>
            );
        case 'facilityCateName':
            return (
                <select
                    {...register(item.nameRegister, {
                        required: item.nameRequire,
                        onChange: (e) => handleChangeFaciCateName(e)
                    })}
                    className="add-form__select"
                >
                    <option value="">Chọn loại tiện ích</option>
                    {dataFacilityCategory.map((itemFaciCate, index) => (
                        <option value={itemFaciCate.faciCateName} key={index}>
                            {itemFaciCate.faciCateName}
                        </option>
                    ))}
                </select>
            );
        case 'facilityCateCode':
            return (
                <input
                    type="text"
                    className="add-form__input"
                    {...register(item.nameRegister)}
                    disabled
                    placeholder={item.placeholder}
                />
            );
        default:
            return (
                <input
                    type="text"
                    className="add-form__input"
                    placeholder={item.placeholder}
                    {...register(item.nameRegister, {
                        required: item.nameRequire
                    })}
                />
            );
    }
};

const AddFormFacility = (props) => {
    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        if (props.addDataNew) {
            props.addDataNew(data);
            reset();
        }
    };

    return (
        <div className="add-form-facility">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    {props?.fieldData?.map((item, index) => (
                        <div className="col l-6 key-col" key={index}>
                            <h2 className="title-field">{item.title}</h2>
                            {renderItem({
                                item,
                                dataFacilityCategory: props.dataFacilityCategory,
                                register,
                                setValue
                            })}
                            {errors[item.nameRegister] && (
                                <span className="message_error">{`${
                                    errors[item.nameRegister] && errors[item.nameRegister]?.message
                                }`}</span>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn-save_newdata">
                    Thêm mới
                </button>
            </form>
        </div>
    );
};

export default AddFormFacility;
