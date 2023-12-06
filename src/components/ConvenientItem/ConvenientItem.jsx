import './ConvenientItem.scss';

import CheckButton from '../CheckButton/CheckButton';

const ConvenientItem = (props) => {
    return (
        <div className="convenient-item">
            <div className="title-item">
                <h1
                    onClick={() => {
                      
                    }}
                >
                    {props?.name}
                </h1>
                {/* <span>{PopularConvenient.desc}</span> */}
            </div>
            <div className="container">
                {props.dataConveni?.map((item, index) => (
                    <>
                        <div key={index} className="item">
                            <CheckButton
                                active={props.data.includes(item.facilityCode)}
                                code={item.facilityCode}
                                data={props.data}
                                setData={props.setData}
                            />
                            <p>{item.facilityName}</p>
                        </div>
                        <hr />
                    </>
                ))}
            </div>
        </div>
    );
};

export default ConvenientItem;
