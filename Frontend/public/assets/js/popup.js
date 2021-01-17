function mylogin() {
    document.getElementById("pop").innerHTML = `
    <div id="myModal" class="modal">
    <div class="modal-content" style="background:azure">
    <div><b class="dia">Are you a student or an organizer?</b>
    <br />
    <a href="/ui/login/user"><button class="btns" type="button" style="color:white; margin-left:20%; margin-right:12%; background:dodgerblue">Student</button></a>
    <a href="/ui/login/organizer"><button class="btno" type="button" style="color:white;background:Red;margin-right:16%;">Organizer</button></a>
    </div>
    </div>`

    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.backgroundColor = "azure";
        }
    }
    document.body.style.backgroundColor = "darkgray";

}

function mysignup() {
    document.getElementById("pop").innerHTML = `
    <div id="myModal" class="modal">
    <div class="modal-content" style="background:azure">
    <div><b class="dia">Are you a student or an organizer?</b>
    <br />
    <a href="/ui/signup/user"><button class="btns" type="button" style="color:white; margin-left:20%; margin-right:12%; background:dodgerblue">Student</button></a>
    <a href="/ui/signup/organizer"><button class="btno" type="button" style="color:white;background:Red;margin-right:16%;">Organizer</button></a>
    </div>
    </div>`

    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.backgroundColor = "azure";
        }
    }
    document.body.style.backgroundColor = "darkgray";
}