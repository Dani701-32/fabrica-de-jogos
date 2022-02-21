import axios from 'axios';

export default function createGame(
    type,
    body,
    config,
    api_address,
    setAlert,
    navigate
) {
    axios
        .post(`/api/${type}`, body, config)
        .then((response) => {
            if (response.status === 201) {
                navigate(`/${type}/${response.data.slug}`);
            }
        })
        .catch((error) => {
            setAlert(
                `Error ${error.response.status}: ${error.response.data.message}`
            );
        });
}
