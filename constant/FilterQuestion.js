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

BarQuestion[1]="Do you want to go wine bar?";CafeKey[1]="wine bar";
BarQuestion[2]="Do you want to go cocktail bar?";CafeKey[2]="cocktail bar";




export { RestaurantQuestion,BakeryQuestion,CafeQuestion,BarQuestion };