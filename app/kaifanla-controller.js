var kfctrl=angular.module('kaifanlaController',[]);
//首页的控制器
kfctrl.controller('startCtrl',function($scope,$location){
  //点击图片跳转到main页面
  $scope.jump=function(p){
    $location.path(p);
  }
});

//主页面的控制器
kfctrl.controller('mainCtrl',function($scope,$location,$http,dishService){
  //获取服务中存储的过滤状态
  $scope.filtertext = dishService.filtertext||'';
  //如果服务中不存在原始数据
  if(!dishService.dishes){
    //控制按钮‘加载更多’文本显示模式
    $scope.addtext = true;
    //控制按钮‘没有更多数据’文本显示
    $scope.changeMode = true;
    //将按钮状态存储到dishService
    dishService.addtext = $scope.addtext;
    dishService.changeMode = $scope.changeMode;

    //从服务器获取数据
    $http.get('js/list.json').success(function(data){
      $scope.arr=data;
      console.log('sucess');
      //将菜单数组初始值存储到dishService中，dishes存储的是切换页面时的arr状态，origin存储的是所有请求到的arr值
      dishService.dishes = $scope.arr;
      dishService.origin = $scope.arr;
    }).error(function(){
      console.log('failed');
    });
  }else{
    //如果服务中存在原始数据
    $scope.addtext = dishService.addtext;
    $scope.changeMode = dishService.changeMode;
    $scope.arr = dishService.dishes;
  }

  //点击‘搜索’按钮，对菜单list进行检索
  $scope.filterList = function(){
    //获取input中输入的过滤文本
    var filter = ($scope.filtertext+'').split(' ').join('').trim();
    //将过滤文本存储到dishService中
    dishService.filtertext = $scope.filtertext;

    if(!!filter){
      //如果过滤文本不为空，对arr进行过滤
        $scope.arr = $scope.arr.filter(function(value,index,arr){
          var v = value.name.slice(1,-1);
          return v.indexOf(filter)>-1;
        });
      //将过滤结果存储到dishService中
      dishService.dishes =  $scope.arr;
    }else{
      //过滤文本为空时，将dishSer中存储的所有的arr赋值取出来
      $scope.arr = dishService.origin;
      //存储arr当前状态
      dishService.dishes =  $scope.arr;
    }
  };

  //点击‘加载更多’按钮时的操作
  $scope.addMore = function(){
    if($scope.changeMode){
      $scope.addtext = false;
      clearTimeout(timer);
      var timer = setTimeout(function(){
        $http.get('data/list1.json').success(function(data){
            $scope.addtext = true;
            dishService.origin = dishService.origin.concat(data);
            $scope.arr = $scope.arr.concat(data);
            var filter = ($scope.filtertext+'').trim();
            if(!!filter){
              $scope.arr = $scope.arr.filter(function(v,i,a){
                var val = v.name.slice(1,-1);
                return val.indexOf(filter)>-1;
              });
            }
            $scope.changeMode = false;
            dishService.dishes = $scope.arr;
        }).error(function(){
          console.log('failed');
        });
      },2000);
    }else{
      $scope.changeMode = true;
      $scope.addtext = false;
      clearTimeout(timer1);
      var timer1 = setTimeout(function(){
        console.log('loading');
        $scope.$apply(function(){
          $scope.changeMode = false;
          $scope.addtext = true;
        });
      },2000);
    }
  };
});
//详情页的控制器
kfctrl.controller('detailCtrl',function($scope,$http,$routeParams){
  $scope.user = '';
  $scope.pwd = '';
  $http.get('js/list.json').success(function(data){
    for(var i=0;i<data.length;i++){
      if(data[i].id==$routeParams.dno){
        $scope.dish=data[i];
        break;
      }
    }
  });
  if(!$scope.dish){
    $http.get('data/list1.json').success(function(data){
      for(var i=0;i<data.length;i++){
        if(data[i].id==$routeParams.dno){
          $scope.dish=data[i];
          break;
        }
      }
    })
  }
});

kfctrl.controller('giveorderCtrl',function($scope,$location){
  $scope.jump=function(p){
    $location.path(p);
  }
});
