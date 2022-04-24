 
var actionBody
var responses = ""

////////////////////////////////////////////////////////
//                Setting Video Markers               //
////////////////////////////////////////////////////////

 // load video object
      var video = videojs('example_video_1', {
        "playbackRates": [ 0.25, 0.5, 1, 1.5, 2]
      });

      //load markers
      video.markers({
        markers: [
          {time: 27,  text: "Quiz 1"},
          {time: 46,  text: "Quiz 2"},
          {time: 58,  text: "Quiz 3"},
          {time: 71,  text: "Quiz 4"},
          {time: 116,  text: "Quiz 5"}
        ]
      });

// Video With Markers Docs
// http://videojs.com/advanced/
// http://docs.videojs.com/docs/api/player.html
// https://github.com/peter-hank/video-with-markers


////////////////////////////////////////////////////////
//            Constructing Quiz Questions             //
////////////////////////////////////////////////////////

// Quiz Question 1

Survey
    .StylesManager
    .applyTheme("default");

var json1 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "What is the robot trying to tell the worker?",
            isRequired: true,
            colCount: 1,
            choices: [
                "I am doing nothing and waiting for the next action.",
                "Here is the plastic corner for you.",
                "I am looking at you doing the task.",
                "No, it is wrong.",
                "Yes, it is correct.",
                "I don't understand what you are doing.",
                "You need to work faster."
            ]
        }
    ]
};

window.survey1 = new Survey.Model(json1);
survey1
    .onComplete
    .add(function (result) {
        actionBody = String("[{" + result.data.car +"},");
        responses = String(responses) + actionBody;
        //sendData();
    });


$("#surveyElement1").Survey({model: survey1});


// Quiz Question 2

Survey
    .StylesManager
    .applyTheme("default");

var json2 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "What is the robot trying to tell the worker?",
            isRequired: true,
            colCount: 1,
            choices: [
                "I am doing nothing and waiting for the next action.",
                "Here is the plastic corner for you.",
                "I am looking at you doing the task.",
                "No, it is wrong.",
                "Yes, it is correct.",
                "I don't understand what you are doing.",
                "You need to work faster."
            ]
        }
    ]
};

window.survey2 = new Survey.Model(json2);
survey2
    .onComplete
    .add(function (result) {
        actionBody = String("{" + result.data.car +"},");
        responses = String(responses) + actionBody;
        //sendData();
    });


$("#surveyElement2").Survey({model: survey2});

// Quiz Question 3

Survey
    .StylesManager
    .applyTheme("default");

var json3 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "What is the robot trying to tell the worker?",
            isRequired: true,
            colCount: 1,
            choices: [
                "I am doing nothing and waiting for the next action.",
                "Here is the plastic corner for you.",
                "I am looking at you doing the task.",
                "No, it is wrong.",
                "Yes, it is correct.",
                "I don't understand what you are doing.",
                "You need to work faster."
            ]
        }
    ]
};

window.survey3 = new Survey.Model(json3);
survey3
    .onComplete
    .add(function (result) {
        actionBody = String("{" + result.data.car +"},");
        responses = String(responses) + actionBody;
        //sendData();
    });


$("#surveyElement3").Survey({model: survey3});

// Quiz Question 4

Survey
    .StylesManager
    .applyTheme("default");

var json4 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "What is the robot trying to tell the worker?",
            isRequired: true,
            colCount: 1,
            choices: [
                "I am doing nothing and waiting for the next action.",
                "Here is the plastic corner for you.",
                "I am looking at you doing the task.",
                "No, it is wrong.",
                "Yes, it is correct.",
                "I don't understand what you are doing.",
                "You need to work faster."
            ]
        }
    ]
};

window.survey4 = new Survey.Model(json4);
survey4
    .onComplete
    .add(function (result) {
        actionBody = String("{" + result.data.car +"},");
        responses = String(responses) + actionBody;
        //sendData();
    });


$("#surveyElement4").Survey({model: survey4});



// Quiz Question 5

Survey
    .StylesManager
    .applyTheme("default");

var json5 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "What is the robot trying to tell the worker?",
            isRequired: true,
            colCount: 1,
            choices: [
                "I am doing nothing and waiting for the next action.",
                "Here is the plastic corner for you.",
                "I am looking at you doing the task.",
                "No, it is wrong.",
                "Yes, it is correct.",
                "I don't understand what you are doing.",
                "You need to work faster."
            ]
        }
    ]
};

window.survey5 = new Survey.Model(json5);
survey5
    .onComplete
    .add(function (result) {
        actionBody = String("{" + result.data.car +"}]");
        responses = String(responses) + actionBody;
        console.log(responses);
        //sendData();
    });


$("#surveyElement5").Survey({model: survey5});






////////////////////////////////////////////////////////
//            Video Player Interaction                //
////////////////////////////////////////////////////////
$(".vjs-progress-control vjs-control").click(function(){
  hideQuiz();
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none"); 
  $("#surveyElement3").css("display", "none"); 
  $("#surveyElement4").css("display", "none"); 
  $("#surveyElement5").css("display", "none"); 
});


$(".vjs-control-bar").click(function(){
  hideQuiz();
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none");
  $("#surveyElement3").css("display", "none"); 
  $("#surveyElement4").css("display", "none"); 
  $("#surveyElement5").css("display", "none"); 
});


$("video").click(function(){
  hideQuiz();
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none");
  $("#surveyElement3").css("display", "none"); 
  $("#surveyElement4").css("display", "none"); 
  $("#surveyElement5").css("display", "none"); 
});

var submissions = 0;
$(".sv_complete_btn").click(function(){
  submissions++;
  video.currentTime(v.currentTime+1);
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none");
  $("#surveyElement3").css("display", "none"); 
  $("#surveyElement4").css("display", "none"); 
  $("#surveyElement5").css("display", "none"); 
  video.play(); 
  // if(submissions >=2){
  //   $("button").attr('class', 'btn btn-primary');
  //   localStorage.setItem("watched1", "true")
  // }
});



function hideQuiz(){
  if($("#surveyElement1").css("display") == "block"
  || $("#surveyElement2").css("display") == "block"
  || $("#surveyElement3").css("display") == "block"
  || $("#surveyElement4").css("display") == "block"
  || $("#surveyElement5").css("display") == "block"){
    console.log("hide quiz");
    $("#surveyElement1").css("display", "none");
    $("#surveyElement2").css("display", "none");
    $("#surveyElement3").css("display", "none"); 
    $("#surveyElement4").css("display", "none"); 
    $("#surveyElement5").css("display", "none"); 
    video.currentTime(v.currentTime+2);
    video.play();
  }
}


////////////////////////////////////////////////////////
//               Logging User Behavior                //
////////////////////////////////////////////////////////

// from https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

var v = document.getElementsByTagName("video")[0];

// Pause Events
v.addEventListener("pause", function() { 
  console.log("pause at: " + v.currentTime);
  actionBody = String("pause at: " + v.currentTime);
  //sendData(); 
}, true);


// Play Events
v.addEventListener("play", function() {
    console.log("play at: " + v.currentTime);
    actionBody = String("play at: " + v.currentTime);
    //sendData(); 
  }, true);


// Rate Change Events
v.addEventListener("ratechange", function() { 
  console.log("rate change to: " + v.playbackRate);
  actionBody = String("rate change to: " + v.playbackRate);
  //sendData(); 
}, true);


// Seeking Events
// https://stackoverflow.com/questions/29090378/how-to-get-the-starting-point-of-a-seeking-event-in-html5-video#
v.addEventListener('timeupdate', function(e){
var that = this;
(function(){
  setTimeout(function(){
    that.BP=that.currentTime;
    }, 500);
  }).call(that);}
  );

v.addEventListener('seeking', function(e){
  actionBody = String('seekFrom = '+this.BP+
        " seekTo = "+this.currentTime);
  //sendData();
  })
function log(txt){console.log(txt)}


// Tab Visibility
var tabCount = 0;
document.addEventListener("visibilitychange", function() {
  console.log( document.visibilityState );
  video.pause();
  if(document.visibilityState == "hidden"){
    tabCount += 1
    actionBody = String("hidden " + tabCount);
    //sendData();
    alertify.confirm("Warning: You left the tab " + tabCount + " times.", function () {
          // user clicked "ok"
      }, function() {
          // user clicked "cancel"
    }).set('basic', true).closeOthers();
  } else {    
    actionBody = String("visible");
    //sendData();
  }
});




////////////////////////////////////////////////////////
//               Delivering Questions                 //
////////////////////////////////////////////////////////
// https://stackoverflow.com/questions/19355952/make-html5-video-stop-at-indicated-time
v.addEventListener("timeupdate", function(){
    if(this.currentTime >= 27 && this.currentTime <= 28) {
        // console.log("Quiz");
        this.pause();
        $("#surveyElement1").css("display","block");
        console.log("Question 1 delivered");
        actionBody = String("Question 1 delivered");
        //sendData();
    } else if (this.currentTime >=46 && this.currentTime <= 47) {
        // console.log("Quiz");
        video.pause();
        $("#surveyElement2").css("display","block");
        console.log("Question 2 delivered");
        actionBody = String("Question 2 delivered");
        //sendData();
    } else if (this.currentTime >=58 && this.currentTime <= 59) {
        // console.log("Quiz");
        video.pause();
        $("#surveyElement3").css("display","block");
        console.log("Question 3 delivered");
        actionBody = String("Question 3 delivered");
        //sendData();
    } else if (this.currentTime >=71 && this.currentTime <= 72) {
        // console.log("Quiz");
        video.pause();
        $("#surveyElement4").css("display","block");
        console.log("Question 4 delivered");
        actionBody = String("Question 4 delivered");
        //sendData();
    } else if (this.currentTime >=116 && this.currentTime <= 117) {
        // console.log("Quiz");
        video.pause();
        $("#surveyElement5").css("display","block");
        console.log("Question 5 delivered");
        actionBody = String("Question 5 delivered");
        //sendData();
    } else {
      // console.log("No Quiz");
    }
});



////////////////////////////////////////////////////////
//               Enable Next Button                   //
////////////////////////////////////////////////////////
var timeCount = 0;
v.addEventListener("timeupdate", function(){
  timeCount++;
  if(timeCount >= 180){
    $("button").attr('class', 'btn btn-primary');
  }
});



////////////////////////////////////////////////////////
//               Sending Events to Server             //
////////////////////////////////////////////////////////

var videoID = document.title;

var settings;

function sendData() {
  settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://crowd-events.herokuapp.com/api/events",
  "method": "POST",
  "data": {
    "name": name,
    "action": actionBody,
    "video": videoID
  }
}
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}




































































