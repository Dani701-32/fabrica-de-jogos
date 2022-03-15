import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const FillableSelect = ({ name, items, value, callBack }) => {
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel>{name}</InputLabel>
                <Select
                    value={value}
                    onChange={callBack}
                    autoWidth
                    label={name}
                >
                    {Object.keys(items).map(function (key, index) {
                        return (
                            <MenuItem key={index} value={items[key]}>
                                {key}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};
export default React.memo(FillableSelect);
