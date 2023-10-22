import { useState, useEffect } from 'react'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Axios from 'axios'
import { t } from 'i18next'
import provinceData from '~/mockdata/ProvinceVN.json' 
import './SelectAddress.scss'

export default function SearchHotelByAddress() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('https://provinces.open-api.vn/api/?depth=3');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      const provinceId = newValue.id;
      const province = provinces.find((p) => p.id === provinceId);
      if (province) {
        setDistricts(province.districts);
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
      const districtId = newValue.id;
      const district = districts.find((d) => d.id === districtId);
      if (district) {
        setWards(district.wards);
      }
    } else {
      setWards([]);
    }
  };

  return (
    <>
    <div className='row'>
      <Autocomplete className='input'
        value={selectedProvince}
        onChange={handleProvinceChange}
        options={provinces}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={t('label.selectProvince')} InputLabelProps={{
            shrink: false,
            style: {
              display: params.inputProps.value ? 'none' : 'block'
            }
          }}/>
        )}
      />
   
      <Autocomplete className='input'
        value={selectedDistrict}
        onChange={handleDistrictChange}
        options={districts}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={t('label.selectDistrict')}InputLabelProps={{
            shrink: false,
            style: {
              display: params.inputProps.value ? 'none' : 'block'
            }
          }} />
        )}
      />
      <Autocomplete className='input'
        value={selectedWard}
        onChange={(event, newValue) => setSelectedWard(newValue)}
        options={wards}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={t('label.selectWard')}InputLabelProps={{
            shrink: false,
            style: {
              display: params.inputProps.value ? 'none' : 'block'
            }
          }} />
        )}
      />
         </div>
    </>
  );
}
