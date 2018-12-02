// Javascript for layout changing functionality.  Change applied CSS and show/hide layout containers.
'use strict';

$(() => {
    // The bundle name where all the run information is pulled from.
    const puwpBundle = 'nodecg-puwp';

    // Replicants
    let layouts = nodecg.Replicant('gameLayouts', puwpBundle);
    let currentLayout = nodecg.Replicant('currentGameLayout', puwpBundle);

    let layoutHash = (window.location.hash) ? window.location.hash.substring(1) : undefined;

    // If hash specified, looks through the layouts to see if that one exists.
    // If so, uses that layout style.
    // Example: http://localhost:9090/bundles/wp-2018-layouts/graphics/game-layout.html#4_3-1p
    // Otherwise, listen for the current layout to change and update it.
    if (layoutHash) {
        layouts.on('change', newVal => {
            if (newVal) {
                let layoutInfo = findLayoutInfo(layoutHash);
                if (layoutInfo) {
                    changeLayout(layoutInfo);
                }
            }
        });
    } else {
        // Listens for the layout style to change.
        currentLayout.on('change', newVal => {
            if (newVal) {
                changeLayout(newVal);
            }
        });
    }

    // Update the current layout by doing the following:
    // 1. Hide all layout containers.
    // 2. Update the applied CSS file for the new layout.
    // 3. Show the layout container for the new layout.
    function changeLayout(layoutInfo) {
        $(".game-layout-container").hide();
        let cssURL = 'css/game-layout/' + layoutInfo.code + '.css';
        $('#layout-css-file').attr('href', cssURL);
        $("#layout-container-" + layoutInfo.code).show();
    }

    // Find information about layout based on it's code.
    function findLayoutInfo(code) {
        let layoutInfo;
        for (let layout of layouts) {
            if (layout.code === code.toLowerCase()) {
                layoutInfo = layout;
                break;
            }
        }
        return layoutInfo;
    }
});
