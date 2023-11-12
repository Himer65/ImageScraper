document.querySelector("#save").onclick = () => {
    console.log("yes!!!");
};

const update = async function() {
    let res = await fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf8",
        },
        body: JSON.stringify({
            action: "return size",
        }),
    });

    let links = await res.json();
    let allNum = 0;
    let text = "";

    for (let Class of Object.keys(links)) {
        allNum += links[Class];

        text += `${Class}...${links[Class]} `;
    }

    document.querySelector("#links").innerHTML = text;
    if (allNum === 0) {
        document.querySelector("#all").innerHTML = "Вы не спарсили ни одной картинки";
    } else {
        document.querySelector("#all").innerHTML = `Всего картинок: ${allNum}`;
    }
};

const timer = setInterval(update, 10000);