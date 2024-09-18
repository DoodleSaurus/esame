// Utility function to calculate time difference and format it
function calculateTimeDifference(targetDate, includeWeekends = true) {
    const now = new Date();
    let timeRemaining = targetDate - now;

    if (!includeWeekends) {
        let weekendDays = 0;

        for (let d = new Date(now); d < targetDate; d.setDate(d.getDate() + 1)) {
            if (d.getDay() === 6 || d.getDay() === 0) {
                weekendDays++;
            }
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

// Target date: June 18, 2025
const targetDate = new Date('June 18, 2025 00:00:00');

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

// Update the timers every 10 milliseconds
setInterval(updateTimers, 10);

// Helper function to compare dates (without time)
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
        dayDiv.dataset.date = currentDate.toISOString().split('T')[0]; // Store the date for updates

        // Assign initial class based on whether the day is in the past or future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Clear time for comparison
        if (currentDate < today) {
            dayDiv.classList.add('past');
        } else {
            dayDiv.classList.add('future');
        }

        calendarContainer.appendChild(dayDiv);
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

// Update calendar dynamically
function updateCalendar() {
    const calendarDays = document.querySelectorAll('.calendar div');
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Clear time for comparison

    calendarDays.forEach(dayDiv => {
        const divDate = new Date(dayDiv.dataset.date);
        if (divDate < now && dayDiv.classList.contains('future')) {
            dayDiv.classList.remove('future');
            dayDiv.classList.add('past');
        }
    });
}

// Generate the calendar from September 9, 2023
generateCalendar(new Date('September 9, 2023'), targetDate);

// Update the calendar every minute to check for day change
setInterval(updateCalendar, 60000);
