var app = angular.module('demoApp', ['DataModule', 'AzureDataModule', 'ui.bootstrap']);

/*myModule.service('ContactService', function() {
  

  //to create unique contact id
  var uid = 2;

  //contacts array to hold list of all contacts
  var contacts = [
    { id: 0, 'name': 'World', 'email': 'hello@live.com', 'phone': '123-234-3344' },
    { id: 1, 'name': 'Fred', 'email': 'flintstone@gmail.com', 'phone': '934-123-3444' }];

  //save method create a new contact if not already exists
  //else update the existing object
  this.save = function(contact) {
    if (contact.id === null) {
      //if this is new contact, add it in contacts array
      dataService.add('people', contact, function() {
        $scope.sync();
      }, function() {
        $scope.errorMessage = "Error while creating person...";
      });
    } else {
      //for existing contact, find this contact using id
      //and update it.
      for (var i in contacts) {
        if (contacts[i].id == contact.id) {
          contacts[i] = contact;
        }
      }
    }
  };

  this.new = function(contact) {
    dataService.add('people', contact, function() {
        $scope.sync();
      }, function() {
        $scope.errorMessage = "Error while creating person...";
      });
  };

  //simply search contacts list for given id
  //and returns the contact object if found
  this.get = function(id) {
    for (var i in contacts) {
      if (contacts[i].id == id) {
        return contacts[i];
      }
    }
  };

  //iterate through contacts list and delete 
  //contact if found
  this.delete = function(id) {
    for (var i in contacts) {
      if (contacts[i].id == id) {
        contacts.splice(i, 1);
      }
    }
  };
});*/

app.controller('ContactController', ['$scope', 'dataService', 'azureDataService',
  function($scope, dataService, azureDataService) {
    azureDataService.addSource('https://angularpeople.azure-mobile.net/', 'DDJpBYxoQEUznagCnyYNRYfkDxpYyz90', ['people']);
    dataService.addSource(azureDataService);
    dataService.connect(function(results) {
      for (var result in results) {
        $scope.$apply($scope[result] = results[result]);
      }
    });

    $scope.saveContact = function() {
      ContactService.save($scope.newcontact);
      $scope.newContact.id = null;
      $scope.details = null;
    };

    $scope.newContact = function() {
      ContactService.new($scope.newcontact);
      $scope.newContact.id = null;
      $scope.details = null;
    };

    $scope.deleteContact = function() {
      ContactService.delete($scope.newcontact.id);
      $scope.newContact.id = null;
      $scope.details = null;
    };
    
    $scope.addContact = function() {
      $scope.details = true;
      $scope.newContact.id = null;
    }
    
    $scope.cancelContact = function () {
      $scope.details = null;
      $scope.newContact = {};
    }

    $scope.delete = function(id) {
      ContactService.delete(id);
      if ($scope.newContact.id == id) $scope.newcontact = {};
      $scope.details = null;
    };

    $scope.edit = function(id) {
      $scope.details = true;
      $scope.newContact = angular.copy(ContactService.get(id));
    };
  }] 
);