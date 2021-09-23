// Created by Gabriel Cohen 

const express = require('express')
const app = express(); 
const cheerio = require('cheerio')
const { default: axios } = require('axios');
app.use(express.urlencoded({extended : true}));
app.use(express.json());


let billboards = []

const webScrape =  async () => {
    await axios.get('https://www.billboard.com/charts/hot-100')
    .then(response => {
        const $ = cheerio.load(response.data);
        
        $(".chart-element__rank__number").each(function(i) {
            //console.log($(this).text())
            billboards.push({'rank': $(this).text()})
        })
        $(".chart-element__information__song").each(function (i){
            billboards[i].song = $(this).text()
        })
        $(".chart-element__information__artist").each(function (i){
            billboards[i].artist = $(this).text()
        })
        $(".chart-element__image").each(function (i){
            const str = $(this).attr("style")
            const start = str.indexOf("'")
            const length = str.lastIndexOf("'") - start
            const url = str.substr(start + 1, length)
            billboards[i].image = url 
        })
    })
    .catch((err) => {
        console.log(err)
        throw err; 
    });
}
  
app.listen(8000, () => {
    console.log("ON PORT 8000");
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.get('/api/top-100', async (req, res) => {
    await webScrape();
    res.send(billboards);
})


