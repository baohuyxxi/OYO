import publicProvinceAPI from '~/services/apis/publicAPI/publicProvinceAPI';
import { translateToVNAPI } from '~/services/apis/translateAPI/translateAPI';

export const decodeAddress = async (data) => {
    let storedData = JSON.parse(localStorage.getItem('allProvinces'));
    if (!storedData) {
        const res = await publicProvinceAPI.getAllProvinceDetails();
        storedData = res.data;
        localStorage.setItem('allProvinces', JSON.stringify(res.data));
    }
    let result = '';
    if (data) {
        let address = data.split(',').map((item) => item.trim());
        const target = localStorage.getItem('selectedLanguage');
        if (target !== 'vi') {
            const res = await translateToVNAPI(data);
            address = res.split(',').map((item) => item.trim());
        }
        if (Array.isArray(address) && address.length >= 4) {
            const [detail, wardName, districtName, provinceName] = address;
            const province = storedData.find((item) => item.provinceName === provinceName);
            const district = province.districtSet.find((item) => item.districtName === districtName);
            const ward = district.wardSet.find((item) => item.wardName === wardName);
            result = {
                addressDetail: detail,
                wardCode: ward.wardCode,
                wardName: ward.wardName,
                districtCode: district.districtCode,
                districtName: district.districtName,
                provinceCode: province.provinceCode,
                provinceName: province.provinceName,
            };
        } else {
            console.error('Invalid address format:', address);
        }
    }
    return result;
};
