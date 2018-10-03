var questionCount = 0;
var randomNumbers = [];
var correctAns = 0;
var COUPONnumber = 1;
var startTime = "";

var session = new QiSession("192.168.2.101");

var mem;
session.service("ALMemory").done(function (m) {
  mem = m;
});
// // then you can use mem globally


session.service("ALTextToSpeech").done(function (tts){
	tts.say("Application started");
	console.log("I am talking")
});

//session.service("ALBasicAwareness").done(function (aw){
	//aw.setEnabled(true);
	//aw.setEngagementMode("SemiEngaged");
//});
//CONNECTS TO PEPPER


function startProgram(){
	COUPONnumber = parseInt(document.getElementById("COUPON").value);
	document.getElementById("config-view").style.display="none";
	document.getElementById("home-view").style.display="block";
	session.service("ALAnimatedSpeech").done(function (tts){
		tts.say("Welcome to the Music Game");
	});
}

// DISPLAYS THE YES/NO AGE QUESTION ----------------------------
function startAge(){
	document.getElementById("home-view").style.display="none";
	var d = new Date();
	startTime = d.toString();
	document.getElementById("age-view").style.display="block";
	session.service("ALAnimatedSpeech").done(function (tts){
		tts.say(document.getElementById("age-text").innerText);
	});
}
// IF NOT AGE
function noAge(){
	document.getElementById("age-view").style.display="none";
	document.getElementById("home-view").style.display="block";
	document.getElementById("inputTextToSave").value = "TOO YOUNG "+ startTime;
	saveTextAsFile();
	session.service("ALAnimatedSpeech").done(function (tts){
		tts.say("Welcome to the Music Game!");
	});		
}

//GOES TO THE QUIZ YES/NO QUIZ QUESTION
function startQuiz(){
	document.getElementById("age-view").style.display="none"
	document.getElementById("quiz-view").style.display="block";
	session.service("ALAnimatedSpeech").done(function (tts){
		tts.say("Would you like to take a fun little game?");
	});
}

// QUIZ REJECTED ------------------------------------------
function noQuiz(){
	document.getElementById("quiz-view").style.display="none";
	document.getElementById("info").innerHTML=my_app.noquiz;	
	document.getElementById("info-view").style.display="block";
}

// DOWNLOADS THE LOG AFTER SHOWING THAT YOU DID NOT STARTED THE QUIZ
function noQuiz2(){
	questionCount = 0;
	randomNumbers = [];
	correctAns = 0;
	var d = new Date();
	var n = d.toString();
	document.getElementById("inputTextToSave").value = "NOT STARTED "+ startTime + " " + d;	
	saveTextAsFile();	
	document.getElementById("quiz-view").style.display="none";
	document.getElementById("question-view").style.display="none";
	document.getElementById("quiz-view").style.display="none";
	document.getElementById("feedback-view").style.display="none";
	document.getElementById("info-view").style.display="none";	
	document.getElementById("code-view").style.display="none";
	document.getElementById("home-view").style.display="block";
	session.service("ALAnimatedSpeech").done(function (tts){
		tts.say("Welcome to the Music Game!");
	});
}

// STARTS THE QUIZ -----------------------------------------
function startFirstQuestion(){
	randomNumbers = getRandomNumbers();
	document.getElementById("quiz-view").style.display="none";
	document.getElementById("question-view").style.display="block";
	
	var my_question = my_app.questions["q".concat(randomNumbers[questionCount].toString())];
	
	document.getElementById("question").innerHTML=my_question.q;
	document.getElementById("1").innerHTML=my_question.answers.a1;
	document.getElementById("2").innerHTML=my_question.answers.a2;
	document.getElementById("3").innerHTML=my_question.answers.a3;
	document.getElementById("4").innerHTML=my_question.answers.a4;
	document.getElementById("question-pic").src=my_question.img;
	session.service("ALAnimatedSpeech").done(function (tts){
	    tts.say(my_question.q);
	    //tts.say(my_question.song);
        mem.raiseEvent("PlaySong",my_question.song)
	});
}

// ADVANCES IN THE QUESTIONS -------------------------------
function correctQuestion(my_answer){
	// CORRECT THE QUESTION
	var my_question = my_app.questions["q".concat(randomNumbers[questionCount].toString())];
	document.getElementById("question-view").style.display="none";
	document.getElementById("feedback-view").style.display="block";
	
	if(my_answer==my_question.correct){
		correctAns+=1;
		document.getElementById("feedback").innerHTML=my_question.good;
		session.service("ALAnimatedSpeech").done(function (tts) {
		    mem.raiseEvent("MusicGameFeedback", "Happy");
		    mem.raiseEvent("OCCEvents", "_GOOD_EVENT_");
			tts.say(my_question.good);
		});
	} else {
		document.getElementById("feedback").innerHTML=my_question.bad;
		session.service("ALAnimatedSpeech").done(function (tts) {
		    mem.raiseEvent("MusicGameFeedback", "Sad");
		    mem.raiseEvent("OCCEvents", "_BAD_EVENT_");
			tts.say(my_question.bad);
		});		
	}
		// ADD HERE TO SHOW THE CORRECT/WRONG ASNWER DETAILS (THE PHRASE FROM THE WORD)

}

function nextQuestion(){
	// UPDATE QUESTION COUNTER
	questionCount +=1
	// IF IT IS LESS THAN 5 QUESTIONS, SHOW THE NEXT ONE, IF NOT SHOW  THE QR PART
	if(questionCount<=2){
		document.getElementById("feedback-view").style.display="none";			
		document.getElementById("question-view").style.display="block";
		
		var my_question = my_app.questions["q".concat(randomNumbers[questionCount].toString())];
		document.getElementById("question").innerHTML = my_question.q;
		document.getElementById("1").innerHTML=my_question.answers.a1;
		document.getElementById("2").innerHTML=my_question.answers.a2;
		document.getElementById("3").innerHTML=my_question.answers.a3;
		document.getElementById("4").innerHTML=my_question.answers.a4;
		document.getElementById("question-pic").src=my_question.img;
		session.service("ALAnimatedSpeech").done(function (tts){
		    tts.say(my_question.q);
		    //tts.say(my_question.song);
		    mem.raiseEvent("PlaySong", my_question.song)
		});
	
	} else {
		showResults();
	}
}

// SHOW THE RESULTS OF THE QUIZ
function showResults(){
	var my_prize = my_app.coupons["c".concat(correctAns.toString())];
	if(correctAns==0){
		var my_coupon = "";
		COUPONnumber += 1;
		document.getElementById("code").innerHTML=my_coupon;
	} else if(correctAns==1 || correctAns == 2) {
		var my_coupon = "";
		COUPONnumber += 1;
		document.getElementById("code").innerHTML=my_coupon;
	} else if(correctAns==3 || correctAns == 4) {
		var my_coupon = "";
		COUPONnumber += 1;
		document.getElementById("code").innerHTML=my_coupon;
	} else {
		var my_coupon = "";
		COUPONnumber += 1;
		document.getElementById("code").innerHTML=my_coupon;
	}

	document.getElementById("feedback-view").style.display="none";				
	document.getElementById("code-view").style.display = "block";
	document.getElementById("correct-ans").innerHTML = "You answered correcty " + correctAns.toString() + " out of 3 questions";
	session.service("ALAnimatedSpeech").done(function (tts){
	    tts.say("You answered correctly " + correctAns.toString() + " out of 3 questions");
		tts.say("See you again");
	});
	var d = new Date();
	var n = d.toString();
	document.getElementById("inputTextToSave").value = correctAns.toString()+ " " + my_coupon + " " + startTime+ " " + d;
	saveTextAsFile();
}

// GO TO HOME FUNCTION -------------------------------------
function goHome(){
	questionCount = 0;
	randomNumbers = [];
	correctAns = 0;
	var d = new Date();
	var n = d.toString();
	document.getElementById("inputTextToSave").value = "NON FINISHED "+ startTime + " " + d;	
	saveTextAsFile();	
	document.getElementById("quiz-view").style.display="none";
	document.getElementById("question-view").style.display="none";
	document.getElementById("quiz-view").style.display="none";
	document.getElementById("feedback-view").style.display="none";
	document.getElementById("info-view").style.display="none";	
	document.getElementById("code-view").style.display="none";
	document.getElementById("home-view").style.display="block";
	session.service("ALAnimatedSpeech").done(function (tts){
		tts.say("Welcome to the Music Game!");
	});
}

// MANAGES THE BEHAVIOR OF THE HOME BUTTON IN THE LAST SCREEN
function goHomeFinished(){
	questionCount = 0;
	randomNumbers = [];
	correctAns = 0;
	document.getElementById("quiz-view").style.display="none";
	document.getElementById("question-view").style.display="none";
	document.getElementById("quiz-view").style.display="none";
	document.getElementById("feedback-view").style.display="none";
	document.getElementById("info-view").style.display="none";	
	document.getElementById("code-view").style.display="none";
	document.getElementById("home-view").style.display="block";
	session.service("ALAnimatedSpeech").done(function (tts){
	    tts.say("Welcome to the Music Game!");
	});
}

//	SAVE RESULTS FUNCTION -----------------------------------
function saveTextAsFile(){
    var textToWrite = document.getElementById("inputTextToSave").value;
	// var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var d = new Date();
	var n = d.toString();	
    // var fileNameToSaveAs = n;
    // var downloadLink = document.createElement("a");
    // downloadLink.download = fileNameToSaveAs;
	// downloadLink.innerHTML = "Download File";
	// console.log(textToWrite);
	session.service("ALLogger").done(function (logger){
		logger.info("PepperRetail",textToWrite);
	});
	mem.insertData("AppLogger",textToWrite);
    // if (window.webkitURL != null)
    // {
    //     // Chrome allows the link to be clicked
    //     // without actually adding it to the DOM.
    //     downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    // }
    // else
    // {
    //     // Firefox requires the link to be added to the DOM
    //     // before it can be clicked.
    //     downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    //     downloadLink.onclick = destroyClickedElement;
    //     downloadLink.style.display = "none";
    //     document.body.appendChild(downloadLink);
    // }

    // downloadLink.click();
}

//  GET 5 DIFFERENT RANDOM NUMBERS -------------------------
function getRandomNumbers(){
	while(randomNumbers.length < 3){
    	var randomnumber = Math.ceil(Math.random()*3)
    	if(randomNumbers.indexOf(randomnumber) > -1) continue;
    	randomNumbers[randomNumbers.length] = randomnumber;
	}
	return randomNumbers;
}
