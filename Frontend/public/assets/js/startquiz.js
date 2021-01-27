$.ajaxSetup({
    headers: { 'token': localStorage.token }
});
var x = document.getElementById("snackbar");
x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> switching the tab submits the test`
x.className = "show";
setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
let tabswitch = 0;
let result, questions;
let currentquestion = 0;
let ansdata = []

let buttons = document.getElementById("display")
let heading = document.getElementById("heading")
let time = document.getElementById("timedisplay")
let que = document.getElementById("que")
$(document).ready(function() {
    window.history.forward();

    function noBack() {
        window.history.forward();
    }
});

if (!localStorage.token)
    location.href = '/'
if (localStorage.usertype != "User")
    location.href = '/'
$.ajax({
    url: "/api/quiz/data/" + quizid,
    method: "GET",
    success: function(result1) {

        result = result1
        console.log(result)





        questions = result.data;
        let quenumbers = ``
        for (let i = 0; i < questions.length; i++) {
            quenumbers += `<li onClick=quedisplay('${i}')>${i+1}</li>`
        }
        que.innerHTML = quenumbers
        let code = ``
        for (let i = 0; i < questions.length; i++) {

            let ansObj = {
                quesId: questions[i].questionId,
                selectedOption: null,
            };

            ansdata.push(ansObj)
        }
        let timer = Number(result.scheduledFor) + Number(result.duration) * 60 * 1000;
        if (timer - Date.now() < 0) {
            alert("quiz time elapsed");

            $.ajax({
                url: "/api/quiz/finish",
                method: "PATCH",
                data: { quizId: quizid },
                success: function(result1) {
                    window.location.href = "/ui/dashboard"
                },
                error: function(err) {
                    if (err.responseJSON.message == "Unauthorized access") {
                        location.href = "/ui/dashboard"
                    }
                }
            })


        }


        var x = setInterval(function() {
            var distance = timer - Date.now();
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            time.innerHTML = '<h2 className="rem-time-display">' +
                minutes + " minutes and " + seconds + " seconds</h2>";

            if (distance <= 0) {
                clearInterval(x);
                time.innerHTML = "Time up";
                submitans();
            }
        }, 1);
        code += `<h4 >${questions[currentquestion].description}</h4>
<div class="form-check mt-4">
          <label class="form-check-label" for="radio1">
            <input type="radio" class="form-check-input mb-5" id="radio1" name="ans" value="${questions[currentquestion].options[0].text}" >${questions[currentquestion].options[0].text}
          </label>
        </div>

        <div class="form-check">
          <label class="form-check-label" for="radio2">
            <input type="radio" class="form-check-input mb-5" id="radio2" name="ans" value="${questions[currentquestion].options[1].text}">${questions[currentquestion].options[1].text}
          </label>
        </div>

        <div class="form-check">
          <label class="form-check-label" for="radio3">
            <input type="radio" class="form-check-input mb-5" id="radio3" name="ans" value="${questions[currentquestion].options[2].text}">${questions[currentquestion].options[2].text}
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label" for="radio4">
            <input type="radio" class="form-check-input mb-5" id="radio4" name="ans" value="${questions[currentquestion].options[3].text}">${questions[currentquestion].options[3].text}
          </label>
        </div>
        <div class='mt-4 mb-4'style="background-color:black;height:4px;"></div>

        <div class="row">
    <div class="col">
    </div>
    <div class="col">
    <div class="row">
   
    <div class="col">
    `
        if (currentquestion == (questions.length - 1)) {
            code += `<button type="button" class="btn btn-danger button" onClick=submitpopup()>submit</button>
    </div>
    <div class="col">
    </div>
    </div></div></div>  `
            buttons.innerHTML = code

        } else {
            code += `<button type="button" class="btn btn-danger button" onClick=next()>next</button>
    </div>
    <div class="col">
    </div>
    </div></div></div>  `
            buttons.innerHTML = code

        }
        heading.innerHTML = `<h2 style="color:#2980b9" class="mt-2"> QUESTION ${currentquestion+1} OF ${questions.length}</h2>`

        $('input[type=radio]').change(function() {

            ansdata[currentquestion].selectedOption = this.value;
            // alert($(`li:nth-child(${currentquestion+1})`).hasClass('review'))

            // console.log($(`li:nth-child(${currentquestion+1})`).hasClass('review'))
            if ($(`li:nth-child(${currentquestion+1})`).hasClass('review')) {

            } else {
                $(`li:nth-child(${currentquestion+1})`).css("background-color", 'rgb(108, 165, 76)');
            }
            $(`li:nth-child(${currentquestion+1})`).addClass("answered");



        });


        $('input[name="' + 'ans' + '"][value="' + ansdata[currentquestion].selectedOption + '"]').prop('checked', true);
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState == 'hidden' && !tabswitch) {
                // confirm("Press a button!");
                submitans();
                tabswitch = 1;
            }
        });


    },
    error: function(err) {
        if (err.responseJSON.message == "Unauthorized access") {
            location.href = "/ui/dashboard"
        }
    }
})

function next() {
    currentquestion += 1;
    code = ``;
    code += `<h4 >${questions[currentquestion].description}</h4>
    <div class="form-check mt-4">
<label class="form-check-label" for="radio1">
<input type="radio" class="form-check-input mb-5" id="radio1" name="ans" value="${questions[currentquestion].options[0].text}" >${questions[currentquestion].options[0].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio2">
<input type="radio" class="form-check-input mb-5" id="radio2" name="ans" value="${questions[currentquestion].options[1].text}">${questions[currentquestion].options[1].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio3">
<input type="radio" class="form-check-input mb-5" id="radio3" name="ans" value="${questions[currentquestion].options[2].text}">${questions[currentquestion].options[2].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio4">
<input type="radio" class="form-check-input mb-5" id="radio4" name="ans" value="${questions[currentquestion].options[3].text}">${questions[currentquestion].options[3].text}
</label>
</div>
<div class='mt-4 mb-4'style="background-color:black;height:4px;"></div>
<div class="row">
<div class="col">
<div class="row">
<div class="col">


`
    code +=
        `<button type="button" class="btn btn-primary button" onClick=prev()>previous</button>
</div>  <div class="col"></div> </div>  </div> `
    if (currentquestion == (questions.length - 1)) {
        code += `    <div class="col">
<div class="row">
<div class="col">
<button type="button" class="btn btn-danger button" onClick=submitpopup()>submit</button>
</div><div class="col"></div> </div>  </div></div>`

    } else {
        code += `  <div class="col">
<div class="row">
<div class="col"><button type="button" class="btn btn-danger button" onClick=next('1')>next</button>
</div><div class="col"></div> </div>  </div></div>`

    }
    buttons.innerHTML = code

    heading.innerHTML = `<h2 style="color:#2980b9"class="mt-2"> QUESTION ${currentquestion+1} OF ${questions.length}</h2>`
    $('input[type=radio]').change(function() {

        ansdata[currentquestion].selectedOption = this.value;
        // alert($(`li:nth-child(${currentquestion+1})`).hasClass('review'))

        // console.log($(`li:nth-child(${currentquestion+1})`).hasClass('review'))
        if ($(`li:nth-child(${currentquestion+1})`).hasClass('review')) {

        } else {
            $(`li:nth-child(${currentquestion+1})`).css("background-color", 'rgb(108, 165, 76)');
        }
        $(`li:nth-child(${currentquestion+1})`).addClass("answered");


    });
    $('input[name="' + 'ans' + '"][value="' + ansdata[currentquestion].selectedOption + '"]').prop('checked', true);

}

function prev() {
    currentquestion -= 1;
    code = ` `;
    code += `<h4 >${questions[currentquestion].description}</h4>
    <div class="form-check mt-4">
<label class="form-check-label" for="radio1">
<input type="radio" class="form-check-input mb-5" id="radio1" name="ans" value="${questions[currentquestion].options[0].text}" >${questions[currentquestion].options[0].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio2">
<input type="radio" class="form-check-input mb-5" id="radio2" name="ans" value="${questions[currentquestion].options[1].text}">${questions[currentquestion].options[1].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio3">
<input type="radio" class="form-check-input mb-5" id="radio3" name="ans" value="${questions[currentquestion].options[2].text}">${questions[currentquestion].options[2].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio4">
<input type="radio" class="form-check-input mb-5" id="radio4" name="ans" value="${questions[currentquestion].options[3].text}">${questions[currentquestion].options[3].text}
</label>
</div>
<div class='mt-4 mb-4'style="background-color:black;height:4px;"></div>

`

    if (currentquestion != 0) {
        code +=
            `<div class="row">
  <div class="col">
   <div class="row">
     <div class="col"><button type="button" class="btn btn-primary button" onClick=prev()>previous</button>
     </div>  <div class="col"></div> </div>  </div>`

    } else {
        code += `<div class="row">
<div class="col">
<div class="row">
 <div class="col"> </div>  <div class="col"></div> </div>  </div>`
    }
    if (currentquestion == (questions.length - 1)) {
        code += `<div class="col">
<div class="row">
<div class="col"><button type="button" class="btn btn-danger button" onClick=submitpopup()>submit</button>
</div><div class="col"></div> </div>  </div></div>`
    } else {
        code += `<div class="col">
<div class="row">
<div class="col"><button type="button" class="btn btn-danger button" onClick=next('1')>next</button>
</div><div class="col"></div> </div>  </div></div>`
    }
    buttons.innerHTML = code
    heading.innerHTML = `<h2 style="color:#2980b9"class="mt-2"> QUESTION ${currentquestion+1} OF ${questions.length}</h2>`

    $('input[type=radio]').change(function() {

        ansdata[currentquestion].selectedOption = this.value;
        // alert($(`li:nth-child(${currentquestion+1})`).hasClass('review'))

        // console.log($(`li:nth-child(${currentquestion+1})`).hasClass('review'))
        if ($(`li:nth-child(${currentquestion+1})`).hasClass('review')) {

        } else {
            $(`li:nth-child(${currentquestion+1})`).css("background-color", 'rgb(108, 165, 76)');
        }
        $(`li:nth-child(${currentquestion+1})`).addClass("answered");


    });
    $('input[name="' + 'ans' + '"][value="' + ansdata[currentquestion].selectedOption + '"]').prop('checked', true);

}



function quedisplay(i) {
    currentquestion = parseInt(i);
    code = ``;
    code += `<h4 >${questions[currentquestion].description}</h4>
<div class="form-check mt-4">
<label class="form-check-label" for="radio1">
<input type="radio" class="form-check-input mb-5" id="radio1" name="ans" value="${questions[currentquestion].options[0].text}" >${questions[currentquestion].options[0].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio2">
<input type="radio" class="form-check-input mb-5" id="radio2" name="ans" value="${questions[currentquestion].options[1].text}">${questions[currentquestion].options[1].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio3">
<input type="radio" class="form-check-input mb-5" id="radio3" name="ans" value="${questions[currentquestion].options[2].text}">${questions[currentquestion].options[2].text}
</label>
</div>
<div class="form-check">
<label class="form-check-label" for="radio4">
<input type="radio" class="form-check-input mb-5" id="radio4" name="ans" value="${questions[currentquestion].options[3].text}">${questions[currentquestion].options[3].text}
</label>
</div>
<div class='mt-4 mb-4'style="background-color:black;height:4px;"></div>
<div class="row">
<div class="col">
<div class="row">
<div class="col">


`
    if (currentquestion != 0) {
        code +=
            `<button type="button" class="btn btn-primary button" onClick=prev()>previous</button>
</div>  <div class="col"></div> </div>  </div> `
    } else {
        code +=
            `
</div>  <div class="col"></div> </div>  </div> `
    }
    if (currentquestion == (questions.length - 1)) {
        code += `    <div class="col">
<div class="row">
<div class="col">
<button type="button" class="btn btn-danger button" onClick=submitpopup()>submit</button>
</div><div class="col"></div> </div>  </div></div>`

    } else {
        code += `  <div class="col">
<div class="row">
<div class="col"><button type="button" class="btn btn-danger button" onClick=next('1')>next</button>
</div><div class="col"></div> </div>  </div></div>`

    }
    buttons.innerHTML = code

    heading.innerHTML = `<h2 style="color:#2980b9"class="mt-2"> QUESTION ${currentquestion+1} OF ${questions.length}</h2>`
    $('input[type=radio]').change(function() {

        ansdata[currentquestion].selectedOption = this.value;
        // alert($(`li:nth-child(${currentquestion+1})`).hasClass('review'))

        // console.log($(`li:nth-child(${currentquestion+1})`).hasClass('review'))
        if ($(`li:nth-child(${currentquestion+1})`).hasClass('review')) {

        } else {
            $(`li:nth-child(${currentquestion+1})`).css("background-color", 'rgb(108, 165, 76)');
        }
        $(`li:nth-child(${currentquestion+1})`).addClass("answered");




    });
    $('input[name="' + 'ans' + '"][value="' + ansdata[currentquestion].selectedOption + '"]').prop('checked', true);

}

function submitpopup() {
    let modal = document.getElementById("submitpopup");
    let code = `<p style="text-align:center">Are you sure you want to submit the test?</p>`
    code += `<div class="text-center"><button type="button" class="btn btn-warning" onClick="submitans()">Yes</button>
<button type="button"  class="btn btn-info closepopup">No</button></div>
`
    document.getElementById("displaysubmitpopup").innerHTML = code
    modal.style.display = "block";
    $(".closepopup").click(() => {
        modal.style.display = "none";

    })
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


function submitans() {
    $.ajax({
        url: "/api/quiz/checkSubmission/" + questions[0].quizId,
        method: "GET",
        success: function(result1) {
            $.ajax({
                url: "/api/quiz/check",
                method: "POST",
                data: {
                    quizId: questions[0].quizId,
                    questions: JSON.stringify(ansdata),
                    timeStarted: result.scheduledFor,
                    timeEnded: Date.now(),
                },
                success: function(result) {
                    window.location.href = "/ui/feedbackform/" + questions[0].quizId
                }
            })


        },
        error: function(err) {
            if (err.responseJSON.message == "Unauthorized access") {
                location.href = "/ui/dashboard"
            } else {
                alert(err.responseJSON.message)
                window.location.href = "/ui/result/" + questions[0].quizId
            }
        }
    })

}

function review() {
    $(`li:nth-child(${currentquestion+1})`).css("background-color", 'rgb(255, 184, 0)');
    $(`li:nth-child(${currentquestion+1})`).toggleClass('review');
    if ($(`li:nth-child(${currentquestion+1})`).hasClass('review') == false) {
        if ($(`li:nth-child(${currentquestion+1})`).hasClass('answered')) {
            $(`li:nth-child(${currentquestion+1})`).css("background-color", 'rgb(108, 165, 76)');
        } else {
            $(`li:nth-child(${currentquestion+1})`).css("background-color", '');
        }
    }
}