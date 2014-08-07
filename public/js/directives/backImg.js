angular.module('barbot').directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg?'./img/drinks/'+attrs.backImg:'./img/noimage.png';
        element.css({
            'background-image': 'url(' + url +')',
        });
    };
});