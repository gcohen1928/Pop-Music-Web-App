// Created by Gabriel Cohen 

//Requires express, cheerio and axios
const express = require('express')
const app = express(); 
const cheerio = require('cheerio')
const { default: axios } = require('axios');
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//Array element to store songs, artists and ranks
let billboards = []

//Method to make a get req to billboards website
//Parses through data with cheerio.js to find data
//Adds data to billboards arr
const webScrape =  async () => {
    await axios.get('https://www.billboard.com/charts/hot-100')
    .then(response => {
        const $ = cheerio.load(response.data);
        //Finds and adds rank number to array
        $(".chart-element__rank__number").each(function(i) {
            //console.log($(this).text())
            billboards.push({'rank': $(this).text()})
        })
        //Finds and adds song name to array
        $(".chart-element__information__song").each(function (i){
            billboards[i].song = $(this).text()
        })
        //Finds and adds artist name to array
        $(".chart-element__information__artist").each(function (i){
            billboards[i].artist = $(this).text()
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
//Creates header so it can make request
//Had to add this in because I kept getting an error message when receving get request
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

//Defines get path and return billboards array
app.get('/api/top-100', async (req, res) => {
    await webScrape();
    res.send(billboards);
})


