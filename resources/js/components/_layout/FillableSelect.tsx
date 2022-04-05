import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props = {
    name: String;
    items: object;
    value: String;
    callBack: any;
};

const FillableSelect = ({ name, items, value, callBack }: Props) => {
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
                    {Object.keys(items).map(function (
                        key: string,
                        index: number
                    ) {
                        return (
                            <MenuItem
                                key={index}
                                value={items[key as keyof typeof items]}
                            >
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
