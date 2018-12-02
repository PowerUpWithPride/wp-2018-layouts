// Timer control functionality
'use strict';

$(() => {
    // The bundle name where all the run information is pulled from.
    const speedcontrolBundle = 'nodecg-speedcontrol';

    // Declaring other variables.
    let backupTimerTO;

    // This is where the timer information is received.
    // The "change" event is triggered whenever the time changes or the state changes.
    let stopwatch = nodecg.Replicant('stopwatch', speedcontrolBundle);
    stopwatch.on('change', (newVal, oldVal) => {
        if (!newVal) {
            return;
        }
        updateTimer(newVal, oldVal);

        // Backup Timer
        clearTimeout(backupTimerTO);
        backupTimerTO = setTimeout(backupTimer, 1000);
    });

    // Backup timer that takes over if the connection to the server is lost.
    // Based on the last timestamp that was received.
    // When the connection is restored, the server timer will recover and take over again.
    function backupTimer() {
        backupTimerTO = setTimeout(backupTimer, 200);
        if (stopwatch.value.state === 'running') {
            let missedTime = Date.now() - stopwatch.value.timestamp;
            let timeOffset = stopwatch.value.milliseconds + missedTime;
            updateTimer({time:msToTime(timeOffset)});
        }
    }

    // Update the run timer when changed.
    function updateTimer(newVal, oldVal) {
        let time = newVal.time || '88:88:88';
        let timer = $('.timer');

        // Change class on the timer to change the colour if needed.
        if (oldVal) {
            timer.removeClass('timer_' + oldVal.state);
        }
        timer.addClass('timer_'+newVal.state);
        timer.html(time);
    }

    // This is the finished times for the current runners.
    let finishedTimers = nodecg.Replicant('finishedTimers', speedcontrolBundle);
    finishedTimers.on('change', (newVal, oldVal) => {
        if (newVal) {
            updateFinishedTimes(newVal);
        }
    });

    // Sets the finished times for runners.
    function updateFinishedTimes(finishedTimes) {
        $('.finish-time').text("").hide();
        for (let time of finishedTimes) {
            $('.finish-time-runner' + time.index).html(time.time).show();
        }
    }
});
