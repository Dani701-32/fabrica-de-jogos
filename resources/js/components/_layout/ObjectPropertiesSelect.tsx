import React from 'react';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    CircularProgress
} from '@mui/material';
import { useGetUserInfoQuery } from '../../services/portal';

type Props = {
    token: string;
    selectedSerie: string[];
    handleSelectSerie: Function;
    selectedDiscipline: string;
    handleSelectDiscipline: Function;
};

const ObjectPropertiesSelect = ({
    token,
    selectedSerie,
    handleSelectSerie,
    selectedDiscipline,
    handleSelectDiscipline
}: Props) => {
    const { data, isLoading } = useGetUserInfoQuery(token);
    return (
        <>
            {isLoading ? ( // @ts-ignore
                <Grid item align="center">
                    <CircularProgress />
                </Grid>
            ) : data ? (
                <>
                    <Grid item xs={3}>
                        <FormControl
                            sx={{ m: 1, minWidth: 140, maxWidth: 280 }}
                        >
                            <InputLabel>Ano/Série</InputLabel>
                            <Select
                                required
                                value={selectedSerie}
                                onChange={handleSelectSerie as any}
                                multiple
                                autoWidth
                                label="Ano/Série"
                                sx={{
                                    minWidth: 140
                                }}
                            >
                                {Object.keys(data.data.series).map(
                                    (key: string) => {
                                        return (
                                            <MenuItem key={key} value={key}>
                                                {
                                                    data.data.series[
                                                        key as keyof typeof data.data.series
                                                    ]
                                                }
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl sx={{ m: 1, minWidth: 140 }}>
                            <InputLabel>Componente</InputLabel>
                            <Select
                                required
                                value={selectedDiscipline}
                                onChange={handleSelectDiscipline as any}
                                autoWidth
                                label="Componente"
                                sx={{
                                    minWidth: 140
                                }}
                            >
                                {Object.keys(data.data.disciplinas).map(
                                    (key: string) => {
                                        return (
                                            <MenuItem key={key} value={key}>
                                                {
                                                    data.data.disciplinas[
                                                        key as keyof typeof data.data.disciplinas
                                                    ]
                                                }
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            ) : null}
        </>
    );
};
export default React.memo(ObjectPropertiesSelect);
