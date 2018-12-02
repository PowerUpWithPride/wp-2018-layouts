// Javascript for layout changing functionality.  Change applied CSS and show/hide layout containers.
'use strict';

$(() => {
    // The bundle name where all the run information is pulled from.
    const puwpBundle = 'nodecg-puwp';

    // Replicants
    let currentLayout = nodecg.Replicant('currentGameLayout', puwpBundle);

    // Listens for the layout style to change.
    currentLayout.on('change', newVal => {
        if (newVal) {
            changeLayout(newVal);
        }
    });

    // Update the current layout by doing the following:
    // 1. Hide all layout containers.
    // 2. Update the applied CSS file for the new layout.
    // 3. Show the layout container for the new layout.
    // 4. Check to fix pronoun wrapping.
    function changeLayout(layoutInfo) {
        $(".game-layout-container").hide();
        let cssURL = 'css/game-layout/' + layoutInfo.code + '.css';
        $('#layout-css-file').attr('href', cssURL);
        $("#layout-container-" + layoutInfo.code).show();
        fixPronounWrapping(layoutInfo);
    }
});
