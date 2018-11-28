'use strict';
$(() => {
    // JQuery selectors.
    let donationTotalElement = $('#donationTotal');

    // Update donation total when changed.  Animate the number increasing to the new total.
    let donationTotal = nodecg.Replicant('donationTotal');
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
