export const fetchCache = 'force-no-store';

import { load } from "cheerio";

export async function GET(req, { params }) {
    const data = await fetch(`https://usatt.simplycompete.com/userAccount/s2?q=${params.keyword}&displayColumns=First+Name&displayColumns=Last+Name&displayColumns=Location&displayColumns=Tournament+Rating&pageSize=1000`, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
    const html = await data.text();
    const $ = load(html);

    const players = [];

    $(".list-view > .row > table > tbody > tr").each((index, element) => {
        const player = {};
        $(element).children("td.list-column").each((index, element) => {
            if (index === 1) {
                const elementChild = $(element).children("a").first();
                const split1 = $(elementChild).attr("href").split("/");
                player["firstName"] = $(elementChild).text();
                player["id"] = split1[split1.length - 1];
            } else if (index === 2) {
                player["lastName"] = $(element).children("a").first().text();
            } else if (index === 3) {
                player["location"] = $(element).text();
            } else if (index === 4) {
                player["rating"] = $(element).text();
            };
        });
        players.push(player);
    });

    return new Response(JSON.stringify(players));
};