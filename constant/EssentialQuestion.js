//List All Question With 4 Choice 
//That Will Be Called before send to the API request

//import { Question } from "../constant/QuestionAndChoiceDirection"

//create array for questions and their 4 choice
const Question = [];
const Ans_up = [];
const Ans_down = [];
const Ans_left = [];
const Ans_right = [];

//Question 1 
Question[0] = "What type of restaurant \n you are going to search?"; 
Ans_up[0] = "Restaurant";
Ans_down[0] = "Bar";
Ans_left[0] = "Bakery";
Ans_right[0] = "Cafe"; 

//Question 2 
Question[1] = "How would you like the \n results to be sorted? "; 
Ans_up[1] = "Score";
Ans_down[1] = "Random!";
Ans_left[1] = "Name";
Ans_right[1] = "Nearby Me"; 

//Question 2 
//Question[2] = "How would you like the \n results to be sorted? "; 
//Ans_up[2] = "Score";
//Ans_down[2] = "Just Random!";
//Ans_left[2] = "Name";
//Ans_right[2] = "Nearby Me"; 

export { Question, Ans_down, Ans_left, Ans_right, Ans_up };


