import axios from 'axios';

export default function createGame(
    type,
    body,
    config,
    api_address,
    setAlert,
    setOpen
) {
    axios
        .post(`/api/${type}`, body, config)
        .then((response) => {
            if (response.status === 201) {
                body = JSON.stringify({
                    link: `https://www.fabricadejogos.portaleducacional.tec.br/${type}/${response.data.slug}`,
                    type: type
                });
                axios.post(`/api/${type}`, body, config).then((response) => {
                    if (response.status === 201) {
                        setOpen(true);
                        console.log(body);
                    }
                });
            }
        })
        .catch((error) => {
            setAlert(
                `Ocorreu um erro ${error.response.status} ao tentar criar o jogo!`
            );
        });
}
