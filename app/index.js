var kaifan=angular.module('kaifanla',['ngRoute','ngAnimate','kaifanlaController','kaifanlaService','kaifanlaFilter']);
kaifan.config(function($routeProvider){//���õ�ǰģ�飬����·�ɹ���
    $routeProvider.when('/start',{
      templateUrl:'view/start.html',
      controller:'startCtrl'
    })
      .when('/main',{
        templateUrl:'view/main.html',
        controller:'mainCtrl'//controller����Ϊ����Ƭ�ζ�ȡ���趨����
      })
      .when('/detail/:dno',{
        templateUrl:'view/detail.html',
        controller:'detailCtrl'
      })
      .when('/giveorder',{
        templateUrl:'view/giveorder.html',
        controller:'giveorderCtrl'
      })
      .otherwise({
        redirectTo:'/start'
      })
  });

kaifan.directive('mySubmit',function(){
  return {
    restrict : 'A ',
    link : function(scope,element,attr){
      element.on('click',function(e){
        e.preventDefault();
        var self = $(this);
        self.parents('#myModal').modal('hide');
      });
    }
  };
});

