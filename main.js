song1="";
song2="";
leftx=0;
lefty=0;
rightx=0;
righty=0;
leftWristscore=0;
rightWristscore=0;
song1status="";
song2status="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftx=results[0].pose.leftWrist.x;
        lefty=results[0].pose.leftWrist.y;
        console.log("Left Wrist:");
        console.log("X = "+leftx);
        console.log("Y = "+lefty);
        rightx=results[0].pose.rightWrist.x;
        righty=results[0].pose.rightWrist.y;
        console.log("Right Wrist: X= "+rightx+" , Y= "+righty);

        leftWristscore=results[0].pose.keypoints[9].score;
        rightWristscore=results[0].pose.keypoints[10].score;

    }
}

function draw(){
    image(video,0,0,500,400);

    stroke("red");
    fill("red");
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    if(leftWristscore>0.2){
        song2.stop();
        circle(leftx,lefty,20);
        if(song1status==false){
            song1.play();
            document.getElementById("head").innerHTML="Playing Harry Potter Theme Song";
        }
    }
    if(rightWristscore>0.2){
        song1.stop();
        circle(rightx,righty,20);
        if(song2status==false){
            song2.play();
            document.getElementById("head").innerHTML="Playing Peter Pan Song";
        }
    }

}