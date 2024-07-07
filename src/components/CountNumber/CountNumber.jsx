import { useState, useEffect } from 'react';
import './CountNumber.scss';

const CountNumber = (props) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setCounter(props.number);
    }, [props.number]);

    const handleIncrease = () => {
        setCounter((prevState) => prevState + 1);
        const existingItem = props.data.find((item) => item.key === props.keyType);
        if (!existingItem) {
            props.setData([...props.data, { key: props.keyType, number: counter + 1 }]);
        } else {
            const updatedData = props.data.map((item) =>
                item.key === props.keyType ? { ...item, number: counter + 1 } : item
            );
            props.setData(updatedData);
        }
    };

    const handleReduce = () => {
        setCounter((prevState) => prevState - 1);
        const existingItem = props.data.find((item) => item.key === props.keyType);
        if (existingItem) {
            const updatedData = props.data.map((item) =>
                item.key === props.keyType ? { ...item, number: counter - 1 } : item
            );
            props.setData(updatedData);
        }
    };

    return (
        <div className="count-number">
            <button
                type='button'
                onClick={handleReduce}
                className={`count-number__button ${counter === 0 ? 'count-number__button--disabled' : 'count-number__button--reduce'}`}
                disabled={counter === 0}
            >
                -
            </button>
            <h1 className="count-number__counter">{counter}</h1>
            <button
                type='button'
                onClick={handleIncrease}
                className="count-number__button count-number__button--increase"
            >
                +
            </button>
        </div>
    );
};

export default CountNumber;
