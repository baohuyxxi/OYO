import { useState } from "react";
import Box from "@mui/material/Box";
import "./RangePriceFilter.scss";
import Slider from "@mui/material/Slider";

const MIN = 0;
const AVERAGE = 5000000;
const MAX = 10000000;
const RangePriceFilter = () => {
  const [values, setValues] = useState([MIN, AVERAGE]);
  const handleChange = (event, newValue) => {
    setValues(newValue);
  };
  return (
    <Box sx={{ width: "100%", paddingRight: "30px", paddingLeft: "30px" }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={values}
        onChange={handleChange}
        valueLabelDisplay="auto"
        max={MAX}
      />
      <div className="show-rang__price">
        <p style={{ marginRight: "10px" }}>Giá tối thiểu</p>
        <input
          type="number"
          className="pricerange"
          value={values[0]}
          onChange={(event) =>
            setValues([parseInt(event.target.value), values[1]])
          }
        />
        <input
          type="number"
          className="pricerange"
          value={values[1]}
          onChange={(event) =>
            setValues([values[0], parseInt(event.target.value)])
          }
        />
        <p>Giá tối đa</p>
      </div>
    </Box>
  );
};
export default RangePriceFilter;
