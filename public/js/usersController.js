'use strict';
angular.module('TheRunningApp', [])
  .controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
  let self = this;
  // Our CREED functions
  self.all = [];
  self.getAllUsers = getAllUsers;
  self.addUser = addUser;
  self.newUser = {};

  // self.getUser = getUser;
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
      getAllUsers();
  });
}


} // close function UsersController($http)



// function getUser(){
//   $http
//     .get('http://localhost:3000/users/' = myID)
//     .then()
// }
//
//  ######## AJAX ###########
//
//  { // Create a new User
//   url: '/users/signup',
//   method: 'POST',
// } √√√
//
// { // verify a User
// url: '/users/authenticate'
// method: "POST"
// data: user
// }
//
// { // User views his profile
//   url: '/users/' + myId
// }
//
// { // User edits his profile
//   url: "users/" + currentUserID,
// method: "PUT",
