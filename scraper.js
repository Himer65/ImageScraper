function start(className = "undefined",
               IntervalParse = 1000) {
    box[className] = new Set();
    Name = className;
    parseID = setInterval(parse, IntervalParse);
    console.log("Parser started");
};

function stop() {
    clearInterval(parseID);

    let num = 0;
    for (let obj of Object.values(box)) num += obj.size;

    console.log(`Parsed ${num} images`);
    console.log("Parser stoped");
};

function parse() {
    let imgs = document.querySelectorAll("img");

    for (let img of imgs) {
        box[Name].add(img.getAttribute("src"));
    }

    console.log(`Found ${imgs.length} images`);
};

function download(filename = "images.json",
                  clean = false) {
    let _box = {};

    for (let key of Object.keys(box)) {
        _box[key] = Array.from(box[key]);
    }

    let file = new Blob([JSON.stringify(_box)], {
        type: 'plain/text'
    });
    
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    a.remove();

    if (clean) box = {};
};


let parseID = null,
    Name = "",
    box = {};

console.log("Parser join!");