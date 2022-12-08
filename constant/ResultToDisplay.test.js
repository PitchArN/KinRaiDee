/**
 * @jest-environment jsdom
 */
import {filterResult,filter,resultArrange,preSortArrange} from "../constant/ResultToDisplay";
const data = require('test.json');
let filterKey = [];  
//create array that contain all answer index
let resultList = Array.from(Array(20).keys());

//filter result
//phone filter = 1 result
it('blank filter', () => {
    const temp = filterResult(resultList,data,filterKey);
    expect(temp.length).toBe(resultList.length); 
});

//filter




//resultArrange
//before sort
// result[].poi.name = [  "a",  "b",  "c",  "d",  "e",  "f",  "g",  "h",  "i",  "j",  "k",  "m",  "l",  "n",  "p",  "o",  "q",  "s",  "r",  "t"]

// after sort by name
// result[].poi.name = [ "a",  "b",  "c",  "d",  "e",  "f",  "g",  "h",  "i",  "j",  "k", "l", "m",  "n",  "o", "p", "q", "r", "s",  "t"]


//preSortArrange

