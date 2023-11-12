function start(className,
               IntervalParse = 1500,
               IntervalSend = 10000) {
    Class = className;
    parseID = setInterval(parse, IntervalParse);
    sendID = setInterval(sendLinks, IntervalSend);
};

function stop() {
    clearInterval(parseID);
    clearInterval(sendID);
    sendLinks();
    links.clear();
    Class = "";
};

function parse() {
    console.log("yes");
    let imgs = document.querySelectorAll("img");

    for (let img of imgs) {
        links.add(img.getAttribute("href"));
    }
};

async function sendLinks() {
    let res = await fetch("http://localhost:3000/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf8",
        },
        body: JSON.stringify({
            action: "add links",
            Class: Class,
            links: links,
        }),
    });

    let ok = await res.json().ok;
    if (ok) {
        links.clear();
        console.log("Links added");
    } else {
        console.error("Links not added!");
    }
};

let Class, parseID, sendID;
let links = new Set();
console.log("Parser join!");