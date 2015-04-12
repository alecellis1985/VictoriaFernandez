//Data
//var cities = [
//    {
//        city : 'Toronto',
//        desc : 'This is the best city in the world!',
//        lat : 43.7000,
//        long : -79.4000
//    },
//    {
//        city : 'New York',
//        desc : 'This city is aiiiiite!',
//        lat : 40.6700,
//        long : -73.9400
//    },
//    {
//        city : 'Chicago',
//        desc : 'This is the second best city in the world!',
//        lat : 41.8819,
//        long : -87.6278
//    },
//    {
//        city : 'Los Angeles',
//        desc : 'This city is live!',
//        lat : 34.0500,
//        long : -118.2500
//    },
//    {
//        city : 'Las Vegas',
//        desc : 'Sin City...\'nuff said!',
//        lat : 36.0800,
//        long : -115.1522
//    }
//];
/*
 * Element exmpl 
  [{
        city : 'Toronto',
        desc : 'This is the best city in the world!',
        lat : 43.7000,
        long : -79.4000
    }]
 */
Professionals.directive('mapCtrl', function () {
    return {
        restrict:'E',
        scope:{
            //mapId:'@',
//            mapOptions:'=',
//            locations:'='
        },
//        replace:true,
        template:'<div class="GoogleMap"></div>',
        link:function($scope,element,attr){
            //default is montevideo
            $scope.mapOptions = $scope.mapOptions || {
                zoom: 13,
                center: new google.maps.LatLng(-34.8746349,-56.1472729),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            $scope.map = new google.maps.Map(element.find('div')[0], $scope.mapOptions);

            $scope.markers = [];

            var infoWindow = new google.maps.InfoWindow();

            
            google.maps.event.addListener($scope.map, 'click', function(event) {
                $scope.placeMarker(event.latLng);
            });
            
            $scope.placeMarker = function(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: $scope.map
                });
                //$scope.map.setCenter(location);
                $scope.markers.push(marker);
            };
            
            var createMarker = function (info){

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    title: info.city
                });
                marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open($scope.map, marker);
                });

                $scope.markers.push(marker);
            };  

            if($scope.locations !== undefined)
            {
                var length = $scope.locations.length;

                for (var i = 0; i < length; i++){
                    createMarker($scope.locations[i]);
                }
            }

            $scope.openInfoWindow = function(e, selectedMarker){
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            };
        }
    };

    

});

Professionals.directive('mapSetMarkers', function () {
    return {
        restrict:'E',
        scope:{
            markersArr:'='
        },
        template:'<div class="GoogleMap"></div>',
        link:function($scope,element,attr){
            //Default is montevideo
            $scope.mapOptions = $scope.mapOptions || {
                zoom: 13,
                center: new google.maps.LatLng(-34.8746349,-56.1472729),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            $scope.map = new google.maps.Map(element.find('div')[0], $scope.mapOptions);

            google.maps.event.addListener($scope.map, 'click', function(event) {
                $scope.placeMarker(event.latLng);
            });
            
            $scope.placeMarker = function(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: $scope.map
                });
                //$scope.map.setCenter(location);
                $scope.markersArr.push(marker);
            };

            $scope.openInfoWindow = function(e, selectedMarker){
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            };
        }
    };
});