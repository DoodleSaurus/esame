function calculateTimeDifference(targetDate, includeWeekends = true) {
    const now = new Date();
    const cetOffset = 1 * 60 * 60 * 1000; // CET is UTC+1

    // Convert both dates to CET time zone
    const nowCET = new Date(now.getTime() + cetOffset);
    const targetCET = new Date(targetDate.getTime() + cetOffset);

    let timeRemaining = targetCET - nowCET;

    if (!includeWeekends) {
        // Calculate the number of weekend days between now and the target date
        let weekendDays = 0;
        let currentDate = new Date(nowCET);

        // Loop through each day from now to the target date
        while (currentDate < targetCET) {
            // If the current day is Saturday (6) or Sunday (0), count it as a weekend day
            if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
                weekendDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        timeRemaining -= weekendDays * 24 * 60 * 60 * 1000;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    const milliseconds = timeRemaining % 1000;

    return { days, hours, minutes, seconds, milliseconds };
}

const targetDate = new Date('June 16, 2025 00:00:00 GMT+0100');

// Timer update function
function updateTimers() {
    const timeIncludingWeekends = calculateTimeDifference(targetDate);
    document.getElementById('days-inc').textContent = timeIncludingWeekends.days;
    document.getElementById('hours-inc').textContent = String(timeIncludingWeekends.hours).padStart(2, '0');
    document.getElementById('minutes-inc').textContent = String(timeIncludingWeekends.minutes).padStart(2, '0');
    document.getElementById('seconds-inc').textContent = String(timeIncludingWeekends.seconds).padStart(2, '0');
    document.getElementById('milliseconds-inc').textContent = String(timeIncludingWeekends.milliseconds).padStart(3, '0');

    const timeExcludingWeekends = calculateTimeDifference(targetDate, false);
    document.getElementById('days-exc').textContent = timeExcludingWeekends.days;
    document.getElementById('hours-exc').textContent = String(timeExcludingWeekends.hours).padStart(2, '0');
    document.getElementById('minutes-exc').textContent = String(timeExcludingWeekends.minutes).padStart(2, '0');
    document.getElementById('seconds-exc').textContent = String(timeExcludingWeekends.seconds).padStart(2, '0');
    document.getElementById('milliseconds-exc').textContent = String(timeExcludingWeekends.milliseconds).padStart(3, '0');
}

setInterval(updateTimers, 10);

function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

// Calendar setup
function generateCalendar(startDate, endDate) {
    const calendarContainer = document.getElementById('calendar');
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = currentDate.getDate();
        dayDiv.dataset.date = currentDate.toISOString().split('T')[0];

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (currentDate < today) {
            dayDiv.classList.add('past');
        } else {
            dayDiv.classList.add('future');
        }

        calendarContainer.appendChild(dayDiv);
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

// Generate the calendar from September 9, 2023
generateCalendar(new Date('September 9, 2023'), targetDate);

// Update the calendar every minute to check for day change
setInterval(updateCalendar, 60000);