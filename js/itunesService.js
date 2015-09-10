var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

    this.getArtistData = function (artist) {
        var deferred = $q.defer()
        console.log(4444444, deferred)
        $http({
            method: 'JSONP',
            url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
        }).then(function (response) {
            var artistData = response.data.results;
            var artistArr = [];
            for(var i = 0; i < artistData.length; i++){
                artistArr.push({
                    AlbumArt: artistData[i].artworkUrl60,
                    Artist: artistData[i].artistName,
                    Collection: artistData[i].collectionName ,
                    CollectionPrice: artistData[i].collectionPrice,
                    Play: artistData[i].previewUrl,
                    Type: artistData[i].kind
                });
            }
            deferred.resolve(artistArr);
        });

        return deferred.promise;
    }
});
