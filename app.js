var dob = document.querySelector("#birth-date");
var btn1 = document.querySelector("#check-btn");
var result = document.querySelector("#output-div");

btn1.addEventListener('click', clickHandler);

function clickHandler(e) {
	var bdayStr = dob.value;

	if (bdayStr !== '') {
		var listOfDates = bdayStr.split('-');
		var date = {
			day: Number(listOfDates[2]),
			month: Number(listOfDates[1]),
			year: Number(listOfDates[0])
		};
		var isPalindrome = palindromeDateFormats(date);

		if (isPalindrome) {
			result.innerText = "Yess, your birthday is a palindrome";
		}else {
			var [count, nextDate] = nextPalinDate(date);
			result.innerHTML = "Sorry, not a palindrome, the next palindrome date is " + nextDate.day + "-" + nextDate.month + "-" + nextDate.year + " and you missed it by only " + count + " days";
		}

	}
	else{
		result.innerText = "Please enter the birthdate!!";
	}

}

function stringReverse(str) {
	var splitList = str.split('');
	var reversedStr = splitList.reverse();
	var reversedDate = reversedStr.join('');
	return reversedDate;
}

function checkPalindrome(str) {
	var reverse = stringReverse(str);
	return str === reverse;

}



function stringConversion(date) {
	var dateStr = {
		day: '',
		month: '',
		year: ''
	};

	if (date.day < 10) {
		dateStr.day = "0" + date.day;
	} else {
		dateStr.day = date.day.toString();
	}

	if (date.month < 10) {
		dateStr.month = "0" + date.month;
	} else {
		dateStr.month = date.month.toString();
	}

	dateStr.year = date.year.toString();

	return dateStr;
}

function dateFormats(date) {
	var dateStr = stringConversion(date);
	var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
	var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
	var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
	var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
	var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
	var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
	return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function palindromeDateFormats(date) {

	var listOfPalindrome = dateFormats(date);
	var flag = false;

	for (var i = 0; i < listOfPalindrome.length; i++) {
		if (checkPalindrome(listOfPalindrome[i])) {
			flag = true;
			break;
		}
	}

	return flag;
}

function leapYear(year) {
	if (year % 400 === 0) {
		return true;
	}
	if (year % 100 === 0) {
		return false;
	}
	if (year % 4 === 0) {
		return true;
	}
	return false;
}

function getNextDate(date) {
	var day = date.day + 1;
	var month = date.month;
	var year = date.year;
	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (month === 2) {
		if (leapYear(year)) {
			if (day > 29) {
				day = 1;
				month++;
			}
		} else {
			if (day > 28) {
				day = 1;
				month++;
			}
		}
	} else {
		if (day > daysInMonth[month - 1]) {
			day = 1;
			month++;
		}
	}
	if (month > 12) {
		month = 1;
		year++;
	}
	return {
		day: day,
		month: month,
		year: year
	};
}

function nextPalinDate(date) {
	var count = 0;
	var nextDate = getNextDate(date);

	while (1) {
		count++;
		var isPalindrome = palindromeDateFormats(nextDate);
		if (isPalindrome) {
			break;
		}
		nextDate = getNextDate(nextDate);
	}
	return [count, nextDate];
}