'use strict';
$(() => {
    // JQuery selectors.
    let donationTotalElement = $('#donationTotal');

    // Update donation total when changed.
    let donationTotal = nodecg.Replicant('donationTotal');
    donationTotal.on('change', (newVal, oldVal) => {
        donationTotalElement.html(currencyFormatter.format(newVal));
    });
});
