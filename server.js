var express = require ('express');
var fs = require ('fs');
var request = require ('request');
var cheerio = require ('cheerio');
var app = express();

app.get ('/scrape', function(req, res){

  url = 'https://www.imdb.com/title/tt0848228/?ref_=fn_al_tt_1';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json ={title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text();

        json.title = title;

      })

      $('.ratingValue').filter(function(){
        var data = $(this);

        rating = data.text();

        json.rating = rating;
      })
    }
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('file sucessfully written!')
    })
    res.send('Check your console')
  })

})

app.listen('8081')
console.log('Server running on port 8081')
exports = module.exports = app;