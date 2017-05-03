var kfservice=angular.module('kaifanlaService',[]);
kfservice.service('dishService',function(){
  this.dishes='';
  this.origion='';
  this.filtertext='';
  this.addtext = '';
  this.changeMode = '';
});