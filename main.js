song = "";
leftWristy= 0;
rightWristy= 0;
scoreleftwrist= 0;

leftWristx= 0;
rightWristx= 0;


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}


function draw(){
    image (video,0,0,600,500);

    fill('#800080');
    stroke("#800080");

        if(scoreleftwrist > 0.2){

    circle(leftWristx,leftWristy,20);
    InNumberleftWristy = Number(leftWristy);
    remove_decimals = floor(InNumberleftWristy);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = " + scoreleftwrist);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log(" leftWristx = " + leftWristx + " leftWristy = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log(" rightWristx = " + rightWristx + " rightWristy = " + rightWristy);
    }
}