'use strict';

Professionals.controller('TopPropagandaController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', function ($scope, $routeParams, $http, $rootScope, $location) {
        $scope.template = {
            "topPropaganda": "resources/tpl/topPropaganda.html"
                    //        "about": "aboutus.html",
                    //        "contact": "contactus.html"
        };
        $scope.myInterval = 3000;
        var slides = $scope.slides = [];
        $scope.addSlide = function (url) {
            slides.push({
                image: url,
                text: ['More', 'Extra', 'Lots of'][slides.length % 3] + ' ' +
                        ['Cats', 'Kittys', 'Felines'][slides.length % 3]
            });
        };
//        for (var i = 0; i < 4; i++) {
            $scope.addSlide('http://www.tuprofe.com.uy/blog/wp-content/uploads/2014/10/Seifer-banner.png');
            $scope.addSlide('http://www.tuprofe.com.uy/blog/wp-content/uploads/2014/10/ifc.jpg');
            $scope.addSlide('http://www.tuprofe.com.uy/blog/wp-content/uploads/2014/12/banner_web_CCEE_4.jpg');
//        }
    }]);

