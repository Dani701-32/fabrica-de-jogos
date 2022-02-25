import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function userInfo() {
    window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) {
            const navigate = useNavigate();
            const api_address = event.data.api_address;
            const token = event.data.user_token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios
                .get(`${api_address}/api/validate`, config)
                .then((response) => {
                    if (response.status === 200) {
                        return {
                            token: token,
                            api_address: api_address,
                            user_id: event.data.user_id
                        };
                    }
                    // navigate('/');
                })
                .catch((error) => {
                    // navigate('/');
                });
        }
    });
}
