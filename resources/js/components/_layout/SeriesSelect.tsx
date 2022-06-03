import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useGetUserInfoQuery } from '../../services/portal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
    serie: string[];
    callback: (event: SelectChangeEvent<string[]>) => void;
};

export default function SeriesSelect({ serie, callback }: Props) {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const { data } = useGetUserInfoQuery({ token, origin });

    if (!data) return <></>;

    return (
        <>
            <FormControl sx={{ minWidth: 140, maxWidth: { sm: 290, xs: 260 } }}>
                <InputLabel>Etapa Letiva</InputLabel>
                <Select
                    required
                    multiple
                    value={serie}
                    onChange={callback}
                    label="Ano/Série"
                    sx={{
                        minWidth: 140,
                    }}
                >
                    {Object.keys(data.data.series).map((key: string) => {
                        return (
                            <MenuItem key={key} value={key}>
                                <>{data.data.series[key]}</>
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
}
