import axios from 'axios';

export default function createGame(
    body,
    config,
    api_address,
    setAlert,
    navigate
) {
    axios
        .post('/api/matchup', body, config)
        .then((response) => {
            if (response.status === 201) {
                let slug = response.data.slug;
                const body = JSON.stringify({
                    user_id: 'id',
                    type: 'matchup'
                });
                axios
                    .post(`${api_address}/api/game/create`, body, config)
                    .then((response) => {
                        navigate(`/matchup/${slug}`);
                    })
                    .catch((error) => {
                        setAlert(
                            `Error ${error.response.status}: ${error.response.data.message}`
                        );
                    });
            }
        })
        .catch((error) => {
            setAlert(
                `Error ${error.response.status}: ${error.response.data.message}`
            );
        });
}
