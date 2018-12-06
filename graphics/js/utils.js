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

// Fix pronoun wrapping on certain layouts.
// Put a thin space after each slash if the layout needs wrapping.
const layoutsToWrapPronouns = [
    '16_9-2p',
    '4_3-1p',
    '4_3-2p',
    '4_3-3p',
    '4_3-4p',
    'gb-1p',
    'gba-1p',
    'ds-1p',
    'ff4r',
    'z1r',
    'z3r',
];

function fixPronounWrapping(layoutInfo) {
    if (layoutsToWrapPronouns.includes(layoutInfo.code)) {
        let pronounElements = $('.pronouns');
        pronounElements.each((i, elem) => {
            // Use .html() so it doesn't get doubly escaped.
            $(elem).html($(elem).text().replace(/([-/_])/g,'$&&hairsp;'));
        });
    }
}
