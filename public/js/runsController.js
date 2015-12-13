'use strict';
angular.module('TheRunningApp', [])
  .controller('RunsController', RunsController);

RunsController.$inject = ['$http'];

function RunsController($http){
  let self = this;
  // Our CREED functions
  self.all = [];
  self.addUse

}


 ######## AJAX ###########

{ // Create a new User
  url: '/users/signup',
  method: 'POST',
}

{ // verify a User
url: '/users/authenticate'
method: "POST"
data: user
}

{ // User views his profile
  ur: '/users/' + myId
}

{ // User edits his profile
  url: "users/" + currentUserID,
method: "PUT",

{ // Edit existing User
  url: "users/" + currentUserID,
  method: "PUT"
}
