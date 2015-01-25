
// I will change to input
var ageMin = 12;
var ageMax = 20;

var queryBegin = "http://suggestqueries.google.com/complete/search?client=chrome&q=";
var queryEnd = "&callback=?";

var allSuggestionsRaw = [];

d3.select('#go').on('click', function () {
  allSuggestionsRaw = [];
  var query = d3.select('#query').attr('value');
  fetchForAge(query, ageMin, ageMax);
});

function fetchForAge (query, age, ageMax) {

  var queryFilled = query.replace("X", age);
  console.log("Quering for: ", queryFilled);

  $.getJSON(queryBegin + queryFilled + queryEnd, function (data) {

    var suggestions = data[1]
      .filter(function (d) {
        return d.toLowerCase().indexOf(queryFilled.toLowerCase()) > -1;
      })
      .map(function (d) {
        return d.slice(queryFilled.length + 1);  // so to not have a space
      });

    allSuggestionsRaw.push({
      age:         age,
      suggestions: suggestions
    });

    if (age < ageMax) {
      fetchForAge (query, age + 1, ageMax);
    } else {
      draw(processData(allSuggestionsRaw));  // later it will be updated with each step
    }

  });

}

function processData (allSuggestionsRaw) {
  var suggestionDict = {};

  allSuggestionsRaw.forEach(function (byAge) {
    byAge.suggestions.forEach(function (suggestion) {
      if (suggestion in suggestionDict) {
        suggestionDict[suggestion].push(byAge.age);
      } else {
        suggestionDict[suggestion] = [byAge.age];
      }
    });
  });

  var suggestionArray = [];
  var k;

  for (k in suggestionDict) {
    suggestionArray.push({
      suggestion: k,
      ages:       suggestionDict[k], 
    })
  }

  suggestionArray = suggestionArray.sort(function (a, b) {
    return b.ages.length - a.ages.length;
  });

  return suggestionArray;

}

function draw (allSuggestions) {

  console.log(allSuggestions);

  var svg = d3.select('#plot').append('svg')
    .attr('width', 800)
    .attr('height', 600);

  // some initial calculations
  


  //

} 