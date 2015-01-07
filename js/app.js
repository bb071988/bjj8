
var myKey = "AIzaSyAvY8gw_9m9K4kfUbASjxJWcgzVjkwImcQ";


var technique ="";

$('.search')

    .on('click', function(){

        $('#response').empty();

        technique = $('input').val();
        if (technique != '') {

           // alert('technique to search is ' + technique)
            searchOnTechnique(technique);
            
            $('input').val(''); // clear the value from the field
        }

        else {alert('Technique cannot be blank');}

        

    });  // end on click function ;


$('.next')

    .on('click', function(){

    //spage = response.nextPageToken;
    //alert('page is set to ' + page);
    $('#response').empty();

    
    searchOnToken(lastResponse.nextPageToken);  // modify to pass the nextPageToken

    });  // end on click function 



$('.prev')

    .on('click', function(){

    //spage = response.nextPageToken;
    //alert('page is set to ' + page);
    $('#response').empty();

    
    searchOnToken(lastResponse.prevPageToken);  // modify to pass the curToken

    });  // end on click function 




// Called automatically when JavaScript client library is loaded.
// step 1. Load the javascript client library.
function onClientLoad() {
        
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad); 
    };   

// Called automatically when YouTube API interface is loaded (see line 9).
//step 2.  Reference the API key
function onYouTubeApiLoad() {

    gapi.client.setApiKey(myKey); //my api key here
    
    };


// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
	//alert('onsearchresponse' + response.nextPageToken);
    nextPage = response.nextPageToken;

    // SAVE CURRENT RESPONSE OBJECT HERE.  TOP LEVEL VARIABLE.  THEN CAN ACCESS ANYTHING HERE.  *********  **********  *********
    lastResponse = response;
   
    showResponse(response);
};


// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
      
  //var sResponse = JSON.stringify(response, '', 2);
  //console.log(sResponse);
   
     
    $(".page").css("display","inline-block");
    for (i = 0; i< response.items.length; i++)
        {
            var link = response.items[i].id.videoId
            var title = response.items[i].snippet.title;

            var description = response.items[i].snippet.description;

            if (! description) {
                description = "No description provided by You Tube";

            }

          
        $('#response').append('<dt>' + '<a href="http://www.youtube.com/watch?v=' + link +'" target="_blank">' + title + "</a>" + '<dt>');
     
        $('#response').append('<dd>' + description + '</dd>');

        }

    };



function searchOnToken(token) 
    {

    var request = gapi.client.youtube.search.list({
            dataType: "JSONP",
            pageToken: token,  
            part: 'id, snippet',
            maxResults: '10',
            order: 'viewCount',
            q: technique,
            regionCode: 'US',
           
        });

    request.execute(onSearchResponse);
    };


function searchOnTechnique(technique)
{

var request = gapi.client.youtube.search.list({
        dataType: "JSONP",
        part: 'id, snippet',
        maxResults: '10',
        order: 'viewCount',
        q: technique,
        regionCode: 'US',
   
    });

    request.execute(onSearchResponse);

};