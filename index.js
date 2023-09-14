const fs = require("fs")
const path = require("path")
const xml2js = require("xml2js")

function zero_or_not(num) {
    ret = num
    if (ret == 0) { ret = "-" }
    return ret
}

function convert_anime(table) {
    var ret = [ [], [], [], [], [] ]

    for (let i = 0; i < table.length; i++) {
        item = table[i]
        if (item.my_status == "Watching") {
            ret[0].push(item)
        }
        if (item.my_status == "On-Hold") {
            ret[1].push(item)
        }
        if (item.my_status == "Dropped") {
            ret[2].push(item)
        }
        if (item.my_status == "Completed") {
            ret[3].push(item)
        }
        if (item.my_status == "Plan to Watch") {
            ret[4].push(item)
        }
    }

    var return_table = []

    for (let i = 0; i < ret[0].length; i++) {
        return_table.push(ret[0][i])
    }
    for (let i = 0; i < ret[1].length; i++) {
        return_table.push(ret[1][i])
    }
    for (let i = 0; i < ret[2].length; i++) {
        return_table.push(ret[2][i])
    }
    for (let i = 0; i < ret[3].length; i++) {
        return_table.push(ret[3][i])
    }
    for (let i = 0; i < ret[4].length; i++) {
        return_table.push(ret[4][i])
    }

    return return_table
}

function convert_manga(table) {
    var ret = [ [], [], [], [], [] ]

    for (let i = 0; i < table.length; i++) {
        item = table[i]
        if (item.my_status == "Reading") {
            ret[0].push(item)
        }
        if (item.my_status == "On-Hold") {
            ret[1].push(item)
        }
        if (item.my_status == "Dropped") {
            ret[2].push(item)
        }
        if (item.my_status == "Completed") {
            ret[3].push(item)
        }
        if (item.my_status == "Plan to Read") {
            ret[4].push(item)
        }
    }

    var return_table = []

    for (let i = 0; i < ret[0].length; i++) {
        return_table.push(ret[0][i])
    }
    for (let i = 0; i < ret[1].length; i++) {
        return_table.push(ret[1][i])
    }
    for (let i = 0; i < ret[2].length; i++) {
        return_table.push(ret[2][i])
    }
    for (let i = 0; i < ret[3].length; i++) {
        return_table.push(ret[3][i])
    }
    for (let i = 0; i < ret[4].length; i++) {
        return_table.push(ret[4][i])
    }

    return return_table
}

function create_anime(table) {
    var text = "<!DOCTYPE html>"
    text += "\n" + `<html lang="en">`
    text += "\n" + `<head>`
    text += "\n    " + `<meta charset="UTF-8">`
    text += "\n    " + `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    text += "\n    " + `<title>My Anime List Offline Viewer</title>` // title for anime
    text += "\n" + `</head>`
    text += "\n" + `<style>`
    text += "\n    " + `body {
        background-color: #121212;
        color: #e0e0e0;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }`
    text += "\n    " + `table {
        width: 60%;
        margin: 0 auto;
        border-collapse: collapse;
    }`
    text += "\n    " + `th, td {
        border: 1px solid #757575;
        padding: 8px;
        text-align: left;
    }`
    text += "\n    " + `th {
        background-color: #333;
    }`
    text += "\n    " + `a {
        text-decoration: none;
        color: #e0e0e0;
    }`
    text += "\n    " + `.id {
        border-left: 0;
        text-align: left;
        width: 1%;
    }`
    text += "\n    " + `.name {
        text-align: left;
    }`
    text += "\n    " + `.score, .type, .progress {
        text-align: center;
        width: 5%;
    }`
    text += "\n    " + `.center-item {
        text-align: center;
    }`
    text += "\n    " + `.bold-item {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 12.1px;
        font-weight: bold;
    }`
    text += "\n    " + `.second-item {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
    }`
    text += "\n    " + `.status {
        border-right: 0px;
        width: 4px;
        padding: 4px 0;
    }`
    text += "\n    " + `.blue {
        background-color: #26448f;
    }`
    text += "\n    " + `.green {
        background-color: #2db039;
    }`
    text += "\n    " + `.grey {
        background-color: #c3c3c3;
    }`
    text += "\n    " + `.yellow {
        background-color: #f9d457;
    }`
    text += "\n    " + `.red {
        background-color: #a12f31;
    }`
    text += "\n" + `</style>`
    text += "\n" + `<body>`
    text += "\n    " + `<main>`
    text += "\n        " + `<table>`

    text += "\n            " + `<tr>`
    text += "\n                " + `<th class="status"></th>`
    text += "\n                " + `<th class="id">#</th>`
    text += "\n                " + `<th class="name">Anime</th>`
    text += "\n                " + `<th class="score">Score</th>`
    text += "\n                " + `<th class="type">Type</th>`
    text += "\n                " + `<th class="progress">Progress</th>`
    text += "\n            " + `</tr>`

    for (let i = 0; i < table.length; i++) {
        item = table[i]

        var card
        if (item.my_status == "Watching") {
            card = "green"
        }
        if (item.my_status == "On-Hold") {
            card = "yellow"
        }
        if (item.my_status == "Dropped") {
            card = "red"
        }
        if (item.my_status == "Completed") {
            card = "blue"
        }
        if (item.my_status == "Plan to Watch") {
            card = "grey"
        }

        text += "\n            " + `<tr>`
        text += "\n                " + `<td class="status ${card}"></td>`
        text += "\n                " + `<td class="center-item second-item">${i + 1}</td>`
        text += "\n                " + `<td class="bold-item"><a href="https://myanimelist.net/anime/${item["series_animedb_id"]}">${item["series_title"]}</a></td>`
        text += "\n                " + `<td class="center-item second-item">${item["my_score"]}</td>`
        text += "\n                " + `<td class="center-item second-item">${item["series_type"]}</td>`

        if (item["series_episodes"] == 0) {
            text += "\n                " + `<td class="center-item second-item"><span style="color: #8ec6f7;">${zero_or_not(item["my_watched_episodes"])}</span></td>`
        } else {
            text += "\n                " + `<td class="center-item second-item"><span style="color: #8ec6f7;">${zero_or_not(item["my_watched_episodes"])}</span> / ${item["series_episodes"]}</td>`
        }

        text += "\n            " + `</tr>`
    }

    text += "\n        " + `</table>`
    text += "\n    " + `</main>`
    text += "\n" + `</body>`
    text += "\n" + `</html>`

    return text
}

function create_manga(table) {
    var text = "<!DOCTYPE html>"
    text += "\n" + `<html lang="en">`
    text += "\n" + `<head>`
    text += "\n    " + `<meta charset="UTF-8">`
    text += "\n    " + `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    text += "\n    " + `<title>My Manga List Offline Viewer</title>` // title for manga
    text += "\n" + `</head>`
    text += "\n" + `<style>`
    text += "\n    " + `body {
        background-color: #121212;
        color: #e0e0e0;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }`
    text += "\n    " + `table {
        width: 60%;
        margin: 0 auto;
        border-collapse: collapse;
    }`
    text += "\n    " + `th, td {
        border: 1px solid #757575;
        padding: 8px;
        text-align: left;
    }`
    text += "\n    " + `th {
        background-color: #333;
    }`
    text += "\n    " + `a {
        text-decoration: none;
        color: #e0e0e0;
    }`
    text += "\n    " + `.id {
        border-left: 0;
        text-align: left;
        width: 1%;
    }`
    text += "\n    " + `.name {
        text-align: left;
    }`
    text += "\n    " + `.score, .type, .progress {
        text-align: center;
        width: 5%;
    }`
    text += "\n    " + `.center-item {
        text-align: center;
    }`
    text += "\n    " + `.bold-item {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 12.1px;
        font-weight: bold;
    }`
    text += "\n    " + `.second-item {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
    }`
    text += "\n    " + `.status {
        border-right: 0px;
        width: 4px;
        padding: 4px 0;
    }`
    text += "\n    " + `.blue {
        background-color: #26448f;
    }`
    text += "\n    " + `.green {
        background-color: #2db039;
    }`
    text += "\n    " + `.grey {
        background-color: #c3c3c3;
    }`
    text += "\n    " + `.yellow {
        background-color: #f9d457;
    }`
    text += "\n    " + `.red {
        background-color: #a12f31;
    }`
    text += "\n" + `</style>`
    text += "\n" + `<body>`
    text += "\n    " + `<main>`
    text += "\n        " + `<table>`

    text += "\n            " + `<tr>`
    text += "\n                " + `<th class="status"></th>`
    text += "\n                " + `<th class="id">#</th>`
    text += "\n                " + `<th class="name">Manga</th>`
    text += "\n                " + `<th class="score">Score</th>`
    text += "\n                " + `<th class="type">Chapters</th>`
    text += "\n                " + `<th class="progress">Volumes</th>`
    text += "\n            " + `</tr>`

    for (let i = 0; i < table.length; i++) {
        item = table[i]

        var card
        if (item.my_status == "Reading") {
            card = "green"
        }
        if (item.my_status == "On-Hold") {
            card = "yellow"
        }
        if (item.my_status == "Dropped") {
            card = "red"
        }
        if (item.my_status == "Completed") {
            card = "blue"
        }
        if (item.my_status == "Plan to Read") {
            card = "grey"
        }

        text += "\n            " + `<tr>`
        text += "\n                " + `<td class="status ${card}"></td>`
        text += "\n                " + `<td class="center-item second-item">${i + 1}</td>`
        text += "\n                " + `<td class="bold-item"><a href="https://myanimelist.net/manga/${item["manga_mangadb_id"]}">${item["manga_title"]}</a></td>`
        text += "\n                " + `<td class="center-item second-item">${item["my_score"]}</td>`
        text += "\n                " + `<td class="center-item second-item"><span style="color: #8ec6f7;">${zero_or_not(item["my_read_chapters"])}</span> / ${zero_or_not(item["manga_chapters"])}</td>`
        text += "\n                " + `<td class="center-item second-item"><span style="color: #8ec6f7;">${zero_or_not(item["my_read_volumes"])}</span> / ${zero_or_not(item["manga_volumes"])}</td>`
        text += "\n            " + `</tr>`
    }

    text += "\n        " + `</table>`
    text += "\n    " + `</main>`
    text += "\n" + `</body>`
    text += "\n" + `</html>`

    return text
}

function read_file(file) {
    const input = fs.readFileSync(file, { encoding: "utf-8" })
    const parser = new xml2js.Parser()

    parser.parseString(input, (err, result) => {
        if (err) throw err;

        if (result.myanimelist.anime != null) {
            json_convert = convert_anime(result.myanimelist.anime)
            html_convert = create_anime(json_convert)
            fs.writeFileSync("./scan/" + path.basename(file, ".xml") + ".html", html_convert)
            console.log("[+] Anime list exported successfully")
        }
        else if (result.myanimelist.manga != null ) {
            json_convert = convert_manga(result.myanimelist.manga)
            html_convert = create_manga(json_convert)
            fs.writeFileSync("./scan/" + path.basename(file, ".xml") + ".html", html_convert)
            console.log("[+] Manga list exported successfully")
        }
        else {
            console.log(`[-] ${file} is a not anime or manga table exported by myanimelist`)
        }
    })
}

fs.readdir("./scan", { encoding: "utf-8" }, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (path.extname(file) == ".html") { return } // if files are created by script
        if (path.extname(file) != ".xml") { console.log(`[*] not xml file detected ${file}`); return }
        console.log(`[%] Reading file ${file}`)
        read_file(`./scan/${file}`)
    })
})
