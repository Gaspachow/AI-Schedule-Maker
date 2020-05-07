document.getElementById("next-button").addEventListener("click", lastStep);
document.getElementById("overlay").addEventListener("click", overlay);

var prevTask

function overlay(evt) {
    var type = evt.currentTarget.classList[0];
    var task = evt.currentTarget.classList[1][4];

    if (type == "minutes")
    {
        var hours = getTaskOfDay(evt.currentTarget.id);
        document.getElementById("over-text").innerHTML = taskMessage[task];
        document.getElementById("over-hour").innerHTML = hours[0] + ':' + hours[1] + ' - ' + hours[2] + ':' + hours[3] + '0';
        document.getElementById("over-square").classList.remove(prevTask);
        document.getElementById("over-square").classList.add(evt.currentTarget.classList[1]);
        document.getElementById("overlay").style.display = "block";
        console.log(evt.currentTarget.classList);
        prevTask = evt.currentTarget.classList[1];
    }
    else
    {
        document.getElementById("overlay").style.display = "none";
        console.log("hiding...");
    }
}

function  lastStep() {
    console.log("done");
    document.getElementById("form_1").style.display = "none";
    document.getElementById("next-button").innerHTML = "Get your schedule";
    document.getElementById("next-button").removeEventListener("click", lastStep);
    document.getElementById("next-button").addEventListener("click", finalResult);
    document.getElementById("form_2").style.display = "block";
}


function  finalResult() {
    document.getElementById("form_2").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("finalResult").style.display = "block";
    document.getElementsByClassName("dialog-box")[0].style.display = "none";
    makeCalendar();
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
    var workArray = [document.getElementById("workDay0").checked,
                     document.getElementById("workDay1").checked,
                     document.getElementById("workDay2").checked,
                     document.getElementById("workDay3").checked,
                     document.getElementById("workDay4").checked,
                     document.getElementById("workDay5").checked,
                     document.getElementById("workDay6").checked];
    
    var schedule = generateSchedule(workStartHour, workStartMin, workEndHour, workEndMin, workArray);
    return schedule;
}


var taskMessage = ['<p>wake-up</p>',
                   '<p>sleep</p>',
                   '<p>work</p>',
                   '<p>break</p>',
                   '<p>breakfast</p>',
                   '<p>Lunch</p>',
                   '<p>Dinner</p>',
                   '<p>Leisure</p>',
                   '<p>Exercise</p>',
                   '<p>Yoga</p>',
                   '<p>Crea Time</p>'];


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