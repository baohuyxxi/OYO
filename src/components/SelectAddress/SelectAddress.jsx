import { useState, useEffect } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Axios from "axios";
import { t } from "i18next";
import { getAllProvinceDetails } from "~/services/API/publicAPI";
import "./SelectAddress.scss";

export default function SelectAddress() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProvinceDetails();
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleProvinceChange = (event, newValue) => {
    setSelectedProvince(newValue);
    // Clear districts and wards when province changes
    setSelectedDistrict(null);
    setSelectedWard(null);
    if (newValue) {
      // Set districts based on the selected province
      const provinceId = newValue.provinceCode;
      const province = provinces.find((p) => p.provinceCode === provinceId);
      if (province) {
        setDistricts(province.districtSet);
      }
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (event, newValue) => {
    setSelectedDistrict(newValue);
    // Clear wards when district changes
    setSelectedWard(null);
    if (newValue) {
      // Set wards based on the selected district
      const districtId = newValue.districtCode;
      const district = districts.find((d) => d.districtCode === districtId);
      if (district) {
        setWards(district.wardSet);
      }
    } else {
      setWards([]);
    }
  };

  return (
    <>
      <div className="row">
        <Autocomplete
          className="input"
          value={selectedProvince}
          onChange={handleProvinceChange}
          options={provinces}
          getOptionLabel={(option) => option.provinceName}
          noOptionsText={"Không có kết quả phù hợp"}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('label.selectProvince')}
              InputLabelProps={{
                shrink: false,
                style: {
                  display: params.inputProps.value ? "none" : "block",
                },
              }}
            />
          )}
        />

        <Autocomplete
          className="input"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          options={districts}
          getOptionLabel={(option) => option.districtName}
          noOptionsText={"Không có kết quả phù hợp"}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("label.selectDistrict")}
              InputLabelProps={{
                shrink: false,
                style: {
                  display: params.inputProps.value ? "none" : "block",
                },
              }}
            />
          )}
        />
        <Autocomplete
          className="input"
          value={selectedWard}
          onChange={(event, newValue) => setSelectedWard(newValue)}
          options={wards}
          getOptionLabel={(option) => option.wardName}
          noOptionsText={"Không có kết quả phù hợp"}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("label.selectWard")}
              InputLabelProps={{
                shrink: false,
                style: {
                  display: params.inputProps.value ? "none" : "block",
                },
              }}
            />
          )}
        />
      </div>
    </>
  );
}
