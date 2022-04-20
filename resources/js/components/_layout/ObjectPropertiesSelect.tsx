import React from 'react';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import { useGetUserInfoQuery } from '../../services/portal';

type Props = {
    token: string;
    origin: string;
    selectedSerie: string[];
    handleSelectSerie: (event: SelectChangeEvent<string[]>) => void;
    selectedDiscipline: string;
    handleSelectDiscipline: (event: SelectChangeEvent) => void;
};

const ObjectPropertiesSelect = ({
    token,
    origin,
    selectedSerie,
    handleSelectSerie,
    selectedDiscipline,
    handleSelectDiscipline
}: Props) => {
    const { data } = useGetUserInfoQuery({ token, origin });
    return (
        <>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: { md: 'flex', xs: 'block' },
                        justifyContent: { md: 'flex-end', xs: 'none' }
                    }}
                >
                    <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 280 }}>
                        <InputLabel>Ano/Série</InputLabel>
                        <Select
                            required
                            value={selectedSerie}
                            onChange={handleSelectSerie}
                            multiple
                            autoWidth
                            label="Ano/Série"
                            sx={{
                                minWidth: 140
                            }}
                        >
                            {Object.keys(data?.data.series ?? {}).map(
                                (key: string) => {
                                    return (
                                        <MenuItem key={key} value={key}>
                                            <>
                                                {
                                                    data?.data.series[
                                                        key as keyof typeof data.data.series
                                                    ]
                                                }
                                            </>
                                        </MenuItem>
                                    );
                                }
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: { md: 'flex', xs: 'block' },
                        justifyContent: { md: 'flex-start', xs: 'none' }
                    }}
                >
                    <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 280 }}>
                        <InputLabel>Componente</InputLabel>
                        <Select
                            required
                            value={selectedDiscipline}
                            onChange={handleSelectDiscipline}
                            autoWidth
                            label="Componente"
                            sx={{
                                minWidth: 140
                            }}
                        >
                            {Object.keys(data?.data.disciplinas ?? {}).map(
                                (key: string) => {
                                    return (
                                        <MenuItem key={key} value={key}>
                                            <>
                                                {
                                                    data?.data.disciplinas[
                                                        key as keyof typeof data.data.disciplinas
                                                    ]
                                                }
                                            </>
                                        </MenuItem>
                                    );
                                }
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
};
export default React.memo(ObjectPropertiesSelect);
