angular.module('zfpxchat').directive('autoScrollToBottom',function(){
    return {
        link:function(scope,element,attrs){
           scope.$watch(function(){
               return element.children().length;
           },function(){
               element.animate({
                   //prop(取元素固有属性) = attr(自定义属性)
                   scrollTop:element.prop('scrollHeight')
               },500);
           });
        }
    }
});