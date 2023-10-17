import React from 'react';
import { t } from 'i18next';
import './Convenient.scss';

const Convenient = (props) => {
    const row = props.row
    const length = props.listConvenient.length
    const element = [];
    for (let i = 0; i < row; i++) {
        const cutData = props.listConvenient.slice(length*i/row, length*(i+1)/row)
        console.log(length*i/row, length*(i+1)/row)
        element.push(
            <div key={i}
                className= {`col l-${12/row}`}>
                 {cutData.map((convi, index) => (
                        <div className="convenient-item" key={index}>
                            <img src={convi.icon} alt="icon-convenient" className="icon-convenient" />
                            <p style={{ textDecorationLine: `${!convi.isConfig ? 'line-through' : 'none'}` }}>
                                {convi.name}
                            </p>
                        </div>
                    ))}
                
            </div>
        )
    }
    return (
        <div className="convenient-room">
            <div className="row">
               {element}
            </div>
        </div>
    );
};

export default Convenient;
