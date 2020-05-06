document.getElementById("create-button").addEventListener("click", nextStep);

function  nextStep() {
    document.getElementById("form_1").style.display = "none";
    document.getElementById("create-button").style.display = "none";
    document.getElementById("finalResult").style.display = "flex";
    makeCalendar();
}

var hourHTML = "<option value=0>00</option><option value=1>01</option><option value=2>02</option><option value=3>03</option><option value=0>04</option><option value=5>05</option><option value=6>06</option><option value=7>07</option><option value=8>08</option><option value=9>09</option><option value=10>10</option><option value=11>11</option><option value=12>12</option><option value=13>13</option><option value=14>14</option><option value=15>15</option><option value=16>16</option><option value=17>17</option><option value=18>18</option><option value=19>19</option><option value=20>20</option><option value=21>21</option><option value=22>22</option><option value=23>23</option>" ;
var minutesHTML = "<option value=0>00</option><option value=1>15</option><option value=2>30</option><option value=3>45</option>"
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

function makeCalendar() {
    var schedule = getSchedule();
    var lastDiv;

    var calendarDiv = document.getElementById("weekCalendar");
    for(i=0;i<=6;i++){
      let divCreateVer = document.createElement('div');
      divCreateVer.classList.add('day');
      divCreateVer.id = 'd' + i;
      calendarDiv.appendChild(divCreateVer);
      for(j=0;j<=23;j++){
        let divCreateHor = document.createElement('div');
        divCreateHor.classList.add('hour');
        divCreateHor.id = ('h' + i + '.' + j);
        divCreateVer.appendChild(divCreateHor);
        for(k = 0; k <= 3; k++){
            let divCreateMin = document.createElement('div');
            divCreateMin.classList.add('minutes');
            divCreateMin.id = ('m' + i + '.' + j + '.' + k);
            divCreateHor.appendChild(divCreateMin);
            divCreateMin.classList.add('task' + schedule[i][j][k]);
            if (j === 0 && k === 0)
                divCreateMin.classList.add("topExt");
            else if (divCreateMin.classList[1] !== lastDiv.classList[1])
            {
                divCreateMin.classList.add("topExt");
                lastDiv.classList.add("botExt");
            }
            lastDiv = divCreateMin;
        }
      }
    }

    console.log("Calendar Made!");
}

document.getElementById("body").onload = makeHourInputs();