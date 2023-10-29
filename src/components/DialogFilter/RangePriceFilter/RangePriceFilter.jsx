import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
const RangePriceFilter = () => {
  return (
    <Box sx={{ width: "100%", paddingRight: "30px", paddingLeft: "30px" }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        max={10000000}
      />
      <div className="show-rang__price">
        <p style={{ marginRight: "10px" }}>Giá tối thiểu</p>
        <input
          type="number"
          className="input-pricerange"
          value={value[0]}
          onChange={(event) =>
            setValue([parseInt(event.target.value), value[1]])
          }
        />
        <input
          type="number"
          className="input-pricerange"
          value={value[1]}
          onChange={(event) =>
            setValue([value[0], parseInt(event.target.value)])
          }
        />
        <p>Giá tối đa</p>
      </div>
    </Box>
  );
};
export default RangePriceFilter;
