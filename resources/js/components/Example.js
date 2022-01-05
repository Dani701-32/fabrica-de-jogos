import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

function Example() {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBiZGU5MzU0NmQxZjZmMDVjZDRjMTk2NGU4ZWE5ZmI4ZWQyNjM2M2I5ZDQ5YWMyNzk2YWJjNzExMDFjMTFlNmIwZTk1NmViODc3ZGU2ODkiLCJpYXQiOjE2NDEzODQ2MjYuMjM4NDIyLCJuYmYiOjE2NDEzODQ2MjYuMjM4NDI2LCJleHAiOjE2NzI5MjA2MjYuMjMxMzQ2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.FFu9MCw2XmGY9j0GZqys9aDgnNCrvWMChIucPJIgYWIQfd-3kbSBUqMKk1DZSiHGxWiI_BA_ABBMU6g77dStofguw2oQOl8_7pXXvWwP0KMI2fJjdGzalKspg-z1GTbbyqTvEgui-wM8-BNTNb5SSOVIpy5_BNcF0ubxrZfsE5sVHwgCh9G1lKr9-bwGao3KN9w8z-aLL3q-xn42Ns4WSSkNqyCfTmEYuegogMZKCrxGPCoOoAPNDhMkH2DUy4FBZd3zjUOk8B6JP3VlK6Av-OSV5kWdLiMFUZU6Wnl4MnnON-6c2JqG52JTPbxGX6xswrxYMBJwUl1832vRrbWkaQ8ct6ME2q5pNEU-lw7BW_hpLuwX02cQ1FzYdhkMaxnILdMo3DirIpuTSHp4rS6EKafvs15TJgphkqXl8DxepUOnshCpX5QdFRziap7x6soyK55TJNpk8NshriD3gAPuHAbuy2V-Rwfe9CGa1fjYQ-8mgK0O8mCqASL8BCgc-XsTHkWtyppV92aAfAbjfx2ZHOcPbpeFidmNIjnqAOtX2HyQx_1IzuRDoDXtNg7qjaPiqUumyfiy4BWEZyAwQfT7u6mEGWJi_m0qt5SHpmatwpRePbAJNxpLzTmL0NGssRfGIVaZKqUcFh-1ybx9_Cw7EXyBNS7UswfrC40U6Mm8DPA';
    let slug = 1;
    useEffect(()=> {
        let frame = document.getElementById('game')
        frame.contentWindow.postMessage({call:'sendValue', data: {
            token: token,
                slug: slug
            }})
    }, [])
    return (
        <div>
            <iframe id="game" src="https://angry-golick-02aa23.netlify.app/" height="720px" width="1420" allowFullScreen>

            </iframe>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
