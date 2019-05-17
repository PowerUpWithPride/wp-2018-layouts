'use strict';
$(() => {
    // The bundle name where all the run information is pulled from.
    const speedcontrolBundle = 'nodecg-speedcontrol';
    const layoutBundle = 'speedcontrol-layoutswitch';
    const donationBundle = 'speedcontrol-gdqtracker';

    // JQuery selectors.
    let gameTitle = $('#gameTitle');
    let gameCategory = $('#gameCategory');
    let gameSystem = $('#gameSystem');
    let gameEstimate = $('#gameEstimate');
    let gameLayout = $('#gameLayout');
    let runners = $('#runner-names-tbody');
    let timer = $('#timer');
    let runnerTimes = $('#runner-times-tbody');
    let bidList = $('#bids');

    // This is where the information is received for the run we want to display.
    // The "change" event is triggered when the current run is changed.
    let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
    runDataActiveRun.on('change', (newVal, oldVal) => {
        if (newVal)
            updateSceneFields(newVal);
    });

    let currentLayout = nodecg.Replicant('currentGameLayout', layoutBundle);
    currentLayout.on('change', (newVal, oldVal) => {
        if (newVal) {
            gameLayout.text(`${newVal.name} (${newVal.code})`);
        }
    });

    // This is where the timer information is received.
    // The "change" event is triggered whenever the time changes or the state changes.
    let stopwatch = nodecg.Replicant('stopwatch', speedcontrolBundle);
    stopwatch.on('change', (newVal, oldVal) => {
        if (newVal)
            updateTimer(newVal, oldVal);
    });

    // This is the finished times for the current runners.
    let finishedTimers = nodecg.Replicant('finishedTimers', speedcontrolBundle);
    finishedTimers.on('change', (newVal, oldVal) => {
        if (newVal)
            updateFinishedTimes(newVal);
    });

    // This is the current bids.
    let bids = nodecg.Replicant('bids', donationBundle);
    bids.on('change', (newVal, oldVal) => {
        updateBids(newVal);
    });

    // Extract Twitch username from stream URL.
    function getTwitchName(url) {
        let twitchUsername = url.split('/');
        return twitchUsername[twitchUsername.length - 1];
    }

    // Sets information on the pages for the run.
    function updateSceneFields(runData) {
        gameTitle.html(runData.game); // game-title.html
        gameCategory.html(runData.category); // game-category.html
        gameSystem.html(runData.system); // game-system.html
        gameEstimate.html(runData.estimate); // game-estimate.html

        // Get runner data.
        runners.empty();
        runnerTimes.empty();
        let i = 0;
        for (let team of runData.teams) {
            for (let member of team.members) {
                runners.append($('<tr>')
                    .append($('<td>').text(member.names.international))
                    .append($('<td>').text(getTwitchName(member.twitch.uri)))
                );
                runnerTimes.append($('<tr>')
                    .append($('<td>').text(member.names.international))
                    .append($('<td>').attr('id', 'finish-time-' + i)
                        .addClass('finish-time'))
                );
                i++;
            }
        }
    }

    // Sets the timer text and classes.
    function updateTimer(newVal, oldVal) {
        // Change class on the timer to change the colour if needed.
        // See the common.css file for more information.
        if (oldVal) timer.removeClass('timer_' + oldVal.state);
        timer.addClass('timer_' + newVal.state);
        timer.html(newVal.time); // timer.html
    }

    // Sets the finished times for runners.
    function updateFinishedTimes(finishedTimes) {
        $('.finish-time').empty();
        for (let time of finishedTimes) {
            $('#finish-time-' + time.index).html(time.time);
        }
    }

    // Make list of bids.
    function updateBids(currentBids) {
        bidList.empty();
        for (let bid of currentBids) {
            let li = $('<li>').html(bid.game + ': ' + bid.name);
            if (bid.goal) {
                li.html(li.html() + ' - ' + currencyFormatter.format(bid.total) + '/' + currencyFormatter.format(bid.goal));
            } else if (bid.options) {
                let sublist = $('<ul>').appendTo(li);
                for (let option of bid.options) {
                    sublist.append($('<li>').html(option.name + ' - ' + currencyFormatter.format(option.total)));
                }
            }
            bidList.append(li);
        }
    }
});
