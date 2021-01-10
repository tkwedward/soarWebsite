const express = require("express")
const path = require("path")
const ejs = require("ejs")
const fs = require("fs")

const app = express();

const port = process.env.PORT || 4000;

function escapeSpecialChars(jsonString) {
    return jsonString
		    .replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
}

app.set("view engine", "ejs")


app.set("views", path.join(__dirname, "./wlan/static/views"))

// app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, "./wlan")))


// app.get("/", (request, response) => {
//   var response.render("homepage.ejs", {
//   })
// })

app.get("/", (request, response) => {
    var dataFile = fs.readFileSync(path.join(__dirname, "./wlan/static/views/data/Semiconductor Material Model variables.json"), 'utf8');
    dataFile = encodeURIComponent(dataFile)
    dataFile = decodeURIComponent(dataFile)
    dataFile = JSON.parse(dataFile)
    response.render("index.ejs", {
    		pageTitle: dataFile
    })
})


app.get("/our-volunteers", (request, response) => {
    var dataFile = fs.readFileSync(path.join(__dirname, "./wlan/static/views/data/volunteerData.txt"), 'utf8');

    // split volunteers by the separator "---\n"
    let volunteers = dataFile.split("---\n")

    // convert to individual data
    let volunteersData = volunteers.map(p=>{
        let person = p.split("\n")

        if (person[0]!="name:"){ // to skip empty data
          console.log(person[0]);
            let data = {
                "name": person[0].replace("name: ", ""),
                "link": person[1].replace("photo: ", ""),
                "content": person[2].replace("content: ", "")
            }
            return data
        } else {
            return null
        }

    })

    console.log(volunteersData)

    response.render("our-volunteers.ejs", {
        "text": JSON.stringify(volunteersData)
    })
})

app.get("/soar-classes-activities", (request, response) => {
    var dataFile = fs.readFileSync(path.join(__dirname, "./wlan/static/views/data/soar-classes-activities.json"), 'utf8');

    let soarClasses = JSON.parse(dataFile)
    console.log(soarClasses)

    response.render("soar-classes-activities.ejs", {
        "text": JSON.stringify(soarClasses)
    })
})

app.get("/get-involved", (request, response) => {
    var dataFile = fs.readFileSync(path.join(__dirname, "./wlan/static/views/data/soar-classes-activities.json"), 'utf8');

    let soarClasses = JSON.parse(dataFile)
    console.log(soarClasses)

    response.render("get-involved.ejs", {
        "text": JSON.stringify(soarClasses)
    })
})

app.get("/acknowledgments", (request, response) => {
    var dataFile = fs.readFileSync(path.join(__dirname, "./wlan/static/views/data/acknowledgments.txt"), 'utf8');

    let faqArray = dataFile.split("---\n")

    // convert to individual data
    let faqJsonData = faqArray.map(p=>{
        let entity = p.split("\n")

        if (entity[0]!="name:"){ // to skip empty data
            let data = {
                "name": entity[0].replace("name: ", ""),
                "photo": entity[1].replace("photo: ", ""),
                "website": entity[2].replace("website: ", ""),
                "content": entity[3].replace("content: ", "")
            }
            return data
        } else {
            return null
        }

    })
    console.log(faqJsonData);
    response.render("acknowledgments.ejs", {
        "text": JSON.stringify(faqJsonData)
    })
})

app.get("/FAQs", (request, response) => {
    var dataFile = fs.readFileSync(path.join(__dirname, "./wlan/static/views/data/FAQs.txt"), 'utf8');

    let faqArray = dataFile.split("---\n")

    // convert to individual data
    let faqJsonData = faqArray.map(p=>{
        let faq = p.split("\n")

        if (faq[0]!="question:"){ // to skip empty data
            let data = {
                "question": faq[0].replace("question: ", ""),
                "answer": faq[1].replace("answer: ", "")
            }
            return data
        } else {
            return null
        }

    })
    console.log(faqJsonData);

    response.render("FAQs.ejs", {
        "text": JSON.stringify(faqJsonData)
    })
})


// app.get("/", (request, response) => {
// 	var dataFile = fs.readFileSync(path.join(__dirname, "./solution/static/data/ECS152A/solution.json"), 'utf8');
// 	dataFile = JSON.stringify(dataFile)
// 	dataFile = dataFile.replace(/\\n/g, "\\n")
// 					   .replace(/\\'/g, "\\'")
// 					   .replace(/\\"/g, '\\"')
// 					   .replace(/\\&/g, "\\&")
// 					   .replace(/\\r/g, "\\r")
// 					   .replace(/\\t/g, "\\t")
// 					   .replace(/\\b/g, "\\b")
// 					   .replace(/\\f/g, "\\f");
// 	dataFile = encodeURIComponent(dataFile)
// 	dataFile = decodeURIComponent(dataFile)
// 	dataFile = JSON.parse(dataFile)
//
// 	// let solution = JSON.parse(dataFile)
// 	response.render("index.ejs", {
// 		pageTitle: dataFile
// 	})
// })


app.listen(port, ()=>{
    console.log(`Express server listening on port ${port}`)
})
