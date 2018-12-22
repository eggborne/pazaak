const plusMinusSymbol = '±';
export const characters = {
  jarjarbinks: {
    name: 'jarjarbinks',
    displayName: 'Jar Jar Binks',
    skillLevel: 2,
    prize: {
      credits: 50,
      cards: [
        { value: 1, type: plusMinusSymbol }
      ]
    },
    strategy: {
      stand: {
        description: 'Stands at 15',
        standAt: 15
      },
      handCards: {
        description: 'Plays hand cards recklessly'
      },
      tie: {
        description: 'Never attempts to break a tie',
        chanceToAccept: 10
      }
    },
    deck: [
      { id: 0, value: 1, type: '+' },
      { id: 1, value: 1, type: '+' },
      { id: 2, value: 2, type: '+' },
      { id: 3, value: 2, type: '+' },
      { id: 4, value: 5, type: '+' },
      { id: 0, value: 1, type: '-' },
      { id: 1, value: 1, type: '-' },
      { id: 2, value: 2, type: '-' },
      { id: 3, value: 2, type: '-' },
      { id: 4, value: 5, type: '-' },
    ],
    quotes: {
      panel: '"Meesa not be understandin\' the rules too good."'
    }
  },
  c3po: {
    name: 'c3po',
    displayName: 'C-3PO',
    skillLevel: 3,
    prize: {
      credits: 100,
      cards: [
        { value: 2, type: plusMinusSymbol },
        { value: 3, type: plusMinusSymbol },
      ]
    },
    strategy: {
      stand: {
        description: 'Stands at 16',
        standAt: 16
      },
      handCards: {
        description: 'Plays hand cards sparingly'
      },
      tie: {
        description: 'Rarely attempts to break a tie',
        chanceToAccept: 8
      }
    },
    deck: [
      { id: 0, value: 1, type: '+' },
      { id: 1, value: 2, type: '+' },
      { id: 2, value: 3, type: '+' },
      { id: 3, value: 1, type: '+' },
      { id: 4, value: 2, type: '+' },
      { id: 5, value: 3, type: '+' },
      { id: 6, value: 1, type: '+' },
      { id: 7, value: -2, type: '-' },
      { id: 8, value: -3, type: '-' },
      { id: 9, value: -1, type: '-' }
    ],
    quotes: {
      panel: '"Please go easy on me. I\'ve just had my logic units calibrated."'
    }
  },
  lakSivrak: {
    name: 'lakSivrak',
    displayName: 'Lak Sivrak',
    skillLevel: 4,
    prize: {
      credits: 200,
      cards: [
        { value: 3, type: plusMinusSymbol },
        { value: 4, type: plusMinusSymbol },
      ]
    },
    strategy: {
      stand: {
        description: 'Stands at 17',
        standAt: 17
      },
      handCards: {
        description: 'Plays hand cards liberally'
      },
      tie: {
        description: 'Sometimes attempts to break a tie',
        chanceToAccept: 5
      }
    },
    deck: [
      { id: 0, value: 1, type: '+' },
      { id: 1, value: 2, type: '+' },
      { id: 2, value: 3, type: '+' },
      { id: 3, value: 1, type: '+' },
      { id: 4, value: 2, type: '+' },
      { id: 5, value: 1, type: '-' },
      { id: 6, value: -2, type: '-' },
      { id: 7, value: -3, type: '-' },
      { id: 8, value: -1, type: '-' },
      { id: 9, value: -2, type: '-' }
    ],
    quotes: {
      panel: '"Grraarragghhh. Grrrr. Raawwrr."'
    }
  },
  ig88: {
    name: 'ig88',
    displayName: 'IG-88',
    skillLevel: 6,
    prize: {
      credits: 400,
      cards: [
        { value: 4, type: plusMinusSymbol },
        { value: 5, type: plusMinusSymbol },
      ]
    },
    strategy: {
      stand: {
        description: 'Stands at 17',
        standAt: 20
      },
      handCards: {
        description: 'Plays hand cards liberally'
      },
      tie: {
        description: 'Usually attempts to break a tie',
        chanceToAccept: 3
      }
    },
    deck: [
      { id: 0, value: 1, type: '+' },
      { id: 1, value: 2, type: '+' },
      { id: 2, value: 3, type: '+' },
      { id: 3, value: 4, type: '+' },
      { id: 4, value: 5, type: '+' },
      { id: 5, value: -1, type: '-' },
      { id: 6, value: -2, type: '-' },
      { id: 7, value: 1, type: plusMinusSymbol },
      { id: 8, value: 2, type: plusMinusSymbol },
      { id: 9, value: 3, type: plusMinusSymbol }
    ],
    quotes: {
      panel: '"MISSION: DESTROY PLAYER SCORE"'
    }
  },
  yoda: {
    name: 'yoda',
    displayName: 'Yoda',
    skillLevel: 8,
    prize: {
      credits: 1000,
      cards: [
        { value: 4, type: plusMinusSymbol },
        { value: 5, type: plusMinusSymbol },
        { value: 6, type: plusMinusSymbol },
      ]
    },
    strategy: {
      stand: {
        description: 'Stands at ???'
      },
      handCards: {
        description: 'Plays hand cards strategically',
        standAt: 18
      },
      tie: {
        description: 'Will never accept a tie',
        chanceToAccept: 0
      }
    },
    deck: [
      { id: 0, value: 1, type: plusMinusSymbol },
      { id: 1, value: 2, type: plusMinusSymbol },
      { id: 2, value: 3, type: plusMinusSymbol },
      { id: 3, value: 4, type: plusMinusSymbol },
      { id: 4, value: 5, type: plusMinusSymbol },
      { id: 5, value: 1, type: plusMinusSymbol },
      { id: 6, value: 2, type: plusMinusSymbol },
      { id: 7, value: 3, type: plusMinusSymbol },
      { id: 8, value: 4, type: plusMinusSymbol },
      { id: 9, value: 5, type: plusMinusSymbol }
    ],
    quotes: {
      panel: '"Underestimated not, will I be. Beat you handily I will."'
    }
  },
  theemperor: {
    name: 'theemperor',
    displayName: 'The Emperor',
    skillLevel: 10,
    prize: {
      credits: 5000,
      cards: [
        { value: 6, type: plusMinusSymbol },
        { value: 6, type: plusMinusSymbol },
        { value: 6, type: plusMinusSymbol },
        { value: 6, type: plusMinusSymbol },
      ]
    },
    strategy: {
      stand: {
        description: '???',
        standAt: 20
      },
      handCards: {
        description: '???'
      },
      tie: {
        description: '???',
        chanceToAccept: 0
      }
    },
    deck: [
      { id: 0, value: 1, type: plusMinusSymbol },
      { id: 1, value: 2, type: plusMinusSymbol },
      { id: 2, value: 3, type: plusMinusSymbol },
      { id: 3, value: 4, type: plusMinusSymbol },
      { id: 4, value: 5, type: plusMinusSymbol },
      { id: 5, value: 1, type: plusMinusSymbol },
      { id: 6, value: 2, type: plusMinusSymbol },
      { id: 7, value: 3, type: plusMinusSymbol },
      { id: 8, value: 4, type: plusMinusSymbol },
      { id: 9, value: 5, type: plusMinusSymbol }
    ],
    quotes: {
      panel: '"In time you will call me Master."'
    }
  }
};