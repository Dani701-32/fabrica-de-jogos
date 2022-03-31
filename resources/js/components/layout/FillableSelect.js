import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const FillableSelect = ({ name, items, value, callBack }) => {
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 140 }}>
                <InputLabel>{name}</InputLabel>
                <Select
                    required
                    value={value}
                    onChange={callBack}
                    autoWidth
                    label={name}
                    sx={{
                        minWidth: 140
                    }}
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
