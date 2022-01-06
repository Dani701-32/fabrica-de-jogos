import React from 'react';
import {useParams} from "react-router-dom";

function WordSearch() {
    let {slug} = useParams();
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjcwZTZlZWVkYjkwMzRiMjA4Njc5N2MxMDU4MDRkYjRmMWU1YWQ2NzAyODg5MjFjMDVjMWQyYjAyOTViNTY1MjRkYTY5OGNlZmVmYmMzMDciLCJpYXQiOjE2NDE0NjYzNDIuMjUyNzU4LCJuYmYiOjE2NDE0NjYzNDIuMjUyNzYzLCJleHAiOjE2NzMwMDIzNDIuMTMyOTUxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.HjW0qCuguPCBX1ZSkDg0j1jRzdnHkPhFP0-WmbK-UmlNxcadxCmOBaFZdJf-tfnWwxgeAtWH2ksJotEkDRM6QDqzvxHqY4pD8pPsZPGWk6NaYtGjzYc19baAkA38mvR6MpdCBOproirNRPXFuX6_-BKWZR-lZDF8s4zFaMrvciLzd6ylQJ51K0wzTpY_Pd3-rJnmlCRtREY_ZKk-4r3tmkLKwXSOYGmcl94qecCP1QAAWYwCma_MGEAmYhq_KWmnUqaCrzy-I3qhPFOwSXUiKurTgB-Qss1StwmhYCBRYUAGk_uCgKiSiLKgzTG6sh8gFjcPQdw328i0unqurijPgEdrOgMPWgAUSGlN5wPOKl4THrgTQn4Lw0aOxKyiODiJravGnVP5MPDPKoxwbbnSCjZtLZAb139HSs6r6zLcl1n2R4SajsbBNxvs2OXtPxIxuyI8D7Ce2FBzJFEHT3YHM1JmZo3AvTBvIdkbKJ5VIAw2lVwEddX3_GOoBuUSYhbLv1iZi48uNhFC8a6pqWyXIevoLV_8IBtS8yCR5Mis2QVxUoGzaXzuQrJSSvbIVXhgh5ebBW7Yf7aReq6A9UbkLE-f5UZrcqqO7nwTpO9SCZvsJW0EaDjJr-Dg7pGNZInyioGIk5OH5pQ8nBo4UbEUgPYgu-TwGJOpiSHZPfraX_s');
    localStorage.setItem('slug', slug);
    return (
        <div>
            <iframe id="iframezin" src="/games/wordsearch.html" height="720px" width="1420px" allowFullScreen/>
        </div>
    );
}

export default WordSearch;
