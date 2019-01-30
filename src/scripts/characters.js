export const characters = {
  jarjarbinks: {
    name: 'jarjarbinks',
    displayName: 'Jar Jar Binks',
    skillLevel: 1,
    prize: {
      credits: 50,
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
    skillLevel: 2,
    prize: {
      credits: 100,
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
    skillLevel: 4,
    prize: {
      credits: 200,
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
    skillLevel: 5,
    prize: {
      credits: 400,
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
    skillLevel: 8,
    prize: {
      credits: 1000,
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
    skillLevel: 8,
    prize: {
      credits: 2000,
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
    skillLevel: 10,
    prize: {
      credits: 3000,
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
    skillLevel: 9,
    prize: {
      credits: 3000,
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
    skillLevel: 9,
    prize: {
      credits: 3000,
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
    skillLevel: 10,
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
      panel: '"Better be careful. I\'m the geniune article."'
    }
  },
  caiaphas : {
    name: 'caiaphas',
    displayName: 'Caiaphas',
    skillLevel: 10,
    prize: {
      credits: 8000,
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
    skillLevel: 10,
    prize: {
      credits: 3000,
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
    skillLevel: 10,
    prize: {
      credits: 10000,
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
      panel: '"I WILL TIRE QUICKLY OF BESTING YOU REPEATEDLY IN THIS SIMPLE ANCIENT GAME."'
    }
  },
  kingjaffejoffer: {
    name: 'kingjaffejoffer',
    displayName: 'King Jaffe Joffer',
    skillLevel: 10,
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
      panel: '"I wouldn\'t trade my supreme Pazaak skills for all the riches in Zamunda."'
    }
  },
  chopchop: {
    name: 'chopchop',
    displayName: 'Chop Chop Master Onion',
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
      panel: '"Stand, draw, it\'s all in the mind."'
    }
  },
  numaster: {
    name: 'numaster',
    displayName: 'Nu Master',
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
      panel: '"All life begins and ends with Nu. I know this to be true."'
    }
  }
};