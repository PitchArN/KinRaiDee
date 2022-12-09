import arrayShuffle from "../components/array-shuffle";
//----------------------------------------- Filter
//answerArray
//data

//diplay data check
//console.log("data:");
//console.log(data);
//console.log("data results:");
//console.log(data.results);

//filter trough every index in resultList
//reuseable when update the result list
function filterResult(list, data, filterKey) {
    var jmespath = require("jmespath");
  let tempList = [];
  //run through every index in result list
  for (var i = 0; i < list.length; i++) {
    if (filterKey != "phone") {
      //return array of categories
      let a = jmespath.search(data, "results[" + list[i] + "].poi.categories");
      //console.log(a);
      //loop into categories and check
      if (!a.includes(filterKey)) {
        tempList.push(list[i]);
        //var toPush = jmespath.search(data, "{results :results[" + i + "]}");
        //resultList.push(toPush);
      } else {
        //console.log(a);
        //console.log(data.results[list[i]].poi.name + " -- removed");
      }
      //phone filter
    } else {
      let a = jmespath.search(data, "results[" + list[i] + "].poi.phone");
      if (a != null) {
        tempList.push(list[i]);
      } else {
        //console.log(
          //data.results[list[i]].poi.name + " -- removed due no phone"
        //);
      }
    }
  }
  return tempList;
}

//call this function to filter the data
function filter(answerArray, data) {
  //keep data index that pass the result
  let resultList = [];
  var jmespath = require("jmespath");
  console.log(answerArray);
  //check the result length
  let to = jmespath.search(data, "length(results)");
  //console.log(to);
  //create array that contain all answer index
  resultList = Array.from(Array(to).keys());

  if (answerArray != null) {
    for (const filterKey of answerArray) {
      resultList = filterResult(resultList, data, filterKey);
      //console.log(resultList.length);
    }
  }

  //console.log(resultList);
  return resultList;
}

//brute force test
//loop into every results
/*
  for (var i = 0; i < to; i++) {
    //return array of categories
    let a = jmespath.search(data, "results[" + i + "].poi.categories");
    console.log(a);
    //loop into categories and check
    if (!a.includes("fast food")) {
      console.log(data.results[i].poi.name + " -- not contain fast food");
      //var toPush = jmespath.search(data, "{results :results[" + i + "]}");
      //resultList.push(toPush);
    }
  }
  */

//----------------------------------------- RESULT REARRANGE FOR DISPLAY
//use every result(index) from resultList
//use resultList.foreach() to list all the index we will show
//then put all in a struct array below
function preSortArrange(resultList,data){
    var jmespath = require("jmespath");
    let resultToSort = [];
    resultList.forEach((re) => {
  //use jmespath to reach each data
  //let a = jmespath.search(data,"results["+re+"].poi.phone");
  //data need:
  // id,score,dist
  //  poi. name,phone
  //  position. lat, lon
  //  address. all

  let name = jmespath.search(data, "results[" + re + "].poi.name");
  let id = jmespath.search(data, "results[" + re + "].id");
  let dist = jmespath.search(data, "results[" + re + "].dist");
  let score = jmespath.search(data, "results[" + re + "].score");
  let phone = jmespath.search(data, "results[" + re + "].poi.phone");
  //position
  let lat = jmespath.search(data, "results[" + re + "].position.lat");
  let lon = jmespath.search(data, "results[" + re + "].position.lon");
  resultToSort.push({
    name: name,
    id: id,
    phone: phone,
    score: (score / 20).toFixed(1),
    dist: (dist / 1000).toFixed(2),
    lat: lat,
    lon: lon,
  });
});
    return resultToSort;
}


function resultArrange(sortBy,resultToSort){
    let resultToDisplay = [];
    if (sortBy === "Name") {
        //SORT BY Name (A-Z)
        resultToDisplay = resultToSort.sort(function (a, b) {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        //console.log("sortBy : Name");
      } else if (sortBy === "Score") {
        //SORT BY Score descending
        resultToDisplay = resultToSort.sort(
          (a, b) => parseFloat(b.score) - parseFloat(a.score)
        );
        //console.log("sortBy : Score");
      } else if (sortBy === "Random!") {
        //Random array
        resultToDisplay = arrayShuffle(resultToSort);
        //console.log("sortBy : Random");
      } //SORT BY nearby is already sorted from API
      else {
        resultToDisplay = resultToSort;
      }
      
      resultToDisplay.push({
        name: " ",
        id: " ",
        phone: " ",
        score: " ",
        dist: " ",
        lat: " ",
        lon: " ",
      });
      
      //console.log(resultToDisplay);
      //console.log(resultToDisplay.length);
      return resultToDisplay;
}

export {filterResult,filter,resultArrange,preSortArrange};

//console.log(resultToDisplay);
//----------------------------------------SORTING SECTION

//console.log(sortBy);


