import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import './ListFacilityByCategory.scss';

const ListFacilityByCategory = ({ facilityList, facilityCateName, data, setData }) => {
    const handleChangeBox = (event) => {
        if (event.target.checked) {
            setData([...data, event.target.value]);
        } else {
            setData(data.filter((item) => item !== event.target.value));
        }
    }
    return (
        <div>
            <div className="title">{facilityCateName}</div>
            <FormGroup>
                <div className="row">
                    {facilityList?.map((facility, index) => (
                        <div className="col l-6" key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleChangeBox}
                                        checked={data?.includes(facility.facilityCode)}
                                        value={facility.facilityCode}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />
                                }
                                label={facility.facilityName}
                                sx={{ '.MuiTypography-root': { fontSize: 17 } }}
                            />
                        </div>
                    ))}
                </div>
            </FormGroup>
        </div>
    );
};
export default ListFacilityByCategory;
