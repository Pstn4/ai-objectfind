video="";
status="";
objects=[];
function preload()
{

}
function setup()
{
canvas=createCanvas(480,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(480,380);
}
function draw()
{
image(video,0,0,480,380);
if (status!="")
{
    objectdetector.detect(video,gotresults);
    for(i=0;i<objects.length;i++)
    {
        document.getElementById("status").innerHTML="objects detected!";
        fill("blue");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("blue");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label==objectname)
        {
            video.stop();
            document.getElementById("num_obj").innerHTML=objectname+" found";
            synth=window.speechSynthesis;
            utterthis=new SpeechSynthesisUtterance(objectname+" found");
            synth.speak(utterthis);
        }
        else{
            document.getElementById("num_obj").innerHTML=objectname+" Not found";
        }
    }
}
}
function start()
{
objectdetector=ml5.objectDetector("cocossd",modelloaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
objectname=document.getElementById("object").value;
}
function modelloaded()
{
    console.log("Model loaded!");
    status=true;
    console.log(objectname);
}
function gotresults(error,results)
{
    if (error)
    {
        console.log(error);

    }
    else
    {
        console.log(results);
        objects=results;
    }
}