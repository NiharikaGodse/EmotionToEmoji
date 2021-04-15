Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/vOUIODa1l/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speek_data1 = "The First Prediction is" + prediction_1;
    speek_data2 = "The Second Prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speek_data1+speek_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }
        if (results[0].label="sad") {
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if (results[0].label=="angry") {
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        
        if (results[1].label=="happy") {
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if (results[1].label=="sad") {
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if (results[1].label=="angry") {
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}