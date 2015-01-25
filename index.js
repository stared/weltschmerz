
// I will change to input
var ageMin = 12;
var ageMax = 20;

//

d3.select('#go').on('click', function () {
  var query = d3.select('#query').attr('value');
  $.getJSON("http://suggestqueries.google.com/complete/search?client=chrome&q=i am 15 and I&callback=?", function (data) {
    console.log(data);
  })
});

