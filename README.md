# Car Expense Tracker
 Car Expense Tracker is an app developed on Angular - link to the repo :  https://github.com/VeselinAtanasov/JavaScript-Web/tree/master/Angular2JS/EXAM_FINAL/car-expense-tracker
## Idea
 Car Expense Tracker is an application, from which you can track all your cars expenses
 The app allows to create virtual garage and add car/cars to it.For each car you can add its own expenses divided by categories.
 There are build in reporting(based on chart reports) functionality, per car and per garage, which helps to improve user experience. 
## Design
The application is split into three parts
* Main area
    * Static Home page with basic information for the app.
    * User can find login/register option in order to access the application.
* User area
    * Once the user access the application with his/her credentials, is automatically redirected to user home page, where all public user's accounts are accessible.There are options to check each account individually 
    * User can access his own "Garage", from where the user is able to:
		* Create a garage, if he/she doesn't have such. If the user already has created garage it is redirected directly to it.
		* Check garage details - name/description/total amount of cars
		* Add car to the garage 
		* Delete car from the garage
		* Check details about particular car
		* Generate overall report for the garage - pie chart statistics by overall distribution by cars( by money and my percentage), and by overall distributions by category(by money and my percentage)
		* Check particular Car
		* Add expenses for particular car per categories
		* Generate report by particular car - pie chart statistics by money and by percentage per category
* Admin area
    * Admins have access to Admin Panel, from where all admins have access to User Administration functionality and Garages Administration functionality.
    * In User Administration Panel each Admin can:
		* Generate new user in the app
		* Edit user information(username,email) and reset user's password
		* Make particular user also an admin;
		* Remove particular user from admin list
		* Delete user
    * In Garage Administration Panel each Admin can:
		* Delete user's garage and all his relevant data
		* Edit user's garage - change garage picture url/description/garage name
		* Edit particular car - change /name/brand/model/description/initial investment/ car picture url/description/garage
		* Delete car
		* Modify car expenses per category