import axios from 'axios';

export const portraitSources = {
  user: 'https://mikedonovan.dev/pazaak/assets/images/avatarsheetlq.jpg',
  opponent: 'https://mikedonovan.dev/pazaak/assets/images/opponentsheet.jpg'
};

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
export function updateLastLoginTime(userId) {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaaksetlogintime.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      userId: userId,
    }
  });
}
export const getNameRules = () =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/pazaakgetnamerules.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });
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
export const incrementMatchWins = (amount, playerName, newDefeatedArray, newCredits, wonCards) => {
  console.log('sending new credits', newCredits);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaakroundwins.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      amount: amount,
      user: playerName,
      newDefeated: newDefeatedArray,
      newCredits: newCredits,
      wonCards: wonCards
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
export const incrementMatches = (playerName) => {
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

export const checkUsername = (username) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakcheckusername.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      username: username
    }
  });
};
export const attemptUserCreation = (loginObj) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakcreateuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: JSON.stringify(loginObj)
  });
};
export const getUserWithCookie = (cookieObj) => {
  console.log('sending', cookieObj);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakgetuserwithtoken.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: JSON.stringify(cookieObj)
  });
};
export const getUserWithPass = (loginObj) => {
  console.log('logging in with', loginObj);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakgetuserwithpass.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: JSON.stringify(loginObj)
  });
};
export const addCurrentUser = (userObj) => {
  console.log('adding current user', userObj);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakaddcurrentuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: JSON.stringify(userObj)
  });
};
export const getOnlineUsers = () =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/pazaakgetonlineusers.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });
export const deleteCurrentUserByID = (userID) => 
  axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/removepazaakactiveuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: { userID: userID }
  });
export const handshake = (userObj) => {
  console.log('handshaking current user', userObj);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/pazaakhandshake.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: JSON.stringify(userObj)
  });
};
// export const getServerTime = () =>
//   axios({
//     method: 'get',
//     url: 'https://www.eggborne.com/scripts/getservertime.php',
//     headers: {
//       'Content-type': 'application/x-www-form-urlencoded'
//     }
//   });