import axios from 'axios';

export const getScores = () =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getpazaakscores.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });

export const getScoresForPlayer = (playerName) =>
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

export const saveUser = (playerName) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/savepazaakscore.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
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