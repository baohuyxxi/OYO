import './AddForm.scss';

import { useForm } from 'react-hook-form';

const AddForm = (props) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        if (props.addDataNew) {
            props.addDataNew(data);
            reset();
        }
    };

    return (
        <div className="add-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    {props?.fieldData?.map((item, index) => (
                        <div className="col l-6 key-col" key={index}>
                            <h2 className="title-field">{item.title}</h2>
                            <input
                                type="text"
                                className="add-form__input"
                                placeholder={item.placeholder}
                                {...register(item.nameRegister, {
                                    required: item.nameRequire
                                })}
                            />
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

export default AddForm;
