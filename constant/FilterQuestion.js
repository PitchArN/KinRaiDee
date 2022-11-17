//List All Question With 2 Choice 
//These question will be use to filter the result

//create array for questions and their 4 choice that recive from earlier question
// ...Key use to check the condition in the api result 
// ...Key[0] is checking phone number
// ...Key[1++] is checking type of the result in ***category field
const RestaurantQuestion = []; const RestaurantKey =[];
const BakeryQuestion=[]; const BakeryKey=[];
const CafeQuestion=[]; const CafeKey=[];
const BarQuestion=[]; const BarKey=[];


const Restaurant=[];
const Bakery=[];
const Cafe =[];
const Bar = [];

// CategorySet : RESTAURANT
// "Categories" : tons of categories
Restaurant[0] = {Question:"Do you want to call to the restaurant?", Key: "phone"};
//struct include question and key for filter

//nationalities
Restaurant[1] = {Question:"Do you want to eat Chinese food?", Key: "chinese"};
Restaurant[2] = {Question:"Do you want to eat Japanese Food?", Key: "japanese"};
Restaurant[3] = {Question:"Do you want to eat Thai food?", Key: "thai"};
Restaurant[4] = {Question:"Do you want to eat Korean Food?", Key: "korean"};
//catetories
Restaurant[5] = {Question:"Do you want to eat pizza?", Key: "pizza"};
Restaurant[6] = {Question:"Do you want to eat grill?", Key: "grill"};
Restaurant[7] = {Question:"Do you want to eat buffet?", Key: "buffet"};
Restaurant[8] = {Question:"Do you want to eat sushi?", Key: "sushi"};
Restaurant[9] = {Question:"Do you want to eat seafood?", Key: "seafood"};
Restaurant[10] = {Question:"Do you want to eat hot pot?", Key: "hot pot"};
Restaurant[11] = {Question:"Do you want to eat hamburgers?", Key: "hamburgers"};
Restaurant[12] = {Question:"Do you want to eat doughnuts?", Key: "doughnuts"};
Restaurant[13] = {Question:"Do you want to eat organic food?", Key: "organic"};
Restaurant[14] = {Question:"Do you want to eat steak?", Key: "stake house"};
Restaurant[15] = {Question:"Do you want to take away?", Key: "take away"};
Restaurant[16] = {Question:"Do you want to eat barbecue?", Key: "barbecue"};
Restaurant[17] = {Question:"Do you want to eat snacks?", Key: "snacks"};
Restaurant[18] = {Question:"Do you want to eat chicken?", Key: "chicken"};
Restaurant[19] = {Question:"Do you want to go to a cafeteria?", Key: "cafeterias"};

//Bakery
// CategorySet : SHOP 
// "Categories" : "food drinks: bakers"
Bakery[0] = {Question:"Do you want to call to the bakery?",Key:"phone"};//phone filter


//Cafe
// CategorySet : CAFE_PUB
// "Categories" : "cafe", "cafe/pub" , "tea house" , "coffee shop"
Cafe[0] = {Question:"Do you want to call to the cafe?",Key:"phone"};//phone filter
Cafe[1] = {Question:"Do you want to go tea house?",Key:"tea house"};
Cafe[2] = {Question:"Do you want to go coffee shop?",Key:"coffee shop"};


//Bar
// CategorySet : NIGHTLIFE
// "Categories" : "bar" , "wine bar" , "cocktail bar" , "nightlife"
Bar[0]={Question:"Do you want to call to the bar?",Key:"phone"};//phone filter
Bar[1]={Question:"Do you want to go wine bar?",Key:"wine bar"};
Bar[2]={Question:"Do you want to go cocktail bar?",Key:"cocktail bar"};

/* In Case of old code 
// CategorySet : RESTAURANT
// "Categories" : tons of categories
RestaurantQuestion[0]="Do you want to call to the restaurant?";//phone filter
RestaurantKey[0] ="phone";
//nationalities (categories)
RestaurantQuestion[1]="Do you want to eat Chinese food?";       RestaurantKey[1] ="chinese";
RestaurantQuestion[2]="Do you want to eat Thai food?";          RestaurantKey[2] ="thai";
RestaurantQuestion[3]="Do you want to eat Japanese Food?";      RestaurantKey[3] ="japanese";
RestaurantQuestion[4]="Do you want to eat Korean Food?";        RestaurantKey[4] ="korean";
//categories
RestaurantQuestion[5]="Do you want to eat pizza?";              RestaurantKey[5] ="pizza";
RestaurantQuestion[6]="Do you want to eat grill?";              RestaurantKey[6] ="grill";
RestaurantQuestion[7]="Do you want to eat buffet?";             RestaurantKey[7] ="buffet";
RestaurantQuestion[8]="Do you want to eat sushi?";              RestaurantKey[8] ="sushi";
RestaurantQuestion[9]="Do you want to eat seafood?";            RestaurantKey[9] ="seafood";
RestaurantQuestion[10]="Do you want to eat hot pot?";           RestaurantKey[10] ="hot pot";
RestaurantQuestion[11]="Do you want to eat hamburgers?";        RestaurantKey[11] ="hamburgers";
RestaurantQuestion[12]="Do you want to eat doughnuts?";         RestaurantKey[12] ="doughnuts";
RestaurantQuestion[13]="Do you want to eat organic food?";      RestaurantKey[13] ="organic";
RestaurantQuestion[14]="Do you want to eat steak?";             RestaurantKey[14] ="stake house";
RestaurantQuestion[15]="Do you want to take away?";             RestaurantKey[15] ="take away";
RestaurantQuestion[16]="Do you want to eat barbecue?";          RestaurantKey[16] ="barbecue";
RestaurantQuestion[17]="Do you want to eat snacks?";            RestaurantKey[17] ="snacks";
RestaurantQuestion[18]="Do you want to eat chicken?";           RestaurantKey[18] ="chicken";
RestaurantQuestion[19]="Do you want to go to a cafeteria?";     RestaurantKey[19]="cafeterias";

//Bakery
// CategorySet : SHOP 
// "Categories" : "food drinks: bakers"
BakeryQuestion[0]= "Do you want to call to the bakery?";//phone filter
BakeryKey[0]="phone";

//Cafe
// CategorySet : CAFE_PUB
// "Categories" : "cafe", "cafe/pub" , "tea house" , "coffee shop"
CafeQuestion[0]="Do you want to call to the cafe?";//phone filter
CafeKey[0]="phone";

CafeQuestion[1]= "Do you want to go tea house?"; CafeKey[1]="tea house";
CafeQuestion[2]= "Do you want to go coffee shop?"; CafeKey[2]="coffee shop";

//Bar
// CategorySet : NIGHTLIFE
// "Categories" : "bar" , "wine bar" , "cocktail bar" , "nightlife"
BarQuestion[0]="Do you want to call to the bar?";//phone filter
BarKey[0]="phone";

BarQuestion[1]="Do you want to go wine bar?";BarKey[1]="wine bar";
BarQuestion[2]="Do you want to go cocktail bar?";BarKey[2]="cocktail bar";

*/


export { Restaurant,Bakery,Cafe,Bar};