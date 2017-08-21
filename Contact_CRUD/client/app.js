(function() {
  'use strict';

  var app = angular.module('contactsApp', []);
  var emptyDetails = '';
  app.controller('contactsController', function($scope, $http) {

    //redirect to main page
    $http.get('http://localhost:3001/api/contacts')
      .then(function(response) {
        $scope.contacts = response.data;
    });
    
    //save contacts
    $scope.saveContact = function(contact) {
      $http.post('http://localhost:3001/api/contacts', contact)
        .then(function(response) {
          $scope.contacts.push(response.data);
          $scope.contact = emptyDetails;
      });
    };

    //refresh page after successful transaction
    $scope.refresh = function(){
      $http.get('http://localhost:3001/api/contacts')
            .then(function(response){
              $scope.contacts = response.data;
      });
    };

    $scope.getButtonId = function(event) {
      console.log(event.currentTarget.getAttribute("data-id"));
      event.currentTarget.getAttribute("data-id");
    };

    //delete contacts
    $scope.deleteOrModifyContact = function(contact) {
      $http({ url: 'http://localhost:3001/api/contacts/' + contact._id, 
      method: 'DELETE'             
      }).then(function(res) {
        // Update list
        $scope.refresh();
      }, function(error) {
        console.log(error);
      });
    };

    //update contacts
    $scope.updateContact = function(contact) {

    };
  });
})();