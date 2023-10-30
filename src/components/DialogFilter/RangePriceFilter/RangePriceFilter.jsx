import { useState } from "react";
import Box from "@mui/material/Box";
import ReactSlider from "react-slider";
import "./RangePriceFilter.scss";

const MIN = 0;
const MAX = 5000000;
const RangePriceFilter = () => {
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div className="container_range">
      <ReactSlider
        className="slider"
        thumbClassName="thumb_slider"
        trackClassName="track_slider"
        value={values}
        min={MIN}
        max={MAX}
        onChange={setValues}
      />
      <div className="show-rang__price">
        <p style={{ marginRight: "10px" }}>Giá tối thiểu</p>
        <input
          type="number"
          className="input-pricerange"
          value={values[0]}
          min={MIN}
          max={MAX}
          onChange={(event) =>
            setValues([parseInt(event.target.value), values[1]])
          }
        />
        <input
          type="number"
          className="input-pricerange"
          value={values[1]}
          min={MIN}
          max={MAX}
          onChange={(event) =>
            setValues([values[0], parseInt(event.target.value)])
          }
        />
        <p>Giá tối đa</p>
      </div>
    </div>
  );
};
export default RangePriceFilter;
