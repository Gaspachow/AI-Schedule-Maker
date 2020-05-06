
const taskEnum = Object.freeze(
	{
		WAKEUP_TIME: 0,
		SLEEP: 1,
		WORK: 2,
		BREAK: 3,
		BREAKFAST: 4,
		LUNCH: 5,
		DINNER: 6,
		LEISURE: 7,
		EXERCISE: 8,
		YOGA: 9,
		CREATIVE_TIME: 10
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

function fillDay(schedule, task, day, startHour, startMin, lengthHour, lengthMinute)
{
	var shiftBegin = 0;
	//handle edge cases where you don't start at X00
	var a = 0
	if (startMin > 0 && lengthHour > 0)
	{
		a = startMin;
		while (a < 4)
			schedule[day][startHour][a++] = task;
		a = 0;
		while (a < startMin)
			schedule[day][startHour + lengthHour][a++] = task;
		shiftBegin = 1;
	}
	if (lengthMinute > 0)
	{
		a = startMin;
		while (a < 4 && lengthMinute > 0)
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
		for (var k = 0; k < 4; k++)
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

function generateSchedule(workStartHour, workStartMin, workEndHour, workEndMinute, workArray)
{
	//setup schedule with only sleep
	var schedule = [];
	for (var i = 0; i < 7; i++)
	{
		schedule[i] = []
		for (var j = 0; j < 24; j++)
		{
			schedule[i][j] = []
			for (var k = 0; k < 4; k++)
				schedule[i][j][k] = taskEnum.SLEEP;
		}
	}

	//fill work hours
	for (var l = 0 ; l < workArray.length; l++)
	{
		if (workArray[l])
			schedule = fillDay(schedule, taskEnum.WORK, l, workStartHour, workStartMin, workEndHour - workStartHour, workEndMinute - workStartMin);
		//check if morning break is possible
		if (12 * 4 + 2 - (workStartHour * 4 + workStartMin) > 12)
			schedule = fillDay(schedule, taskEnum.BREAK, l, 10, 1, 0, 1);
	}
	//fill lunch hours
	schedule = fillWeek(schedule, taskEnum.LUNCH, 12, 2, 1, 0);
	return schedule;
}

//var s = generateSchedule(9, 0, 17, 0, [true, true, true, true, true, false, false]);