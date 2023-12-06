import { useState , useEffect} from 'react';
import './CountNumber.scss';

const CountNumber = (props) => {
    const [counter, setCounter] = useState(0);
    useEffect(()=>
    {
        setCounter(props.number)
    },[props.number])
    const handleIncrease = () => {
        setCounter((preState) => preState + 1);

        // Placeholder logic, update state or data based on key existence
        const existingItem = props.data.find((person) => person.key === props.keyType);
        if (!existingItem) {
            // Key does not exist, handle accordingly
            props.setData([...props.data, { key: props.keyType, number: counter + 1 }]);
        } else {
            // Key exists, update the existing item
            const updatedData = props.data.map((item) =>
                item.key === props.keyType ? { ...item, number: counter + 1 } : item
            );
            props.setData(updatedData);
        }
    };
    const handleReducer = () => {
        setCounter((preState) => preState - 1);

        // Placeholder logic, update state or data based on key existence
        const existingItem = props.data.find((person) => person.key === props.keyType);
        if (!existingItem) {
            // Key does not exist, handle accordingly
            // You might want to prevent the counter from going negative, based on your requirements
        } else {
            // Key exists, update the existing item
            const updatedData = props.data.map((item) =>
                item.key === props.keyType ? { ...item, number: counter - 1 } : item
            );
            props.setData(updatedData);
        }
    };

    return (
        <div className="count-number">
            {counter === 0 ? (
                <button className="btn-notallow">-</button>
            ) : (
                <button onClick={handleReducer} className="btn-reducer">
                    -
                </button>
            )}
            <h1>{counter}</h1>
            <button onClick={handleIncrease} className="btn-increase">
                +
            </button>
        </div>
    );
};

export default CountNumber;
