/**
 * @jest-environment jsdom
 */
import {
  filterResult,
  filter,
  resultArrange,
  preSortArrange,
} from "../constant/ResultToDisplay";
import arrayShuffle from "../components/array-shuffle";

const data = require("./test.json");
let filterKey = [];
//create array that contain all answer index
let resultList = Array.from(Array(20).keys());



describe("Result filter and sort", () => {
  //filter result
  //remove index that have same category in an answer(1 category | say no to eat)
  it("blank filter", () => {
    const temp = filterResult(resultList, data, filterKey);
    expect(temp.length).toBe(resultList.length);
  });

  //phone filter = 1 result
  it("1 phone filter", () => {
    const temp = filterResult(resultList, data, "phone");
    expect(temp.length).toBe(1);
  });

  //filter
  //remove index that same category in an answer array
  let filterThaiKey = ["thai"];
  it("multiple filter - remove thai", () => {
    const temp = filter(filterThaiKey,data);
    expect(temp.length).toBe(7);
  });
  //keys are thai and phone
  let filterThaiPhoneKey = ["thai","grill"];
  it("multiple filter - remove thai grill", () => {
    const temp = filter(filterThaiPhoneKey,data);
    expect(temp.length).toBe(6);
  });
  //keys are thai phone and grill
  let filterThaiPhoneGrillKey = ["thai","phone","grill"];
  it("multiple filter - remove thai grill phone", () => {
    const temp = filter(filterThaiPhoneGrillKey,data);
    expect(temp.length).toBe(0);
  });

  //sort
  //resultArrange
  //sort by name
  let toSort = preSortArrange(resultList,data)
  
  let name = [ "a",  "b",  "c",  "d",  "e",  "f",  "g",  "h",  "i",  "j",  "k", "l", "m",  "n",  "o", "p", "q", "r", "s",  "t", " "];
  it("sort by name", () => {
    const temp = resultArrange("Name",toSort);
    let nameSort = [];
    //loop to get all name
    temp.forEach(e => {
      nameSort.push(e.name);
    });
    //prevent error on display screen
    expect(nameSort).toEqual(name);
  });
  

  //sort by nearby (default api sort result)
  it("sort by Nearby", () => {
    const temp = resultArrange("Nearby",toSort);
    expect(temp).toBe(toSort);
  });

  //sort by random (not the same as first result | or can it be?)
  it("sort by Random!", () => {
    const temp = resultArrange("Random!",toSort);
    expect(temp).not.toBe(toSort);
  });

  
  //sort by score
  //reverse arrange from name
  let score = ["t","r", "s", "q", "o", "p", "n", "l", "m", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"];
  it("sort by Score", () => {
    const temp = resultArrange("Score",toSort);
    let scoreSort = [];
    //loop to get all name
    temp.forEach(e => {
      scoreSort.push(e.name);
    });
    expect(scoreSort).not.toBe(score);
  });


}); 



// 0 1 2 3 4 5 6 7 8  9 10 12 11 13 15 14 16 18 17 19
//before sort
// result[].poi.name = [  "a",  "b",  "c",  "d",  "e",  "f",  "g",  "h",  "i",  "j",  "k",  "m",  "l",  "n",  "p",  "o",  "q",  "s",  "r",  "t"]

// after sort by name
// result[].poi.name = [ "a",  "b",  "c",  "d",  "e",  "f",  "g",  "h",  "i",  "j",  "k", "l", "m",  "n",  "o", "p", "q", "r", "s",  "t"]

//preSortArrange
