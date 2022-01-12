import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

function Quiz() {
    let { slug } = useParams();
    localStorage.setItem(
        "token",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWFhYzRiNGYyMTBiMGM4MmMyNWUwYTNhNzU1NWQwNmJiYTdjOTJiZTNjODRlNDA5N2MwZGM5MjBkMzJiODAyOWRlMzE3MWVhOGM2ZThkNWIiLCJpYXQiOjE2NDE5MjU4ODMuNDQwNDMzLCJuYmYiOjE2NDE5MjU4ODMuNDQwNDM3LCJleHAiOjE2NzM0NjE4ODMuNDI5NDI3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Z87TMAFbFhPXHftVULt0snAY0rbXgGs5I_DhMvlVhdC0HtcHqQxdAVSIOOoTt3rcx0rUOPxbPeLXlPlf0P5Y4vOAQukCFI2L2lbq12daRpYYg7ZQNBt-KYG974tcNbd6_YH7xViOISqPRreTEF6nSPun3rvjuKT65TwFR1fjzf0vXOQDxPlMES9aYRNRsjnrHcnDe-KO9j_040WJtI5ZI43tWFRWMq6Rb1U4e-l1hLopKHZpukNxqe3ZHIvwiZSBKb_wDRilxmuzP-UnVF2vCbvgJBkQGwlrKZusoLD6ixf-towFcKlrHZX5Wn71bevsIUW9S4jc5FMKf2zB41ii4Y_oglwlAg36l58vDDfncHEY8R_ppkR3jjWu1U3un4bLbaXS-yLn7VqkL-Fdyk94kKUCi5aBhWbc_VZGPSVSeiU-QujSlTwG_ghRuIASBH-mpmBq8WedADhMA6uGWRc52F3Tn31Ske0LQLDZPiw0NbZ56E5uXJOhFo10DXki7MVh-oPhNNGEndOHV5rNguB0Zf1fX15UTMFUKPbbw81whx_yM5_AlfDzPFOYLjSnwa2sPGlsMoYTUkw_LjuUlJsUnmeGwNdts08eGynIdx3F9SI4AIr2sY9FemkBS9_8kFWGqG9cK3jMwurFDXkG0wvO9jHsI5-u0zGfZosPyIApGoQ"
    );
    localStorage.setItem("slug", slug);
    return (
        <div>
            <iframe
                id="iframezin"
                src="/games/quiz.html"
                height="720px"
                width="1420px"
                allowFullScreen
            />
        </div>
    );
}

export default Quiz;
