'use strict';
angular.module('TheRunningApp', [])
  .controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
  let self = this;
  // Our CREED functions
  self.all = [];
  self.getAllUsers = getAllUsers; //// function () defined below
  self.addUser = addUser; // function () defined below
  self.newUser = {}; // newUser{} gets its data from add-user Form @ index.html and passes it to addUser()
  self.authenticateUser = authenticateUser; // function () defined below
  self.loginUser = {}; // loginUser{} gets its data from login-User Form @ index.html and passes it to authenticateUser()

  // new code lines below - WORK IN PROGRESS

  self.currentUserID = [];
  console.log('from Line 20 self.currentUserID: ' + self.currentUserID);

  // self.userData = [];
  // console.log("Here is the userData from line 21");
  // console.log(userData);

  self.getUser = getUser; // function () defined below

  // END OF WORK IN PROGRESS

  // self.editUser = editUser;

  getAllUsers();
  // getUser();

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
    });
    // getUser();
  }

  function getUser(){
    $http
    .get('http://localhost:3000/users/' + currentUserID )
    .then(function(response){
      console.log("Running inside getUser()");
      console.log(response.data);
      self.userData = response.data;
    });

  }

// pending to define currentUserID

} // close function UsersController($http)



// function getUser(){
//   $http
//     .get('http://localhost:3000/users/' = myID)
//     .then()
// } √√√ √√√ √√√ √√√ √√√
//
//  ######## AJAX ###########
//
//  { // Create/Add a new User
//   url: '/users/signup',
//   method: 'POST',
// } √√√ √√√ √√√ √√√ √√√
//
// { // verify a User
// url: '/users/authenticate'
// method: "POST"
// data: user
// } √√√ √√√ √√√ √√√ √√√
//
// { // User views his profile
//   url: '/users/' + myId
// }
//
// { // User edits his profile
//   url: "users/" + currentUserID,
// method: "PUT",
