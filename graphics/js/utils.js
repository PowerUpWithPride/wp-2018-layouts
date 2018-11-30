// Currency formatter for $USD for bid totals and donation amounts.
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
});

// Converts milliseconds to a time string.
function msToTime(duration, noHour) {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    let timeString = '';

    if (!noHour)
        timeString += hours+':';
    timeString += minutes + ':' + seconds;

    return timeString;
}
