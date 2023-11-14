// let imageUpload = document.getElementById("image");
let ourCanvas;

function setup() {
    ourCanvas = createCanvas(400, 400);
}

function draw() {
if (mouseIsPressed) {
fill(0);
} else {
fill(255);
}
ellipse(mouseX, mouseY, 80, 80);
}

function mousePressed() {



let imageBase64String = ourCanvas.elt.toDataURL();

document.getElementById('imageData').value = imageBase64String;


var ourImage = new Image();
ourImage.src = imageBase64String


}




//  fetchEntries();




//function for loading external entries.
function fetchEntries() {

    //get from servier
    $.getJSON("/json", function(r){


        //empty the current entries (this is for when people upload a new file)
        $("#entries").empty().css({"opacity":"0"});
        

        //for each entry in the json feed...
        for (i=0;i<r.length;i++) {    
            thumb = '/uploads/thumbnails/'+r[i].filename;
            big = '/uploads/large/'+r[i].filename;

            //make a div, load in data and append to #entries
            $("<div></div>")
                .addClass("entry")
                .attr("id",r[i]._id)
                .attr("data-img",big)
                .attr("data-student",r[i].student)
                .attr("data-instructor",r[i].instructor)
                .append("<img src='"+thumb+"'>")
                .append("<h3>"+r[i].student+"</h3>")
                //.append("<h2>"+r[i].filename+"</h2>")
                .appendTo("#entries");

            
        }


        $("#entries").css({"opacity":"1"});
    });
}

//open modal window when you click on an entry
$(document).on("click",".entry", function(){
    $("#popout").addClass("active");
    $(".interior--img").attr("src",$(this).data("img"));
    window.location.hash=$(this).attr("id")
})




//close modal window

$(document).on("click",".close", function(){
    $(".interior--img").attr("src","");
    $(".cover").removeClass("active");
    window.location.hash="";
    
})


$(document).on( 
    'keydown', function(event) { 
      if (event.key == "Escape") { 
        $(".interior--img").attr("src","");
        $(".cover").removeClass("active");
        window.location.hash="";
      } 
  }); 



    setTimeout(function(){
        if (window.location.hash != "") { $(window.location.hash).click() }
    },500)
    
