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