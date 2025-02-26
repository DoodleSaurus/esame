function calculateTimeDifference(targetDate, includeWeekends = true) {
    const now = new Date();
    const cetOffset = 1 * 60 * 60 * 1000; // CET is UTC+1

    // Convert both dates to CET time zone
    const nowCET = new Date(now.getTime() + cetOffset);
    const targetCET = new Date(targetDate.getTime() + cetOffset);

    let timeRemaining = targetCET - nowCET;

    if (!includeWeekends) {
        let weekendDays = 0;
        let currentDate = new Date(nowCET);

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

const targetDate = new Date('June 18, 2025 00:00:00 GMT+0100');

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

// Calendar setup
function generateCalendar(startDate, endDate) {
    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = ''; 

    let currentDate = new Date(startDate);
    let currentMonth = null;

    while (currentDate <= endDate) {
        if (currentDate.getMonth() !== currentMonth) {
            currentMonth = currentDate.getMonth();

            const monthSection = document.createElement('div');
            monthSection.classList.add('month-section');

            const monthHeader = document.createElement('div');
            monthHeader.classList.add('month-header');
            monthHeader.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            monthSection.appendChild(monthHeader);

            const calendarGrid = document.createElement('div');
            calendarGrid.classList.add('calendar-grid', 'row', 'g-2');

            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const startingDay = firstDayOfMonth.getDay(); 

            // Check if the current month is June 2025
            const isJune2025 = currentDate.getFullYear() === 2025 && currentDate.getMonth() === 5; // June is month 5 (0-indexed)
            const totalDays = isJune2025 ? 18 : lastDayOfMonth.getDate(); // Only show up to June 18, 2025

            for (let i = 0; i < startingDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('day-card', 'empty-day', 'col');
                calendarGrid.appendChild(emptyDay);
            }

            for (let day = 1; day <= totalDays; day++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day-card', 'col');
                dayDiv.textContent = day;
                dayDiv.dataset.date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                if (isSameDay(currentDayDate, today)) {
                    dayDiv.classList.add('current'); 
                } else if (currentDayDate < today) {
                    dayDiv.classList.add('past'); 
                } else {
                    dayDiv.classList.add('future'); 
                }

                calendarGrid.appendChild(dayDiv);
            }

            const totalCells = 35; 
            const filledCells = startingDay + totalDays;
            const remainingCells = totalCells - filledCells;

            for (let i = 0; i < remainingCells; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('day-card', 'empty-day', 'col');
                calendarGrid.appendChild(emptyDay);
            }

            monthSection.appendChild(calendarGrid);
            calendarContainer.appendChild(monthSection);
        }

        currentDate.setMonth(currentDate.getMonth() + 1);
    }
}

function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

generateCalendar(new Date('September 9, 2024'), targetDate);

setInterval(() => generateCalendar(new Date('September 9, 2024'), targetDate), 60000);