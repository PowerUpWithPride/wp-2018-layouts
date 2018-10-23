'use strict';
$(() => {
    // JQuery selectors.
    let gameTitle = $('#donationTotal');

    // Formatter for $USD
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });

    // Update donation total when changed.
    let donationTotal = nodecg.Replicant('donationTotal');
    donationTotal.on('change', (newVal, oldVal) => {
        gameTitle.html(formatter.format(newVal));
    });
});
