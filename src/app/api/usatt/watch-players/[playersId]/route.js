export const fetchCache = 'force-no-store';

import { load } from "cheerio";

export async function GET(req, { params }) {
    const players = [];
    const playersId = params.playersId.split("-");
    
    for (const playerId of playersId) {
        const data = await fetch(`https://usatt.simplycompete.com/userAccount/up/${playerId}`, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const html = await data.text();
        const $ = load(html);
        players.push({
            id: playerId,
            name: $(".profile-header .body span.title").text(),
            rating: $(".statistics .row").children(".panel-wrapper").first().find(".panel .body span.details-text").text()
        });
    };

    return new Response(JSON.stringify(players));
};