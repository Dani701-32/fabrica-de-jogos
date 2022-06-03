import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetUserInfoQuery } from '../../services/portal';

type Props = {
    discipline: string;
    callback: (event: SelectChangeEvent) => void;
};

export default function DisciplineSelect({ discipline, callback }: Props) {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const { data } = useGetUserInfoQuery({ token, origin });

    if (!data) return <></>;

    return (
        <>
            <FormControl sx={{ minWidth: 140, maxWidth: { sm: 290, xs: 260 } }}>
                <InputLabel>Componente</InputLabel>
                <Select
                    required
                    value={discipline}
                    onChange={callback}
                    autoWidth
                    label="Componente"
                    sx={{
                        minWidth: 140,
                    }}
                >
                    {Object.keys(data.data.disciplinas).map((key: string) => {
                        return (
                            <MenuItem key={key} value={key}>
                                <>{data.data.disciplinas[key]}</>
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
}
