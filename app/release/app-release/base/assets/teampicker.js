var textarea = document.getElementById("names");
var team_divs = document.getElementsByClassName("team_divs");
//is a list^

function pickRandom(argument) {
  if (typeof argument === 'number') {
    return Math.floor(Math.random() * Math.floor(argument)) + 1;
  }
  if (Array.isArray(argument)) {
    return argument[Math.floor(Math.random() * argument.length)];
  }
}

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}
textarea.style.height = 0;
textarea.style.height = textarea.scrollHeight + "px";

function clearfields() {
  while (team_divs.length != 0) {
    team_divs[0].remove();
  }
  textarea.value = '';
  textarea.style.height = 0;
  textarea.style.height = textarea.scrollHeight + "px";
}

function shrink(element) {
  element.style.height = 0;
  element.style.height = (element.scrollHeight) + "px";
}

function pickTeams(team_members, number_of_teams) {
  /*
 this team picker works with any number of
 team members
 */
  let teams = [
    //store all teams in this list so I don't need to create arrays based on a arbitrary number
  ];
  let shuffled_members = [];

  let team_members_copy = team_members.slice();
  //making a copy of original array so it doesn't modify the original array

  while (team_members_copy.length != 0) {
    let random_member = pickRandom(team_members_copy);
    shuffled_members.push(random_member);
    team_members_copy.splice(team_members_copy.indexOf(random_member), 1);
  }
  let team_length = shuffled_members.length / number_of_teams;
  for (let i = 0; i < shuffled_members.length; i += team_length) {
    //loop through every nth shuffled member
    //slice shuffled members starting starting
    //at the current index and ending at
    //the current index plus the team length,
    //or, nth shuffled member
    teams.push(shuffled_members.slice(i, i + team_length));
  }
  return teams;
}

var textareaValue;
function getTeams() {
  check_radio_buttons();
  if (textarea.value.replace(/\s+/g, '') != '') {
    //if there is a non white space value in the input box

    if (team_divs[0] == null) {
      //if the random teams that were generated are
      //not present, generate new teams

      textareaValue = textarea.value.split("\n");
      check_radio_buttons();
      if (number_of_teams > textareaValue.length) {
        //make a popup and dont calculate teams
        let alert_text = `You cannot split ${textareaValue.length} team members into ${number_of_teams} teams`;
        alert(alert_text);

        return null;
      }


      check_radio_buttons();
      let teams = pickTeams(textareaValue, number_of_teams);

      textarea.insertAdjacentHTML("afterend", getTeamsHTML(teams.slice(1,)));

      let textarea_output_string = "";
      for (let e = 0; e < teams[0].length; e++) {
        if (e != (teams[0].length-1)) {
          textarea_output_string += teams[0][e]+"\n";
        } else {
          textarea_output_string += teams[0][e];
        }
      }

      textarea.value = textarea_output_string;
      textarea.setAttribute("style", "height:" + (textarea.scrollHeight) + "px;overflow-y:hidden;");
      shrink(textarea);
    } else {
      //if there are teams already generated,
      //regenerate them
      check_radio_buttons();
      if (number_of_teams > textareaValue.length) {
        //make a popup and dont calculate teams
        let alert_text = `You cannot split ${textareaValue.length} team members into ${number_of_teams} teams`;
        alert(alert_text);

        return null;
      }
      clearfields();

      teams_second_time = pickTeams(textareaValue, number_of_teams);

      textarea.insertAdjacentHTML("afterend", getTeamsHTML(teams_second_time.slice(1,)));
      let textarea_output_string = "";

      for (let e = 0; e < teams_second_time[0].length; e++) {
        if (e != (teams_second_time[0].length-1)) {
          textarea_output_string += teams_second_time[0][e]+"\n";
        } else {
          textarea_output_string += teams_second_time[0][e];
        }
      }

      textarea.value = textarea_output_string;
      textarea.setAttribute("style", "height:" + (textarea.scrollHeight) + "px;overflow-y:hidden;");
      shrink(textarea);
    }
  }
}

function getTeamsHTML(teamlist) {
  /*
  this function loops through every list of teams in the list of teams called teamlist.
  it then adds each of those teams to its own div element, basically wraping it with div tags.
  */
  let html = "<div class='team_divs'>";
  for (let i = 0; i < teamlist.length; i++) {
    for (let a = 0; a < teamlist[i].length; a++) {
      html += (teamlist[i][a] + "<br>"); //add names to html
    }
    /*
    if we are at the last team, don't add
    an extra div and br element
    */
    if (i != (teamlist.length-1)) {
      html += "</div><div class='team_divs'>";
    } else {
      html += "</div>";
    }
  }
  return html;
}