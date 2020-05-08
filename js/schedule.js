
const taskEnum = Object.freeze(
	{
		WAKEUP_TIME: 0,
		SLEEP: 1,
		WORK: 2,
		BREAK: 3,
		EVENING_TIME: 4,
		LUNCH: 5,
		DINNER: 6,
		FREE_TIME: 7,
		EXERCISE: 8,
		YOGA: 9

	});

const day = Object.freeze(
	{
		MONDAY: 0,
		TUESDAY: 1,
		WEDNESDAY: 2,
		THURSDAY: 3,
		FRIDAY: 4,
		SATURDAY: 5,
		SUNDAY: 6
	});

var gSchedule;

function fillDay(schedule, task, day, startHour, startMin, lengthHour, lengthMinute)
{
	var shiftBegin = 0;
	//handle edge cases where you don't start at X00
	var a = 0
	if (startMin > 0 && lengthHour > 0)
	{
		a = startMin;
		while (a < 2)
			schedule[day][startHour][a++] = task;
		a = 0;
		while (a < startMin)
			schedule[day][startHour + lengthHour][a++] = task;
		shiftBegin = 1;
	}
	if (lengthMinute > 0)
	{
		a = startMin;
		while (a < 2 && lengthMinute > 0)
		{
			schedule[day][startHour + lengthHour][a++] = task;
			lengthMinute--;
		}
		a = 0
		while (lengthMinute-- > 0)
			schedule[day][startHour + lengthHour + 1][a++] = task;
	}
	for (var j = startHour + shiftBegin; j < startHour + lengthHour; j++)
	{
		for (var k = 0; k < 2; k++)
			schedule[day][j][k] = task;
	}
	return schedule;
}

function fillWeek(schedule, task, startHour, startMin, lengthHour, lengthMinute)
{
	//0-4 will represent monday to friday
	for (var i = 0; i < 5; i++)
		schedule = fillDay(schedule, task, i, startHour, startMin, lengthHour, lengthMinute);
	return schedule;
}
// id following format: m[i].[j].[k] with i j k being numbers
function getTaskOfDay(time)
{
	time = time.substr(1).split(".");
	var day = parseInt(time[0]);
	var hour = parseInt(time[1]);
	var min = parseInt(time[2]);

	var i, j;
	var startTask = gSchedule[day][hour][min];
	var startHour, startMin, endHour, endMinute;
	var shift = 0;
	startHour = hour;
	startMin = min;
	if (min == 0)
		shift = 1;
	for (i = hour - shift; i >= 0; i--)
	{
		for (j = 1; j >= 0; j--)
		{
			if (gSchedule[day][i][j] == startTask)
			{
				startHour = i;
				startMin = j;
			}
			else
			{
				i = 0;
				break;
			}
		}
	}
	endHour = hour;
	endMin = min;
	shift = 0;
	if (min == 1)
		shift = 1;
	for (i = hour + shift; i < 24; i++)
	{
		for (j = 0; j < 2; j++)
		{
			if (gSchedule[day][i][j] == startTask)
			{
				endHour = i;
				endMinute = j;
			}
			else
			{
				i = 24;
				break;
			}
		}
	}
	if (endMinute == 0)
		endMinute++;
	else
	{
		endHour++;
		endMinute = 0;
	}
	return [startHour, startMin * 3, endHour, endMinute * 3];
}

function generateSchedule(workStartHour, workStartMin, workEndHour, workEndMinute, workArray, lunchHour, lunchMin, dinnerHour, dinnerMin)
{
	//setup schedule with only sleep
	var schedule = [];
	for (var i = 0; i < 7; i++)
	{
		schedule[i] = []
		for (var j = 0; j < 24; j++)
		{
			schedule[i][j] = []
			for (var k = 0; k < 2; k++)
				schedule[i][j][k] = taskEnum.SLEEP;
		}
	}

	//fill work hours
	for (var l = 0 ; l < workArray.length; l++)
	{
		if (workArray[l])
		{
			schedule = fillDay(schedule, taskEnum.WORK, l, workStartHour, workStartMin, workEndHour - workStartHour, workEndMinute - workStartMin);
			var timeUntilLunch = lunchHour * 2 + lunchMin - (workStartHour * 2 + workStartMin);
			//check if morning break is possible
			if (timeUntilLunch >= 6)
				schedule = fillDay(schedule, taskEnum.BREAK, l, workStartHour + Math.floor(timeUntilLunch / 4), 0, 0, 1);
			//check if afternoon break is possible
			if (workEndHour >= 16)
			{
				let time = workEndHour * 2 + workEndMinute - (lunchHour * 2 + lunchMin + 2);
				schedule = fillDay(schedule, taskEnum.BREAK, l, Math.floor((lunchHour * 2 + lunchMin + 2 + time / 2) / 2), time % 2, 0, 1);
			}
			//Add exercice every other day and yoga the rest of days
			if (l % 2 == 0 && workArray[l])
				schedule = fillDay(schedule, taskEnum.EXERCISE, l, workEndHour, workEndMinute, 1, 0);
			else if (l % 2 == 1 && workArray[l])
				schedule = fillDay(schedule, taskEnum.YOGA, l, workEndHour, workEndMinute, 0, 1);
			//add free time after exercise
			var exoEnd = workEndHour * 2 + workEndMinute + (l % 2 == 0? 2: 1);
			var freeTimeLength = dinnerHour * 2 + dinnerMin - exoEnd;
			schedule = fillDay(schedule, taskEnum.FREE_TIME, l, Math.floor(exoEnd / 2), exoEnd % 2, Math.floor(freeTimeLength / 2), freeTimeLength % 2);

			var  timeToWork = workStartHour * 2 + workStartMin;

			//add wake up time
			if (timeToWork > 10 * 2)
			{
				schedule = fillDay(schedule, taskEnum.WAKEUP_TIME, l, 9, 0, 1, 0);
				var timeUntilWork = workStartHour * 2 + workStartMin - 10 * 2;
				if (timeUntilWork > 0)
					schedule = fillDay(schedule, taskEnum.FREE_TIME, l, 10, 0, Math.floor(timeUntilWork / 2), timeUntilWork % 2);
			}
			else
			{
				schedule = fillDay(schedule, taskEnum.WAKEUP_TIME, l, workStartHour - 1, workStartMin, 1, 0);
			}
		}
		else
		{
			schedule = fillDay(schedule, taskEnum.WAKEUP_TIME, l, 9, 0, 1, 0);
			var timeToEat = lunchHour * 2 + lunchMin - 10 * 2;
			schedule = fillDay(schedule, taskEnum.FREE_TIME, l, 10, 0, Math.floor(timeToEat / 2), timeToEat % 2);
			timeToEat = dinnerHour * 2 + dinnerMin - (lunchHour * 2 + lunchMin + 2);
			schedule = fillDay(schedule, taskEnum.FREE_TIME, l, lunchHour + 1, lunchMin, Math.floor(timeToEat / 2), timeToEat % 2);
		}
		//fill evending time
		var timeLeft = 24 * 2 - (dinnerHour * 2 + 2 + dinnerMin);
		schedule = fillDay(schedule, taskEnum.EVENING_TIME, l, dinnerHour + 1, dinnerMin, Math.floor(timeLeft / 2), timeLeft % 2);
	}
	//fill lunch hours
	schedule = fillWeek(schedule, taskEnum.LUNCH, lunchHour, lunchMin, 1, 0);
	schedule = fillDay(schedule, taskEnum.LUNCH, 5, lunchHour, lunchMin, 1, 0);
	schedule = fillDay(schedule, taskEnum.LUNCH, 6, lunchHour, lunchMin, 1, 0);
	//fill dinner hours
	schedule = fillWeek(schedule, taskEnum.DINNER, dinnerHour, dinnerMin, 1, 0);
	schedule = fillDay(schedule, taskEnum.DINNER, 5, dinnerHour, dinnerMin, 1, 0);
	schedule = fillDay(schedule, taskEnum.DINNER, 6, dinnerHour, dinnerMin, 1, 0);
	gSchedule = schedule;
	return schedule;
}

//var s = generateSchedule(9, 0, 17, 0, [true, true, true, true, true, false, false]);
//var t = getTaskOfDay("m0.10.0")