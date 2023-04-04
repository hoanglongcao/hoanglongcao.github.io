// Get URL parameter from HTML script tag
var scriptTag = document.getElementById("scriptTag");
var url = scriptTag.getAttribute("data-url");

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  document.charset = "UTF-8";
  //document.getElementById("content").innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
  

  if (this.readyState == 4 && this.status == 200) {
    var response = this.responseText;
    var parser = new DOMParser();
    var doc = parser.parseFromString(response, "text/html");
    var articles = doc.getElementsByTagName("article");
    var articleContent = "";

    for (var i = 0; i < articles.length; i++) {
      // Remove header content from article
      var headers = articles[i].getElementsByTagName("header");
      for (var j = 0; j < headers.length; j++) {
        headers[j].innerHTML = "";
      }

      // Add class to images
      var images = articles[i].getElementsByTagName("img");
      for (var j = 0; j < images.length; j++) {
        images[j].classList.add("figure-img", "img-fluid", "rounded");
      }
      // Add class to figcaptions
      var captions = articles[i].getElementsByTagName("figcaption");
      for (var j = 0; j < captions.length; j++) {
        captions[j].classList.add("figure-caption");
      }
      articleContent += articles[i].innerHTML;

    }
    document.getElementById("headline").innerHTML = "";
    document.getElementById("content").innerHTML = articleContent;
  }
};
xhr.open("GET", url, true);
xhr.send();