'use strict';

angular.module('TheRunningApp', [])
  .controller('UsersController', UsersController)
  .controller('RunsController', RunsController)

UsersController.$inject = ['$http'];

// function UsersController($scope) { // Just added
//   $scope.myProfile = true;
//   $scope.logout = true;
// }

function UsersController($http){
  let self = this;
  // Our CREED functions
  self.all = [];
  self.getAllUsers = getAllUsers; //// function () defined below
  self.addUser = addUser; // function () defined below
  self.newUser = {}; // newUser{} gets its data from add-user Form @ index.html and passes it to addUser()
  self.authenticateUser = authenticateUser; // function () defined below
  self.loginUser = {}; // loginUser{} gets its data from login-User Form @ index.html and passes it to authenticateUser()

  self.currentUserID = [];
  console.log('from Line 20 self.currentUserID: ' + self.currentUserID);
  self.userData = [];
  self.getUser = getUser; // function () defined below

  // self.editUser = editUser;

  getAllUsers();

  console.log("just invoked getAllUsers()");

  function getAllUsers(){
    $http
      .get('http://localhost:3000/users')
      .then(function(response){
        console.log(response.data);
        console.log(response.data[0]);
        self.all = response.data;
      }); // close .then
  } // close function getAllUsers()

  function addUser(){
    $http
      .post('http://localhost:3000/users/signup', self.newUser)
      .then(function(response){
        getAllUsers(); // do I need this line?
    });
  }

  function authenticateUser(){
    $http
    .post('http://localhost:3000/users/authenticate', self.loginUser)
    .then(function(response){
      console.log("Running inside authenticateUser()");
      console.log(response.data);
      console.log(response.data.user._id);
      self.currentUserID = response.data.user._id;
      console.log('From authenticateUser() => self.currentUserID = ' + self.currentUserID);
      $.data(document, "myUserID", self.currentUserID);
      console.log("This is myUserID: " + ($.data(document, "myUserID")) );
    });
    getUser();
  }
 // + ($.data(document, "myUserID"))
  function getUser(){
    let userID = ($.data(document, "myUserID"));
    console.log("The userID = " + userID);
    $http
    .get('http://localhost:3000/users/566e1e394465fc3d65210b1b' )
    .then(function(response){
      console.log("Running inside getUser()");
      console.log(response.data);
      self.userData = response.data;
    }); // close .then
  } // close function getUser()

} // close function UsersController($http)


///////// Run controller

RunsController.$inject = ['$http'];

function RunsController($http){
  let self = this;
  // Our CREED functions
  self.all = [];
  // self.getAllUsers = getAllUsers; //// function () defined below
  self.addRun = addRun; // function () defined below
  self.newRun = {}; // newRun{} gets its data from add-run Form @ index.html and passes it to addRun()
  // self.editRun = editRun;

  // self.currentUserID = [];
  // console.log('from Line 20 self.currentUserID: ' + self.currentUserID);
  // self.userData = [];
  // self.getUser = getUser; // function () defined below

  function addRun(){
    $http
      .post('http://localhost:3000/users/566e1e394465fc3d65210b1b/runs', self.newRun)
      .then(function(response){
    });
  }



} // close function RunsController($http)




//  ######## AJAX ###########
//
// function getUser(){
//   $http
//     .get('http://localhost:3000/users/' = myID)
//     .then()
// } √√√ √√√ √√√ √√√ √√√
//
//
//  { // Create/Add a new User
//   url: '/users/signup',
//   method: 'POST',
// } √√√ √√√ √√√ √√√ √√√
//
//
// { // verify a User
// url: '/users/authenticate'
// method: "POST"
// data: user
// } √√√ √√√ √√√ √√√ √√√
//
//
// { // User views his profile
//   url: '/users/' + myId
// } √√√ √√√ √√√ √√√ √√√
//
// *** PENDING PENDING PENDING ***
// { // User edits his profile
//   url: "users/" + currentUserID,
// method: "PUT",
