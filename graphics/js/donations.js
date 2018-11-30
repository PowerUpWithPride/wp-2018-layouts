'use strict';
$(() => {
    // The bundle name where all the run information is pulled from.
    const puwpBundle = 'nodecg-puwp';

    // JQuery selectors.
    let donationTotalElement = $('#donationTotal');

    // Update donation total when changed.  Animate the number increasing to the new total.
    let donationTotal = nodecg.Replicant('donationTotal', puwpBundle);
    donationTotal.on('change', (newVal, oldVal) => {
        $({countNum: oldVal}).animate({
                countNum: newVal,
            },
            {
                duration: 1000,
                easing: 'swing',
                step: function() {
                    donationTotalElement.text(currencyFormatter.format(this.countNum));
                },
                complete: function() {
                    donationTotalElement.text(currencyFormatter.format(this.countNum));
                },
            }
        );
    });
});
