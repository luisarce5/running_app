'use strict';

angular.module('TheRunningApp', [])
  .controller('UsersController', UsersController)
  .controller('RunsController', RunsController)

UsersController.$inject = ['$http'];

function UsersController($http){
  let self = this;
  // CRUD functions
  self.all = [];
  self.getAllUsers = getAllUsers; // function () defined below
  self.addUser = addUser; // function () defined below
  self.newUser = {}; // newUser{} gets its data from add-user Form @ index.html and passes it to addUser()
  self.authenticateUser = authenticateUser; // function () defined below
  self.loggedStatus = false;
  self.loginUser = {}; // loginUser{} gets its data from login-User Form @ index.html and passes it to authenticateUser()

  self.currentUserID = [];
  console.log('from Line 20 self.currentUserID: ' + self.currentUserID);
  self.userData = []; // userData[] gets its data from getUser()
  self.getUser = getUser; // function () defined below

  self.editUser = editUser; //  WORK IN PROGRESS
  self.editUserData = {}; //editUserData{} gets it data from edit-user Form @ index.html and passes it to editUser()

  // self.newUserCreated = [];

  self.runData = []; // runData[] gets its data from getRuns()
  self.myRunsData = []; // runData[] gets its data from getRuns()
  self.getRuns = getRuns; // function () defined below

  getAllUsers();
  console.log("just invoked getAllUsers()");

  // ***** Display all Users *****
  function getAllUsers(){
    $http
      .get('http://localhost:3000/users')
      .then(function(response){
        console.log(response.data);
        console.log(response.data[0]);
        self.all = response.data;
      }); // close .then
  } // close function getAllUsers()

  // ***** Add a New User *****
  function addUser(){
    $http
      .post('http://localhost:3000/users/signup', self.newUser)
      .then(function(response){
        getAllUsers(); // do I need this line?
        // self.newUserCreated = true;
    });
  alert("You have succesfully created a new account");
  }

  // ***** Authenticate a User as User logs in *****
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
      getUser();
      console.log('just ran getUser() from inside authenticateUser()');
      self.loggedStatus = true;
      console.log(self.loggedStatus);
    });
  }

  // ***** Get & display the profile of a User  *****
  function getUser(){
    let userID = ($.data(document, "myUserID"));
    console.log("The userID = " + userID);
    $http
    .get('http://localhost:3000/users/'+ userID)
    .then(function(response){
      console.log("Running inside getUser()");
      console.log(response.data);
      self.userData = response.data;
    }); // close .then
    return;
  } // close function getUser()

  //***** Edit User  *****  LATEST ADDITION --- WORK IN PROGRESS
  function editUser(){
    let userID = ($.data(document, "myUserID"));
    console.log("The userID = " + userID);
    $http
    .put('http://localhost:3000/users/'+ userID, self.editUserData)
    .then(function(response){
      console.log("Running inside editUser() PUT method");
    }); // close .then
  } // close function editUser()


  // ***** Get Runs for a specic User by User Id *****
  function getRuns(){
    let userID = ($.data(document, "myUserID"));
    console.log("Inside getRuns() => UserID = " + userID);
      $http
      .get('http://localhost:3000/users/' + userID) // ?????
      .then(function(response){
        console.log("Inside getRuns() => list of User's myRuns listed below:");
        console.log(response.data[0].myRuns);
        self.myRunsData = response.data[0].myRuns;

        for (var i=0; i < self.myRunsData.length; i++) {
        console.log(self.myRunsData[i]);
        };

        var runLoop = function(runItem) {
          $http
          .get('http://localhost:3000/runs/' + runItem)
          .then(function(response){
            console.log("Inside getRuns => data of specific Run listed below:");
            console.log("response.data[0] listed below");
            console.log(response.data[0]);
            self.runData.push(response.data[0]);
            console.log("line below => data of self.runData array:");
            console.log(self.runData);
          }); // close .then of nested $http  ;
        }; // close runLoop

        for (var i=0; i < self.myRunsData.length; i++) {
          var runItem = self.myRunsData[i];
          runLoop(runItem);
        };
      }); // close .then of outter $http
  } // close function getRuns()
} // close function UsersController($http)

// ##### Run Controller #####

RunsController.$inject = ['$http'];

// getRuns();
// console.log('Just ran getRuns() inside RunsController');

function RunsController($http){
  let self = this;
  // Our CREED functions
  self.all = [];
  // self.getAllUsers = getAllUsers; //// function () defined below
  self.addRun = addRun; // function () defined below
  self.newRun = {}; // newRun{} gets its data from add-run Form @ index.html and passes it to addRun()
  // self.editRun = editRun;
  // self.currentUserID = [];

  // self.runData = []; // runData[] gets its data from getRuns() DELETED IN LAST EDIT
  // self.getRuns = getRuns; // function () defined below DELETED IN LAST EDIT

  // getRuns();
  // console.log("just ran getRuns() from inside RunsController");

  function addRun(){
    let userID = ($.data(document, "myUserID"));
    console.log("Inside getRuns() => UserID = " + userID);
    $http
      .post('http://localhost:3000/users/' + userID + '/runs', self.newRun)
      .then(function(response){
    });
  }

  // function getRuns(){
  //   // let userID = ($.data(document, "myUserID"));
  //   // console.log("Inside getRuns() => UserID = " + userID);
  //     $http
  //     .get('http://localhost:3000/users/566e1e394465fc3d65210b1b/runs') // ?????
  //     .then(function(response){
  //       console.log("Running inside getRuns()");
  //       console.log(response.data);
  //       self.runData = response.data;
  //     }); // close .then
  // } // close functin getRuns()

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
