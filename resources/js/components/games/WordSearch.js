import React from 'react';
import { useParams } from 'react-router-dom';

function WordSearch() {
    let { slug } = useParams();
    localStorage.setItem(
        'token',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGI2OWIxOTE4ODg3OTc5M2IwZjRiY2M2NTVjNTRkMGQxMGIzZDM3M2VhYTVjZjYwZmVlYTFmZDhhMGUwYTJiNTBiNWZlZWE0MGY1N2ZhMTIiLCJpYXQiOjE2NDI2MDI4MTkuMTY0MTYzLCJuYmYiOjE2NDI2MDI4MTkuMTY0MTY4LCJleHAiOjE2NzQxMzg4MTkuMTU2Nzc3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.lJKyZb1bS5BToPjsz5xUdsUJ-arSRhsco6GXHJ-Xl6mmGLEaKt-2wzZ29fcq9FNP1GjUbnko96_9Ho8IEK37UXs4kXfHldsYlGch8u0ZLv83HgFctWyYHVpOoQ6_J8ATRFKQLtuWQ12JNmB_NHNV6SuoR7JQI603hsHTlEc_UGodBMO0RK3WEnIbZ3gsunEB9gCMhhesXD2tKhLhCbNeG5IFhhP_UQHVRjy4gVUg2dRxytwSp6VoIMpmFDkKRrRJHSG7bZz5rcodMwJVsFzWcFNhwBN0dtakiq_YD3s7u0Mo0NBcKm6G4OysoTw-2GMYdXNtzn46mg8rslkUcPOJkrpGSw-T1ZNhCeAqby3o6rptNGMhSTK9POZ9N0oUOHic96xk_cUKUUDpDPMvzV3L_Key3EzyUjge19QzvSPdFY3aXYEcCkvjRRanqun13q5KD4o3yMOHHsVSUKNX80P1mur5mnqL9rRIhPq1mXsNsHN-G14sVRRArSjpiHVBPSKq1g044_38VWyll-quWsJrnQfNaydILKxeuanM7x7hw1KzlJv6ift0ac3yIRFrph_jsva6CIGg86dv93lOx-uZJ9OLSjEbZcN66oap4C4yvIOVZeDy-yw-eKH1_D0Zsz898CmhogeuJsCCY1dfrTAzC0KTE19vBKivKXn_9zm66qs'
    );
    localStorage.setItem('slug', slug);
    return (
        <div>
            <iframe
                id="iframezin"
                src="/games/wordsearch.html"
                height="720px"
                width="1420px"
                allowFullScreen
            />
        </div>
    );
}

export default WordSearch;
