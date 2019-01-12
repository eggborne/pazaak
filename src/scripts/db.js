import axios from 'axios';

export function deleteUserRecord(userId) {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakdeleteuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
    }
  });
}
export function createNewOpenMatch(userId) {
  let userIdArray = JSON.stringify([userId]);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/createnewpazaakmatch.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userIdArray: userIdArray
    }
  });
}
export function joinOpenMatch(userId) {
  let userIdArray = JSON.stringify([userId]);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/createnewpazaakmatch.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userIdArray: userIdArray
    }
  });
}
export function handshake(userObj, phase, opponent) {
  let dateNowString = Date.now().toString();
  let userId = userObj.cookieId;
  if (phase !== 'gameStarted') {
    opponent = '';
  }
  // console.log(`updating ${userId} at ${dateNowString} (${phase}) vs ${opponent}`);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakhandshake.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
      phase: phase,
      opponent: opponent,
      date: dateNowString
    }
  });
}
export function updateUserName(userId, newName) {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakupdateusername.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
      newName: newName
    }
  });
}
export function updatePreferences(userId, optionsObj) {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakupdatepreferences.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
      options: optionsObj
    }
  });
}

export const getScores = () =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getpazaakrecords.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });
export const getUserId = (playerName) =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getpazaakuserid.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      playerName: playerName,
    }
  });
export const getServerTime = () =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/pazaakgetservertime.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });

export function getRecordForUserId(userId) {
  userId = parseInt(userId);
  return axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getpazaakrecordbyid.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
    }
  });
}

export const getDataForPlayer = (playerName) =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getpazaakplayer.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      playerName: playerName,
    }
  });
export const getChatMessages = (chatId) =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/pazaakgetmessages.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      chatId: chatId,
    }
  });

export const checkForMessages = (userId) => {
  console.log('checcking for new messages', userId);
  return axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/pazaakcheckformessages.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
    }
  });
};

export function sendMessage(chatId, newMessageArray) {
  newMessageArray = JSON.stringify(newMessageArray);
  console.error('updating chat', chatId, newMessageArray);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaaksendmessage.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      chatId: chatId,
      newMessageArray: newMessageArray,
    }
  });
}
export const addActiveUser = (userName, userId) => {
  let date = Date.now().toString();
  console.warn('sending active user', userName, userId, date);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/addpazaakuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userName: userName,
      userId: userId,
      date: date
    }
  });
};
export const startNewChat = (userId1, userId2) => {
  let date = Date.now().toString();
  console.warn('starting chat between', userId1, userId2);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakstartchat.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId1: userId1,
      userId2: userId2
    }
  });
};
export const pingActiveUser = (userId, date) => {
  console.warn('pinging active user', userId, date);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pingpazaakuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
      date: date
    }
  });
};
export const removeActiveUser = (userId) => {
  console.warn('removing active user', userId);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/removepazaakactiveuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
    }
  });
};
export const getActiveUsers = (app) =>
  new Promise((resolve) => {
    axios({
      method: 'get',
      url: 'https://www.eggborne.com/scripts/getpazaakactiveplayers.php',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      let dataArray = Array.from(response);
      let scoreData = app.state.highScores;
      let userScoreObj;
      dataArray.map((userObj, i) => {
        scoreData.map((scoreObj, i) => {
          if (parseInt(scoreObj.id) === userObj.userId) {
            userScoreObj = scoreObj;
          }
        });
        userObj.setWins = userScoreObj.setWins;
        userObj.totalSets = userScoreObj.totalSets;
        userObj.matchWins = userScoreObj.matchWins;
        userObj.totalMatches = userScoreObj.totalMatches;
        userObj.usersDefeated = userScoreObj.usersDefeated;
        userObj.usersFought = userScoreObj.usersFought;
        userObj.credits = userScoreObj.credits;
        // userObj.cpuDefeated = JSON.parse(userScoreObj.cpuDefeated);
      });
      resolve(response);
    });
  });

export const saveUser = (playerName, avatarIndex, preferences) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/savenewpazaakuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      playerName: playerName,
      avatarIndex: avatarIndex,
      preferences: preferences
    }
  });
};
export const saveUserAvatarIndex = (playerName, avatarIndex) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/savepazaakavatarindex.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      playerName: playerName,
      avatarIndex: avatarIndex
    }
  });
};
export const incrementSetWins = (playerName) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaaksetwins.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
    }
  });
};
export const incrementRoundWins = (playerName) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaakroundwins.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
    }
  });
};
export const incrementSets = (playerName) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaaktotalsets.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
    }
  });
};
export const incrementRounds = (playerName) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaaktotalrounds.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
    }
  });
};
export const updateCredits = (playerName, newAmount) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaakusercredits.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
      newAmount: newAmount
    }
  });
};
export const updateCPUDefeated = (playerName, newDefeated) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaakuserdefeated.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
      newDefeated: newDefeated
    }
  });
};
export const updateUsersDefeated = (playerName, newDefeatedAmount) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaakusercpudefeated.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
      newDefeatedAmount: newDefeatedAmount
    }
  });
};