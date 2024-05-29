import { load } from "cheerio";

export async function GET(req, { params }) {
    const data = await fetch(`https://usatt.simplycompete.com/t/hh?p1=${params.player1}&p2=${params.player2}`);
    const html = await data.text();
    const $ = load(html);

    const headToHeadData = [];

    $("table.match-results-tbl > tbody > tr").each((index, element) => {
        if (index > 0) {
            const matchData = {};
            $(element).children("td").each((index, element) => {
                if (index === 0) {
                    matchData["tournament"] = $(element).text();
                } else if (index === 1) {
                    matchData["date"] = $(element).text();
                } else if (index === 2) {
                    const split1 = $(element).attr("onclick").split("/");
                    const split2 = split1[split1.length - 1].split("'")[0];
                    matchData["winner"] = {
                        id: split2,
                        name: `${$(element).text().split(",")[1].trim()} ${$(element).text().split(",")[0].trim()}`
                    };
                } else if (index === 3) {
                    const split1 = $(element).attr("onclick").split("/");
                    const split2 = split1[split1.length - 1].split("'")[0];
                    matchData["loser"] = {
                        id: split2,
                        name: `${$(element).text().split(",")[1].trim()} ${$(element).text().split(",")[0].trim()}`
                    };
                } else if (index === 4) {
                    matchData["event"] = $(element).text();
                } else if (index === 5) {
                    const gameScores = $(element).text().trim(",");
                    let matchScore;
                    if (gameScores.length === 3) matchScore = "3 - 0";
                    if (gameScores.length === 4) matchScore = "3 - 1";
                    if (gameScores.length === 5) matchScore = "3 - 2";
                    matchData["score"] = matchScore;
                };
            });
            headToHeadData.push(matchData);
        };
    });

    return new Response(JSON.stringify(headToHeadData));
}