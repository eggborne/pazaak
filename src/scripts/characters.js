export const characters = {
  jarjarbinks: {
    name: 'jarjarbinks',
    displayName: 'Jar Jar Binks',
    species: 'Gungan',
    placeOfOrigin: 'Naboo',
    skillLevel: 1,
    prize: {
      credits: 25,
      cards: [
        { value: 1, type: '±' }
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
    species: 'Droid',
    placeOfOrigin: 'Tattoine',
    skillLevel: 2,
    prize: {
      credits: 75,
      cards: [
        { value: 2, type: '±' },
        { value: 3, type: '±' },
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
  porkins: {
    name: 'porkins',
    displayName: 'Porkins',
    species: 'Human',
    placeOfOrigin: 'Bestine IV',
    skillLevel: 3,
    prize: {
      credits: 150,
      cards: [
        { value: 3, type: '±' },
        { value: 4, type: '±' },
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
      cards: [
        { value: 4, type: '±' },
        { value: 5, type: '±' },
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
      cards: [
        { value: 4, type: '±' },
        { value: 5, type: '±' },
        { value: 6, type: '±' },
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
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
    placeOfOrigin: 'Los Angeles',
    skillLevel: 9,
    prize: {
      credits: 5000,
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
      credits: 15000,
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
    placeOfOrigin: 'Jerusalem',
    skillLevel: 10,
    prize: {
      credits: 40000,
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
    placeOfOrigin: 'Zamunda',
    skillLevel: 13,
    prize: {
      credits: 1000000,
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
      cards: [
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
        { value: 6, type: '±' },
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
      panel: '"All life begins and ends with Nu. I know this to be true."'
    }
  }
};