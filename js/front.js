document.getElementById("next-button").addEventListener("click", nextStep1);
document.getElementById("overlay").addEventListener("click", overlay);
document.getElementById("start-button").addEventListener("click", displayForm);

var prevTask


function displayForm() {
    document.getElementById("d-box").classList.add("hidden");
    document.getElementById("d-name").classList.add("hidden");
    document.getElementById("start-button").classList.add("hidden");
    setTimeout(displayForm2, 1000);
}

function displayForm2() {
    document.getElementById("d-box").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    document.getElementById("phone").classList.remove("hidden");
    document.getElementById("phone").classList.add("visible");
}

function overlay(evt) {
    var type = evt.currentTarget.classList[0];
    var task = evt.currentTarget.classList[1][4];

    if (type == "minutes")
    {
        var hours = getTaskOfDay(evt.currentTarget.id);
        if (hours[0] === 0)
            hours[0] = '00';
        else if (hours[0] === 24)
            hours[0] = '00';
        if (hours[2] === 0)
            hours[2] = '00';
        else if (hours[2] === 24)
            hours[2] = '00';
        document.getElementById("over-text").innerHTML = taskMessage[task];
        document.getElementById("over-hour").innerHTML = hours[0] + ':' + hours[1] + '0' + ' - ' + hours[2] + ':' + hours[3] + '0';
        document.getElementById("over-details").innerHTML = overDetails[task]
        document.getElementById("over-square").classList.remove(prevTask);
        document.getElementById("over-square").classList.add(evt.currentTarget.classList[1]);
        document.getElementById("overlay").style.display = "block";
        console.log(evt.currentTarget.classList);
        prevTask = evt.currentTarget.classList[1];
        console.log(hours[2]);
    }
    else
    {
        document.getElementById("overlay").style.display = "none";
        console.log("hiding...");
    }
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

function  nextStep1() {
    console.log("done");
    document.getElementById("form_1").style.display = "none";
    document.getElementById("next-button").innerHTML = "Next";
    document.getElementById("next-button").removeEventListener("click", nextStep1);
    document.getElementById("next-button").addEventListener("click", nextStep2);
    document.getElementById("form_2").style.display = "block";
}

function  nextStep2() {
    console.log("done");
    document.getElementById("form_2").style.display = "none";
    document.getElementById("next-button").innerHTML = "Get your schedule";
    document.getElementById("next-button").removeEventListener("click", nextStep2);
    document.getElementById("next-button").addEventListener("click", finalResult);
    document.getElementById("form_3").style.display = "block";
}

function  finalResult() {
    // document.getElementById("form_3").style.display = "none";
    // document.getElementById("next-button").style.display = "none";
    // document.getElementById("finalResult").style.display = "block";
    makeCalendar();
    displayCalendar();
}

function displayCalendar() {
    document.getElementById("form_3").classList.add("hidden");
    document.getElementById("next-button").classList.add("hidden");
    document.getElementById("finalResult").classList.add("hidden");
    document.getElementById("phone").classList.add("hidden");
    setTimeout(displayCalendar2, 1000);
}

function displayCalendar2() {
    document.getElementById("next-button").style.display = "none";
    document.getElementById("form_3").style.display = "none";
    document.getElementById("finalResult").style.display = "block";
    setTimeout(displayCalendar3, 200);
}

function displayCalendar3() {
    document.getElementById("phone").classList.remove("hidden");
    document.getElementById("phone").classList.add("visible");
    document.getElementById("finalResult").classList.remove("hidden");
    document.getElementById("finalResult").classList.add("visible");
}

var hourHTML = "<option value=6>06</option><option value=7>07</option><option value=8>08</option><option value=9>09</option><option value=10>10</option><option value=11>11</option><option value=12>12</option><option value=13>13</option><option value=14>14</option><option value=15>15</option><option value=16>16</option><option value=17>17</option><option value=18>18</option><option value=19>19</option><option value=20>20</option><option value=21>21</option><option value=22>22</option><option value=23>23</option>" ;
var minutesHTML = "<option value=0>00</option><option value=1>30</option>"

function makeHourInputs() {
    var hourdivs = document.getElementsByClassName("selectHours");
    var minutedivs = document.getElementsByClassName("selectMinutes");
    for(var i = 0; i < hourdivs.length; i++) {
        hourdivs[i].innerHTML = hourHTML;
        minutedivs[i].innerHTML = minutesHTML;
    }
    console.log("Hours and Minutes divisions filled!");
}

function getSchedule() {
    var workStartHour = Number(document.getElementById("startwork-h").value);
    var workStartMin = Number(document.getElementById("startwork-m").value);
    var workEndHour = Number(document.getElementById("stopwork-h").value);
    var workEndMin = Number(document.getElementById("stopwork-m").value);
    var lunchH = Number(document.getElementById("lunch-h").value);
    var lunchM = Number(document.getElementById("lunch-m").value);
    var dinnerH = Number(document.getElementById("dinner-h").value);
    var dinnerM = Number(document.getElementById("dinner-m").value);
    var workArray = [document.getElementById("workDay0").checked,
                     document.getElementById("workDay1").checked,
                     document.getElementById("workDay2").checked,
                     document.getElementById("workDay3").checked,
                     document.getElementById("workDay4").checked,
                     document.getElementById("workDay5").checked,
                     document.getElementById("workDay6").checked];
    var exerciseAct = document.getElementById("exercise-act").value;
    var zenAct = document.getElementById('zen-act').value;

    if (exerciseAct !== "")
        taskMessage[8] = exerciseAct;
    if (zenAct !== "")
        taskMessage[9] = zenAct;

    var schedule = generateSchedule(workStartHour, workStartMin, workEndHour, workEndMin, workArray, lunchH, lunchM, dinnerH, dinnerM);
    return schedule;
}


var taskMessage = ['<p>wake-up</p>',
                   '<p> </p>',
                   '<p>work</p>',
                   '<p>break</p>',
                   '<p>Evening</p>',
                   '<p>Lunch</p>',
                   '<p>Dinner</p>',
                   '<p>FreeTime</p>',
                   '<p>Exercise</p>',
                   '<p>Yoga</p>',
                   '<p>Crea Time</p>',
                   '<p>Free Time</p>'];

var overDetails = [`<p>No better way to start the day than with a shower and breakfast. <br > Why not listen to a podcast?</p><div class="overlay-buttons"><form action="https://www.bbc.co.uk/podcasts" target="_blank" style="display: inline-block"><input class="button" type="submit" value="LISTEN NOW"/></form></div>`,
                    `<p>Have a good night!</p><div class="overlay-buttons"><form action="https://www.nhs.uk/live-well/sleep-and-tiredness/10-tips-to-beat-insomnia/" target="_blank" style="display: inline-block"><input class="button" type="submit" value="TROUBLE SLEEPING?"/></form></div>`,
                    `<p>Try to set up yourself in a specific area only for work. <br >How about some piano instrumental?</p><div class="overlay-buttons"><form action="https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" target="_blank" style="display: inline-block"><input class="button" type="submit" value="LISTEN NOW"/></form></div>`,
                    '<p>Time to breath.<br >Spend some time away from your work environment</p>',
                    `<p>A day well spent.<br> Try some calmer activities and go to bed whenever you feel ready.</p>`,
                    `<p>Wether you'd like to order or looking <br />for some inspiration to cook, we have you covered!</p><div class="overlay-buttons"><form action="https://www.ubereats.com/" target="_blank" style="display: inline-block"><input class="button" type="submit" value="ORDER"/></form><form action="https://www.marmiton.org/" target="_blank" style="display: inline-block"><input class="button" type="submit" value="COOK"/></form></div>`,
                    `<p>Wether you'd like to order or looking <br />for some inspiration to cook, we have you covered!</p><div class="overlay-buttons"><form action="https://www.ubereats.com/" target="_blank" style="display: inline-block"><input class="button" type="submit" value="ORDER"/></form><form action="https://www.marmiton.org/" target="_blank" style="display: inline-block"><input class="button" type="submit" value="COOK"/></form></div>`,
                    `<p>This is your time! Do anything you enjoy.<br > Watch a series, play games, ...</p> <div class="overlay-buttons"><form action="https://worldoftanks.eu/" target="_blank" style="display: inline-block">    <input class="button" type="submit" value="LET'S PLAY!"/></form></div>`,
                    `<p>A sane body leads to a sane mind.<br>Time to maintain your body physically!</p><div class="overlay-buttons"><form action="https://fiit.tv/" target="_blank" style="display: inline-block"> <input class="button" type="submit" value='GET "FIIT"'/></form></div>`,
                    `<p>Get fitter and healthier <br >with the most popular exercise in the world.</p><div class="overlay-buttons"><form action="https://www.dailyyoga.com/" target="_blank" style="display: inline-block">    <input class="button" type="submit" value='GET ZEN'/></form></div>`,
                    '<p>Crea Time</p>',
                    `<p>This is your time! Do anything you enjoy.<br > Watch a series, play games, ...</p> <div class="overlay-buttons"><form action="https://worldoftanks.eu/" target="_blank" style="display: inline-block">    <input class="button" type="submit" value="LET'S PLAY!"/></form></div>`];


function makeCalendar() {
    var schedule = getSchedule();
    var lastDiv;

    var calendarDiv = document.getElementById("weekCalendar");
    for(i=0;i<=6;i++){
      let divCreateVer = document.createElement('div');
      divCreateVer.classList.add('day');
      divCreateVer.id = 'd' + i;
      calendarDiv.appendChild(divCreateVer);
      for(j=6;j<=23;j++){
        let divCreateHor = document.createElement('div');
        divCreateHor.classList.add('hour');
        divCreateHor.id = ('h' + i + '.' + j);
        divCreateVer.appendChild(divCreateHor);
        for(k = 0; k <= 1; k++){
            let divCreateMin = document.createElement('div');
            divCreateMin.classList.add('minutes');
            divCreateMin.id = ('m' + i + '.' + j + '.' + k);
            divCreateHor.appendChild(divCreateMin);
            divCreateMin.classList.add('task' + schedule[i][j][k]);
            divCreateMin.addEventListener("click", overlay);
            if (j === 6 && k === 0)
            {
                divCreateMin.classList.add("topExt");
                divCreateMin.innerHTML = taskMessage[schedule[i][j][k]];
            }
            else if (divCreateMin.classList[1] !== lastDiv.classList[1])
            {
                divCreateMin.classList.add("topExt");
                if (schedule[i][j][k] !== 1)
                    divCreateMin.innerHTML = taskMessage[schedule[i][j][k]];
                lastDiv.classList.add("botExt");
            }
            lastDiv = divCreateMin;
        }
      }
    }

    console.log("Calendar Made!");
}

document.getElementById("body").onload = makeHourInputs();