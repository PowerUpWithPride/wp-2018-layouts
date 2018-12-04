// Main run info update functionality.
'use strict';

$(() => {
    if (offlineMode) {
        loadOffline();
    }
    else{
        loadFromSpeedControl();
    }

    function loadOffline(){
        let gameTitle = $('.game-name');
        let gameCategory = $('.category');
        let gameSystem = $('.platform');
        let gameYear = $('.year');
        let gameEstimate = $('.estimate');
        let name = $(".runner-name1");
        let pronouns = $(".pronouns1");

        gameTitle.html("Title");
        gameCategory.html("category");
        gameSystem.html("system");
        gameYear.html("1902");
        gameEstimate.html("5:15:30");

        name.text("Conklestothemax");
        pronouns.text("They/Them");

        fixPronounWrapping(globalLayoutInfo);
    }

    function loadFromSpeedControl() {
        // The bundle name where all the run information is pulled from.
        const speedcontrolBundle = 'nodecg-speedcontrol';
        const puwpBundle = 'nodecg-puwp';

        // JQuery selectors.
        let gameTitle = $('.game-name');
        let gameCategory = $('.category');
        let gameSystem = $('.platform');
        let gameYear = $('.year');
        let gameEstimate = $('.estimate');

        // This is where the information is received for the run we want to display.
        // The "change" event is triggered when the current run is changed.
        let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
        runDataActiveRun.on('change', (newVal, oldVal) => {
            if (newVal)
                updateSceneFields(newVal);
        });

        let currentLayout = nodecg.Replicant('currentGameLayout', puwpBundle);

        // Sets information on the pages for the run.
        function updateSceneFields(runData) {
            let currentTeamsData = [];

            runData.teams.forEach(team => {
                let teamData = {members: []};
                team.members.forEach(member => {teamData.members.push(createMemberData(member));});
                currentTeamsData.push(teamData);
            });

            // Split year out from system platform, if present.
            let system = runData.system.split("-");
            let year = '';

            if (system.length > 1) {
                year = system[1].trim();
            }
            system = system[0].trim();

            gameTitle.html(runData.game);
            gameCategory.html(runData.category);
            gameSystem.html(system);
            gameYear.html(year);
            gameEstimate.html(runData.estimate);

            // Set each player names and pronouns.
            let i = 0;
            for (let team of currentTeamsData) {
                for (let member of team.members) {
                    i += 1;
                    let name = $(".runner-name" + i);
                    let pronouns = $(".pronouns" + i);
                    name.text(member.name);
                    pronouns.text(member.pronouns);
                }
            }

            // Fix pronoun wrapping for the current layout if needed.
            fixPronounWrapping(currentLayout.value);
        }

        // Easy access to create member data object used above.
        function createMemberData(member) {
            // Gets username from URL.
            let twitchUsername;
            if (member.twitch && member.twitch.uri) {
                twitchUsername = member.twitch.uri.split('/');
                twitchUsername = twitchUsername[twitchUsername.length-1];
            }

            // Parse pronouns from the runner name, if they're present.
            let name = member.names.international.split('-');
            let pronouns = '';
            if (name.length > 1) {
                pronouns = name[1].trim();
            }
            name = name[0].trim();

            return {
                name: name,
                pronouns: pronouns,
                twitch: twitchUsername,
                region: member.region
            };
        }
    }
});
