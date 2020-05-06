document.getElementById("create-button").addEventListener("click", nextStep);

function  nextStep() {
    document.getElementById("form_1").style.display = "none";
    document.getElementById("create-button").style.display = "none";
    document.getElementById("weekCalendar").style.display = "block";
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

function squareCreate() {
    var calendarDiv = document.getElementById("weekCalendar");
    for (i=1;i<=7;i++){
      let divCreateVer = document.createElement('div');
      divCreateVer.classList.add('day', 'day'+i);
      calendarDiv.appendChild(divCreateVer);
      for (j=1;j<=24;j++){
        let divCreateHor = document.createElement('div');
        divCreateHor.classList.add('hour', 'id'+ i + '.' + j);
        divCreateVer.appendChild(divCreateHor);
    }}}
  

document.getElementById("body").onload = makeHourInputs();
document.getElementById("body").onload = squareCreate();