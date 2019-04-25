const defaultStrategy =
{
  stand: {
    description: '???',
    standAt: 16
  },
  handCards: {
    description: '???'
  },
  tie: {
    description: '???',
    chanceToAccept: 1
  }
};

export const prizeCards = [
  { id: 87, value: -1, type: '-' },
  { id: 86, value: -2, type: '-' },
  { id: 85, value: -3, type: '-' },
  { id: 84, value: -4, type: '-' },
  { id: 83, value: -5, type: '-' },
  { id: 82, value: -6, type: '-' },

  { id: 81, value: 1, type: '±' },
  { id: 80, value: 2, type: '±' },
  { id: 79, value: 3, type: '±' },
  { id: 78, value: 4, type: '±' },
  { id: 77, value: 3, type: '±' },
  { id: 76, value: 4, type: '±' },
  
  { id: 75, value: 1, type: '±' },
  { id: 74, value: 2, type: '±' },
  { id: 73, value: 3, type: '±' },
  { id: 72, value: 4, type: '±' },
  { id: 71, value: 2, type: '±' },
  { id: 70, value: 3, type: '±' },

  { id: 69, value: 4, type: '±' },
  { id: 68, value: 5, type: '±' },
  { id: 67, value: 3, type: '±' },
  { id: 66, value: 4, type: '±' },
  { id: 65, value: 5, type: '±' },
  { id: 64, value: 6, type: '±' },

  { id: 63, value: 4, type: '±' },
  { id: 62, value: 5, type: '±' },
  { id: 61, value: 6, type: '±' },
  { id: 60, value: 0, type: '' },
  { id: 59, value: 0, type: '' },
  { id: 58, value: 0, type: '' }
];

export const characters = {
  jarjarbinks: {
    name: 'jarjarbinks',
    displayName: 'Jar Jar Binks',
    species: 'Gungan',
    placeOfOrigin: 'Naboo',
    skillLevel: 1,
    prize: {
      credits: 25,
      cards: [0]
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
    species: 'Droid',
    placeOfOrigin: 'Tattoine',
    skillLevel: 2,
    prize: {
      credits: 75,
      cards: [1]
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
  porkins: {
    name: 'porkins',
    displayName: 'Porkins',
    species: 'Human',
    placeOfOrigin: 'Bestine IV',
    skillLevel: 3,
    prize: {
      credits: 150,
      cards: [2,3]
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
      panel: '"I can hold it. Give me more room to run."'
    }
  },
  ig88: {
    name: 'ig88',
    displayName: 'IG-88',
    species: 'Droid',
    placeOfOrigin: 'Halowan',
    skillLevel: 5,
    prize: {
      credits: 300,
      cards: [4,5]
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
      { id: 7, value: 1, type: '±' },
      { id: 8, value: 2, type: '±' },
      { id: 9, value: 3, type: '±' }
    ],
    quotes: {
      panel: '"MISSION: DESTROY PLAYER SCORE"'
    }
  },
  yoda: {
    name: 'yoda',
    displayName: 'Yoda',
    species: 'Unknown',
    placeOfOrigin: 'Dagobah',
    skillLevel: 7,
    prize: {
      credits: 600,
      cards: [6,7]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"Underestimated not, will I be. Beat you handily I will."'
    }
  },
  theemperor: {
    name: 'theemperor',
    displayName: 'The Emperor',
    species: 'Human',
    placeOfOrigin: 'Naboo',
    skillLevel: 8,
    prize: {
      credits: 1200,
      cards: [8,9]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"In time you will call me Master."'
    }
  },
  et: {
    name: 'et',
    displayName: 'E.T.',
    species: 'Asogian',
    placeOfOrigin: 'Brodo Asogi',
    skillLevel: 9,
    prize: {
      credits: 2400,
      cards: [10]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"E.T. crush opponents."'
    }
  },
  thet1000: {
    name: 'thet1000',
    displayName: 'The T-1000',
    species: 'Cyborg',
    placeOfOrigin: 'Earth',
    skillLevel: 9,
    prize: {
      credits: 4000,
      cards: [11,12]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"Say... that\'s a nice deck."'
    }
  },
  drchannard: {
    name: 'drchannard',
    displayName: 'Dr. Channard',
    species: 'Cenobite',
    placeOfOrigin: 'The Labyrinth',
    skillLevel: 9,
    prize: {
      credits: 12000,
      cards: [13,14]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"And to think I hesitated."'
    }
  },
  joecamel: {
    name: 'joecamel',
    displayName: 'Joe Camel',
    species: 'Toon',
    placeOfOrigin: 'Unknown',
    skillLevel: 10,
    prize: {
      credits: 25000,
      cards: [15,16]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"Better be careful. I\'m the geniune article."'
    }
  },
  caiaphas : {
    name: 'caiaphas',
    displayName: 'Caiaphas',
    species: 'Human',
    placeOfOrigin: 'Earth',
    skillLevel: 10,
    prize: {
      credits: 40000,
      cards: [17,18]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"Fools! You have no perception! The stakes we are gambling are frightenly high!"'
    }
  },
  kuato: {
    name: 'kuato',
    displayName: 'Kuato',
    species: 'Mutant',
    placeOfOrigin: 'Mars',
    skillLevel: 11,
    prize: {
      credits: 100000,
      cards: [19,20]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"Start the reactor... failing that, deal up some cards!"'
    }
  },
  blaine: {
    name: 'blaine',
    displayName: 'Blaine the Monorail',
    species: 'Cyborg',
    placeOfOrigin: 'Mid-World',
    skillLevel: 12,
    prize: {
      credits: 500000,
      cards: [21,22]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"I WILL TIRE QUICKLY OF BESTING YOU IN THIS SIMPLE ANCIENT GAME."'
    }
  },
  kingjaffejoffer: {
    name: 'kingjaffejoffer',
    displayName: 'King Jaffe Joffer',
    species: 'Human',
    placeOfOrigin: 'Earth',
    skillLevel: 13,
    prize: {
      credits: 1000000,
      cards: [23,24]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"I wouldn\'t trade my supreme Pazaak skills for all the riches in Zamunda."'
    }
  },
  chopchop: {
    name: 'chopchop',
    displayName: 'Chop Chop Master Onion',
    species: 'Toon',
    placeOfOrigin: 'PaRappa Town',
    skillLevel: 15,
    prize: {
      credits: 5000000,
      cards: [25,26]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"Stand, draw, it\'s all in the mind."'
    }
  },
  nu: {
    name: 'nu',
    displayName: 'Nu',
    species: 'Unknown',
    placeOfOrigin: 'Unknown',
    skillLevel: 20,
    prize: {
      credits: 99999999,
      cards: [27,28,29]
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
      { id: 0, value: 1, type: '±' },
      { id: 1, value: 2, type: '±' },
      { id: 2, value: 3, type: '±' },
      { id: 3, value: 4, type: '±' },
      { id: 4, value: 5, type: '±' },
      { id: 5, value: 1, type: '±' },
      { id: 6, value: 2, type: '±' },
      { id: 7, value: 3, type: '±' },
      { id: 8, value: 4, type: '±' },
      { id: 9, value: 5, type: '±' }
    ],
    quotes: {
      panel: '"All matches begin with Nu and end with Nu."'
    }
  },
  'random|yoda': {
    name: 'random',
    displayName: 'random',
    strategy: defaultStrategy
  },
  'random|poe': {
    name: 'random2',
    displayName: 'random2',
    strategy: defaultStrategy
  },
  'random|han': {
    name: 'random3',
    displayName: 'random3',
    strategy: defaultStrategy
  },
  'random|mace': {
    name: 'random4',
    displayName: 'random4',
    strategy: defaultStrategy
  },
  'random|jar-jar': {
    name: 'random5',
    displayName: 'random5',
    strategy: defaultStrategy
  },
  'random|obi-wan': {
    name: 'random6',
    displayName: 'random6',
    strategy: defaultStrategy
  },
  'random|jabba': {
    name: 'random7',
    displayName: 'random7',
    strategy: defaultStrategy
  },
  'random|kylo': {
    name: 'random8',
    displayName: 'random8',
    strategy: defaultStrategy
  },
  bennett: {
    name: 'bennett',
    displayName: 'Bennett from Commando',
    strategy: defaultStrategy
  },
  masan: {
    name: 'masan',
    displayName: 'Ma-san',
    strategy: defaultStrategy
  },  
  acarrot: {
    name: 'acarrot',
    displayName: 'A Carrot',
    strategy: defaultStrategy
  },
  davidbowie1970s: {
    name: 'davidbowie1970s',
    displayName: '1970s David Bowie',
    strategy: defaultStrategy
  },
  iliketurleskid: {
    name: 'iliketurleskid',
    displayName: '"I like turtles" kid',
    strategy: defaultStrategy
  },
  poochie: {
    name: 'poochie',
    displayName: 'Poochie',
    strategy: defaultStrategy
  },
};