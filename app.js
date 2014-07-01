var myModule = angular.module('app', []);

myModule.service('ContactService', function() {
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
      contact.id = uid++;
      contacts.push(contact);
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
    contact.id = uid++;
    contacts.push(contact);
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

  //simply returns the contacts list
  this.list = function() {
    return contacts;
  };
});

myModule.controller('ContactController', function($scope, ContactService) {

  $scope.contacts = ContactService.list();

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
})