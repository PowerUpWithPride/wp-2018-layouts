'use strict';
$(() => {
    // JQuery selectors.
    let gameTitle = $('#donationTotal');

    // Update donation total when changed.
    let donationTotal = nodecg.Replicant('donationTotal');
    donationTotal.on('change', (newVal, oldVal) => {
        gameTitle.html(currencyFormatter.format(newVal));
    });
});
