export const fetchCache = 'force-no-store';

import { load } from "cheerio";

export async function GET(req, { params }) {
    const data = await fetch(`https://usatt.simplycompete.com/userAccount/up/${params.playerId}`, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
    const html = await data.text();
    const $ = load(html);

    return new Response(JSON.stringify({
        name: $(".profile-header .body span.title").text(),
        rating: $(".statistics .row").children(".panel-wrapper").first().find(".panel .body span.details-text").text()
    }));
};