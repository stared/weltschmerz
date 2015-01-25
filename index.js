
// I will change to input
var ageMin = 12;
var ageMax = 20;

var queryBegin = "http://suggestqueries.google.com/complete/search?client=chrome&q=";
var queryEnd = "&callback=?";

var allSuggestions = [];

d3.select('#go').on('click', function () {
  allSuggestions = [];
  var query = d3.select('#query').attr('value');
  fetchForAge(query, ageMin, ageMax);
});

function fetchForAge (query, age, ageMax) {

  var queryFilled = query.replace("X", age);
  console.log("Quering for: ", queryFilled);

  $.getJSON(queryBegin + queryFilled + queryEnd, function (data) {

    var suggestions = data[1].filter(function (d) {
      d.indexOf(queryFilled) > -1;
    });
    allSuggestions.push({
      age:         age,
      suggestions: suggestions
    });

    if (age < ageMax) {
      fetchForAge (query, age + 1, ageMax);
    } else {
      draw();  // later it will be updated with each step
    }

  });

}

function draw () {

  var svg = d3.select('#plot').append('svg')
    .attr('width', 800)
    .attr('height', 600);

  //

} 