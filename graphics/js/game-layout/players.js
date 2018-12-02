// Player info functionality.
'use strict';

$(() => {
    // The bundle name where all the run information is pulled from.
    const speedcontrolBundle = 'nodecg-speedcontrol';

    let currentTeamsData = [];  // All teams data is stored here for reference when changing.

    // This is where the information is received for the run we want to display.
    // The "change" event is triggered when the current run is changed.
    let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
    runDataActiveRun.on('change', (newVal, oldVal) => {
        if (newVal)
            updateSceneFields(newVal);
    });

    // Set player info for the run.
    function updateSceneFields(runData) {
        currentTeamsData = [];
        runData.teams.forEach(team => {
            let teamData = {members: []};
            team.members.forEach(member => {teamData.members.push(createMemberData(member));});
            currentTeamsData.push(teamData);
        });

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
});
