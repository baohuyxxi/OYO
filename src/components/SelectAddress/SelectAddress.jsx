import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios';
import { t } from 'i18next';
import publicProvinceAPI from '~/services/apis/publicAPI/publicProvinceAPI';
import './SelectAddress.scss';

export default function SelectAddress(props) {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    // const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        props.setData((prevData) => ({
            ...prevData,
            provinceCode: selectedProvince?.provinceCode,
            provinceName: selectedProvince?.provinceName,
            districtCode: selectedDistrict?.districtCode,
            districtName: selectedDistrict?.districtName,
            wardCode: selectedWard?.wardCode,
            wardName: selectedWard?.wardName
        }));
    }, [selectedProvince, selectedDistrict, selectedWard]);
    const [provinces, setProvinces] = useState(() => {
        const storedData = localStorage.getItem('allProvinces');
        return storedData ? JSON.parse(storedData) : [];
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await publicProvinceAPI.getAllProvinceDetails();
                const provincesData = response.data;
                localStorage.setItem('allProvinces', JSON.stringify(provincesData));

                setProvinces(provincesData);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin tỉnh thành:', error);
            }
        };

        if (provinces.length === 0) {
            fetchData();
        }
    }, [provinces]);

    const handleProvinceChange = (event, newValue) => {
        setSelectedProvince(newValue);
        setSelectedWard(null);
        setSelectedDistrict(null);

        if (newValue) {
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
        setSelectedWard(null);
        if (newValue) {
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
                    noOptionsText={'Không có kết quả phù hợp'}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('label.selectProvince')}
                            InputLabelProps={{
                                shrink: false,
                                style: {
                                    display: params.inputProps.value ? 'none' : 'block'
                                }
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
                    noOptionsText={'Không có kết quả phù hợp'}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('label.selectDistrict')}
                            InputLabelProps={{
                                shrink: false,
                                style: {
                                    display: params.inputProps.value ? 'none' : 'block'
                                }
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
                    noOptionsText={'Không có kết quả phù hợp'}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('label.selectWard')}
                            InputLabelProps={{
                                shrink: false,
                                style: {
                                    display: params.inputProps.value ? 'none' : 'block'
                                }
                            }}
                        />
                    )}
                />
            </div>
        </>
    );
}
