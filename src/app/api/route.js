import cheerio from "cheerio";

export async function GET() {
    const data = await fetch("https://www.omnipong.com/t-tourney.asp?e=0"); // fetches data
    const html = await data.text(); // converts data into html text
    const $ = cheerio.load(html); // loads html text

    const titles = [];
    $("td.omnipong > center > h3 > p").each((index, element) => {
        titles.push($(element).text().trim());
    });

    const details = [];
    let counter1 = 0;
    $("td.omnipong > center > table > tbody > tr > td").each((index, element) => {
        const detailsIndex = details.length - 1;
        if (counter1 === 0) {
            const input = $(element).children("input").first();
            let inputValue;

            if (input.attr("value") === "Enter") {
                inputValue = "Open";
            } else if (input.attr("value") === "Closed") {
                inputValue = "Closed";
            } else if (input.attr("value") === "Results") {
                inputValue = "Finished"
            } else {
                inputValue = "TBD" 
            };
            details.push({ status: inputValue });
            return counter1++;
        };
        if (counter1 === 1) {
            const input = $(element).children("input").first();
            details[detailsIndex] = { ...details[detailsIndex], action: input.attr("onclick") }
            return counter1++;
        };
        if (counter1 === 2) {
            const a = $(element).children("a");
            if (a.length > 0) {
                details[detailsIndex] = { ...details[detailsIndex], pdf: a.attr("href"), name: a.text() }
            } else {
                details[detailsIndex] = { ...details[detailsIndex], name: $(element).text() }
            };
            return counter1++;
        };
        if (counter1 === 3) {
            details[detailsIndex] = { ...details[detailsIndex], city: $(element).text() }
            return counter1++;
        };
        if (counter1 === 4) {
            details[detailsIndex] = { ...details[detailsIndex], date: $(element).text() }
            return counter1++;
        };
        if (counter1 === 5) {
            const a = $(element).children("a").first();
            details[detailsIndex] = { ...details[detailsIndex], contactUrl: $(a).attr("href"), contactName: $(element).text() };
            return counter1++;
        };
        if (counter1 === 6) {
            details[detailsIndex] = { ...details[detailsIndex], ballInfo: $(element).text() }
            return counter1++;
        };
        if (counter1 === 7) {
            details[detailsIndex] = { ...details[detailsIndex], usattRating: $(element).text() }
            return counter1 = 0;
        };
    });

    const numbersOfRowsPerState = [];
    $("td.omnipong > center > table > tbody").each((index, element) => {
        numbersOfRowsPerState.push($(element).children("tr").length - 1);
    });

    let counter2 = 0;
    for (let i = 0; i < numbersOfRowsPerState.length; i++) {
        for (let j = 0; j < numbersOfRowsPerState[i]; j++) {
            details[counter2] = { ...details[counter2], state: titles[i], id: counter2 }
            counter2++;
        };
    };

    return new Response(JSON.stringify(details));
}
