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
                `Ocorreu um erro ${error.response.status} ao tentar criar o jogo!`
            );
        });
}
