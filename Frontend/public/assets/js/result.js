function show()
{  var a = [{ correct : 1,
    chosen  : 2,
    option  : 3},
  { correct : 2,
    chosen  : 2,
    option : 4},
  { correct : 3,
    chosen  : 4,
    option  : 4 },
  { correct : 4,
    chosen  : 4,
    option  : 4 }
 ]

 var h="";
 
 for(var i=0;i<a.length;i++)
 { 
    h+=`<div class="container">
            <button type="button" id="question" class="btn" onclick="drop(${i})">
                <p class="para">a</p>`;
              if(a[i].chosen==a[i].correct)
    h+=         `<p class='right'>&#10004</p>`;
              else
    h+=         `<p class='wrong'>&#10060</p>`;
    h+=         `<p class='arrow'>&#9660</p>`;
    h+=      `</button>`; 
    h+=  `<div class="sol">`;
              for(var j=0;j<a[i].option;j++)
              {
                if(j+1==a[i].correct)
                h+=`<p class='odot fa-2x' style="color:green;float:down">&#8857</p>`;
                else if(a[i].chosen==j+1)
                 h+=`<p class='odot fa-2x' style="color:red;float:down">&#8857</p>`;
                else h+=`<p class='odot fa-2x' style="color:grey;float:down">&#8857</p>`;
              }
    h+=   `</div></div>`;
 }
document.getElementById("questions").innerHTML=h;

}
show();


function drop(i)
{ 
var x = document.getElementsByClassName("sol")[i];
var y=  document.getElementsByClassName("question")[i];
var z=  document.getElementsByClassName("arrow")[i];
x.style.width="80%";
if (x.style.display == "none")
   { x.style.display = "block";
     y.style.backgroundColor = "pink !important";
     z.innerHTML = `&#9650`;}
 else {x.style.display = "none";
       y.style.backgroundColor = "rgb(241, 238, 240)";
       z.innerHTML = `&#9660`;}
}