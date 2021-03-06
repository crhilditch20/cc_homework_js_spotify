var albums;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
};

var populateList = function(albums){
  var div = document.querySelector('#albums');
  var albumList = document.createElement('ul');
  var albumsArray = albums.albums.items;

    albumsArray.forEach(function(album){
      var eachItem = document.createElement('li');
      var anchor = document.createElement('a');
      var link = document.createAttribute('href');
      link.value = album.uri;
      console.log(link);
      anchor.setAttributeNode(link);
      anchor.innerText = album.name;
      eachItem.appendChild(anchor);
      albumList.appendChild(eachItem); 
    });
    div.appendChild(albumList);

}

var requestComplete = function(){
  if(this.status !== 200) return; 
  var jsonString = this.responseText;
  albums = JSON.parse(jsonString); 
  populateList(albums);
  console.log(albums.albums.items[0].name);
};

var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);
}

window.onload = app;