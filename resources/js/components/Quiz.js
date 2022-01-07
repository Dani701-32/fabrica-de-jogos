import React from "react";
import { useParams } from "react-router-dom";

function Quiz() {
    let { slug } = useParams();
    localStorage.setItem(
        "token",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDRkNmY3OWNkN2Q2ZjI5Mjk5N2E5OWY5NzA4NmI5ZDkzNGVlOTE2ZWMxOGU0MGE0MDQ4MjYwZWU4Y2M4OGZhMjVmNDgwMjZjNDA5NWI2YjkiLCJpYXQiOjE2NDE0ODMwMzAuNzc3MzAyLCJuYmYiOjE2NDE0ODMwMzAuNzc3MzA2LCJleHAiOjE2NzMwMTkwMzAuNzY2NDA5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.EGHj253rQuAN70VlhSd1TFs5wLJJLWET3Kejh5g11WyS2kdLFkQFicTi2cYpCAwAJMhLUq2dmxx6LIOF1ZInbsCVXdO86T5gqXwB82sY1yexD6N4NHNaA360D0kACdnA7QCdtlZPibeii9jj4iemB0K_xQRywgfJYq9FKXxjGEdwetq-VaXd-SIlwr787e3WRtkV_OEeUFgM1QQHUL0Jk9T84f8My11_Bxjng7pKaXYCLIvuj0oe2y8Lc9cHq_9F5_bhnBK6UUNqxfNfJAFLY-j46ySQLm_JclUYPouMs4bAf2GvTBWZIAs-NhptcFdVQFq9ZI6vC8K1bPTmY8oLkocI4nzoZAtt2uouTj6QTnlhOSb2mRSRNS0ns9kQjRWq04xNLOxGn4GXEPPnCw87ViS2_QMNRwfw8TLDu-c_YgcoZywbQqP6jtE3hQchuYobLorA5aXtaA5gPUVfB72hP0LEg5n02jhHlaxSy9HAtSNFoN7EhVb7GTGJw6B3UgjWckmShyt5UXKJaHWGH3lcltBf1xIuhkkS1cCx7fi5B4dCQcB4DdCALf-5h7pUqIKpMZWF9lrZpoNgEThXd4vHS-iIwHst0S2jetqJndDENeEgyF9ypmQZTOkSeU7Xn8l2hOqglRhm5qJNfcrPHt-wcsBopPfT3G4E1Ateyy2fC4I"
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
