var kaifan=angular.module('kaifanla',['ngRoute','ngAnimate','kaifanlaController','kaifanlaService','kaifanlaFilter']);
kaifan.config(function($routeProvider){//配置当前模块，启用路由功能
    $routeProvider.when('/start',{
      templateUrl:'view/start.html',
      controller:'startCtrl'
    })
      .when('/main',{
        templateUrl:'view/main.html',
        controller:'mainCtrl'//controller用于为代码片段读取和设定数据
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

