import axios from 'axios';

export const getScores = () =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getpazaakscores.php',
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
export const saveUser = (playerName, avatarIndex) => {
  console.error('saving player, index', playerName, avatarIndex);
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/savenewpazaakuser.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      playerName: playerName,
      avatarIndex: avatarIndex,
    }
  });
};
export const saveUserAvatarIndex = (playerName, avatarIndex) => {
  console.error('saveUserAvatarIndex to', playerName, avatarIndex);
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