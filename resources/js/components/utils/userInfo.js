import axios from 'axios';

export default function userInfo() {
    window.addEventListener('message', (event) => {
        const api_address = event.data.api_address;
        const token = event.data.user_token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .get(`https://${api_address}/api/validate`, config)
            .then((response) => {
                if (response.status === 200) {
                    return { token: token, api_address: api_address };
                }
            });
    });
}
