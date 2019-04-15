function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
const defaultLengthRange = {
  min: 1,
  max: 2 // unlimited
};
export const namePatterns = {
  'yoda': {
    firstName: [
      { type: 'onsets', lengthRange: { min: 1, max: 3 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
    ],
  },
  'han': {
    firstName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: defaultLengthRange },
    ],
    lastName: [
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 1, max: 2 } },
      { type: 'repeater', value: 1, lengthRange: { min: 1, max: 1 } },
    ],
  },
  'mace': {
    firstName: [
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: defaultLengthRange },
      { type: 'codas', lengthRange: { min: 1, max: 2 } },
    ],
    lastName: [
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 1, max: 1 } },
      { type: 'onsets', lengthRange: { min: 1, max: 2 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      // { type: 'codas', lengthRange: defaultLengthRange },
    ],
  },
  'poe': {
    firstName: [
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 2 } },
      { type: 'codas', lengthRange: defaultLengthRange },
    ],
    lastName: [
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: defaultLengthRange },
      { type: 'codas', lengthRange: defaultLengthRange },
    ],
  },
  'kylo': {
    firstName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: defaultLengthRange },
      { type: 'codas', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
    ],
    lastName: [
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: defaultLengthRange },
    ],
  },
  'lando': {
    firstName: [
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: defaultLengthRange },
      { type: 'codas', lengthRange: { min: 1, max: 1 } },
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: defaultLengthRange },
    ],
    lastName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 1, max: 1 } },
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 2, max: 5 } },
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: defaultLengthRange },
      { type: 'codas', lengthRange: { min: 1, max: 1 } },
    ],
  },
  'jar-jar': {
    firstName: [
      { type: 'onsets', lengthRange:  { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: defaultLengthRange },
      { type: 'literal', value: ' ', lengthRange: defaultLengthRange },
      { type: 'repeater', value: 0, lengthRange: { min: 1, max: 1 } },
      { type: 'repeater', value: 1, lengthRange: { min: 1, max: 1 } },
      { type: 'repeater', value: 2, lengthRange: defaultLengthRange },
    ],
    lastName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: defaultLengthRange },
      { type: 'literal', value: 's', lengthRange: { min: 1, max: 1 } },
      // { type: 'nuclei', lengthRange: defaultLengthRange },
    ],
  },
  'jabba': {
    firstName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: defaultLengthRange },
      { type: 'codas', lengthRange: { min: 1, max: 1 } },
      // { type: 'codas', lengthRange: { min: 1, max: 1 } },
      { type: 'repeater', value: 2, lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 }, exclude: ['e'] },          
      { type: 'literal', value: ' ', lengthRange: { min: 1, max: 1 } },
      { type: 'literal', value: 't', lengthRange: { min: 1, max: 1 } },
      { type: 'literal', value: 'h', lengthRange: { min: 1, max: 1 } },
      { type: 'literal', value: 'e', lengthRange: { min: 1, max: 1 } },
    ],
    lastName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      // { type: 'codas', lengthRange: defaultLengthRange },
      { type: 'codas', lengthRange: { min: 1, max: 1 } },
      { type: 'repeater', value: 2, lengthRange: { min: 1, max: 1 } }
    ],
  },
  'obi-wan': {
    firstName: [
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'literal', value: '-', lengthRange: defaultLengthRange },
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 1, max: 1 }, exclude: ['e'] },          
    ],
    lastName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: defaultLengthRange },
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } }
    ],
  },
  'qui-gon': {
    firstName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'literal', value: '-', lengthRange: defaultLengthRange },
      { type: 'onsets', lengthRange: { min: 1, max: 1 } },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 2, max: 2 } },          
    ],
    lastName: [
      { type: 'onsets', lengthRange: defaultLengthRange },
      { type: 'nuclei', lengthRange: { min: 1, max: 1 } },
      { type: 'codas', lengthRange: { min: 2, max: 2 } },
    ],
  }
}

export default class NameGenerator {
  constructor() {    
    // this.nameStyles = ['basic', 'qui-gon', 'obi-wan', 'jar-jar', 'jabba', 'yoda'];
    this.nameStyles = ['han', 'mace', 'kylo', 'poe', 'obi-wan', 'jar-jar', 'jabba', 'yoda'];
    this.basicStyles = ['han', 'mace', 'kylo', 'poe'];
    this.esPlurals = ['h', 'sh', 'sch', 'v', 'x', 'z'];
    this.usedKeys = [];
    this.totalCalls = 0;
    this.special = undefined;
    this.produceRandomNextPiece = (firstPiece, typeArr, currentWord) => {
      // console.warn('CURRENT WORD SO FAR IS:', currentWord);
      firstPiece = firstPiece.toLowerCase();
      // console.warn('firstPiece IS:', firstPiece);
      let ruleData = this.cachedRules;
      let followerArray = typeArr;
      if (ruleData.invalidFollowers[firstPiece]) {
        if (ruleData.nuclei.indexOf(firstPiece) === -1) {
          // console.log(firstPiece, 'produceRandomNextPiece got', firstPiece, 'invalid followers:', ruleData.invalidFollowers[firstPiece])
        }
        followerArray = followerArray.filter(letter => ruleData.invalidFollowers[firstPiece].indexOf(letter) === -1);
        // if (ruleData.codas.indexOf(firstPiece) > -1) {
          // console.log('only searchiing limited array for firstPiece', firstPiece);
          // console.info(followerArray);
        // }
      }
      return this.getRandomUnitFromArray(followerArray);
    }
    this.getRandomUnitFromArray = (typeArr) => {      
      if (typeArr.filter && this.special === 'simple') {
        typeArr = typeArr.filter(segment => segment.length === 1);    
      }
      return typeArr[randomInt(0, typeArr.length - 1)];
    }
    this.randomVowel = (ruleData) => {
      let vowels = ruleData.nuclei;
      if (this.special === 'simple') {
        vowels = ruleData.nuclei.filter(segment => segment.length === 1);
      }
      let rando = vowels[randomInt(0, vowels.length - 1)];
      if (!randomInt(0, 1000)) {
        rando = 'y'
      }
      return rando;
    };
    this.characterNames = [
      'Jar Jar Binks',
      'Qui-Gon Jinn',
      'Obi-Wan Kenobi',
      'Poe Dameron',
      'Mace Windu',
      'Chewbacca',
      'Jabba the Hutt',
      'Yoda',
      'Leia Organa',
      'Han Solo',
      'Padme Amidala',
      'Kylo Ren',
    ];
    this.defaultLengthRange = defaultLengthRange;

    this.namePatterns = namePatterns;
    this.cachedRules = undefined;

    this.produceName = (pattern) => {
      // // console.log('cached', this.cachedRules)
      let nameData = {
        fullName: '',
        wordUnits: {
          firstName: [],
          lastName: []
        },
      };
      for (let wordType in pattern) {
        // console.log('pattern', pattern)
        let word = pattern[wordType];
        // console.log('word', word)
        word.map((unit, i) => {
          let newPiece;
          if (unit.type === 'literal') {
            let lastPiece = nameData.wordUnits[wordType][i - 1];
            if (unit.value === 's' && this.esPlurals.includes(lastPiece)) {
              newPiece = 'es';
            } else {
              newPiece = unit.value;
            }
          } else if (unit.type === 'repeater') {
            newPiece = nameData.wordUnits[wordType][unit.value];
          } else {
            // console.log('making filteredArray for type', unit.type)
            let filteredArray = this.cachedRules[unit.type];

            // apply exclusions and char limit

            if (unit.exclude) {
              filteredArray = filteredArray.filter(wordUnit => !unit.exclude.includes(wordUnit[0]));
              // // console.error('exclude now filteredArray', filteredArray)
            } if (unit.lengthRange.min > 1 || unit.lengthRange.max < 5) {
              filteredArray = filteredArray.filter(wordUnit => wordUnit.length >= unit.lengthRange.min && wordUnit.length <= unit.lengthRange.max);
              // // console.error('lengthRange now filteredArray', unit.lengthRange.min, 'to', unit.lengthRange.max, filteredArray)
            }

            // capitalize if first of word string or preceded by hyphen

            let lastPiece = nameData.wordUnits[wordType][i - 1];
            if (i > 0 && lastPiece !== '-') {
              newPiece = this.produceRandomNextPiece(lastPiece, filteredArray, nameData.wordUnits[wordType]);
            } else {
              // first letter
              // not scanned for previous-letter-based rules
              newPiece = this.getRandomUnitFromArray(filteredArray);
              newPiece = newPiece[0].toUpperCase() + newPiece.slice(1, newPiece.length);
            }
          }
          // if (newPiece) {
          //   if (newPiece.length > unit.lengthRange.max) {
          //     // console.warn(newPiece, 'longer than', unit.lengthRange.max, 'at point', nameData.wordUnits[wordType], '. Truncating.');
          //   }
          //   if (newPiece.length < unit.lengthRange.min) {
          //     // console.warn(newPiece, 'shorter than', unit.lengthRange.min, 'at point', nameData.wordUnits[wordType]);
          //   }
          // }          
          nameData.wordUnits[wordType].push(newPiece);
        });
      }
      return nameData;
    }
    this.getViolations = (nameData) => {
      // console.log('getting viol for namedata', nameData)
      // console.log('using cached rules')
      // console.log(this.cachedRules)
      let banned = false;
      let invalid = false
      let violation;
      let wordArray = nameData.nameArray;
      // let wordArray = [nameData.wordUnits.firstName.join(''), nameData.wordUnits.lastName.join('')];
      let invalidStrings = {
        banned: this.cachedRules.banned,  
        universal: this.cachedRules.universal,  
        startWord: this.cachedRules.startWord,  
        midWord: this.cachedRules.midWord,  
        endWord: this.cachedRules.endWord,  
        loneWord: this.cachedRules.loneWord,  
      };     
      // console.log('using invalidStrings', invalidStrings)
      for (let i = 0; i < wordArray.length; i++) {
        let word = wordArray[i].toLowerCase();
        for (let ruleType in invalidStrings) {
          let invalidArr = invalidStrings[ruleType];
          // // console.log(word, 'searching ruleType', ruleType)
          for (let s = 0; s < invalidArr.length; s++) {
            let invalidString = invalidArr[s];
          
            // // console.log('checking',word,'for',invalidString,'using',ruleType)
  
            if (word.indexOf(invalidString) > -1) {  
              let violating;
              let stringIndex = word.indexOf(invalidString);
              if (ruleType === 'universal' || ruleType === 'banned') {
                violating = true;
              } else if (ruleType === 'startWord') {
                violating = stringIndex === 0;
              } else if (ruleType === 'midWord') {
                violating = (stringIndex !== 0 && stringIndex !== word.length - invalidString.length);
              } else if (ruleType === 'endWord') {
                violating = stringIndex === word.length - invalidString.length;
              } else if (ruleType === 'loneWord') {
                violating = word === invalidString;
              }
              if (violating) {   
                // // console.log(word,'violated',ruleType,violating)
                // console.warn("VIOLATOR!", word, invalidString, ruleType)
                if (invalidStrings.banned.indexOf(invalidString) > -1) {
                  // console.error(word, 'is BANNED!')
                  banned = true;
                } else {
                  // console.error(word, 'is INVALID')
                  invalid = true;
                }
                violation = {
                  rule: ruleType,
                  invalidString: {
                    value: invalidString,
                    index: nameData.fullName.toLowerCase().indexOf(invalidString)
                  }
                };                
                return {
                  banned: banned,
                  invalid: invalid,
                  violation: violation
                }
              }
            } else {
              // // console.log(word,'DOES NOT HAVE',invalidString)
            }
          };
        }
      }
      return {
        banned: banned,
        invalid: invalid,
        violation: violation
      }
    }
    this.getName = (ruleData, style, special) => {
      let nameData = {};
      this.special = special;
      // console.log('ruleData is', ruleData)
      if (ruleData) {
        this.cachedRules = ruleData;
        // console.log('caching rules!', ruleData.creator, ruleData);        
      } else {
        ruleData = this.cachedRules;
        // console.log('using cached rules', this.cachedRules)
      }
      this.totalCalls++; 
      let invalidStrings = {
        banned: ruleData.banned,
        universal: ruleData.universal,
        startWord: ruleData.startWord,
        midWord: ruleData.midWord,
        endWord: ruleData.endWord,
        loneWord: ruleData.loneWord,        
      }
      let firstName;
      let lastName;
      let mode = style;
      if (style === 'random') {
        mode = this.nameStyles[randomInt(0, this.nameStyles.length - 1)];        
        if (mode === 'basic') {
          mode = this.basicStyles[randomInt(0, this.basicStyles.length - 1)];          
        }
      } else {
        if (style === 'basic') {
          mode = this.basicStyles[randomInt(0, this.basicStyles.length - 1)];
        }
      }
      // // console.error('mode', mode)
      let newName = this.produceName(this.namePatterns[mode]);
      nameData = newName;
      firstName = newName.wordUnits.firstName.join('');
      lastName = newName.wordUnits.lastName.join('') || '';
      if (invalidStrings.banned.indexOf(firstName.toLowerCase()) > -1) {
        nameData.banned = true;
      }
      let actualLastName = lastName;
      if (actualLastName[0] === ' ') {
        // console.error('had to fix last name', lastName)
        actualLastName = actualLastName.slice(1, lastName.length);
      }
      if (invalidStrings.banned.indexOf(actualLastName.toLowerCase()) > -1) {
        nameData.banned = true;
      }
      let names = Object.values({ ...nameData.wordUnits });      
      names.map((word, i) => { names[i] = word.join('') });      
      nameData.fullName = names.join(' ');
      if (this.usedKeys.indexOf(nameData.fullName) === -1) {
        let nameArray = nameData.fullName.split(' ');
        this.usedKeys.push(nameData.fullName);
        if (nameArray.length === 3) {
          nameArray = [
            nameArray[0].split(' ')[0],
            nameArray[2]
          ];
        }
        if (nameArray[0].includes('-')) {
          nameArray = [
            nameArray[0].split('-')[0],
            nameArray[0].split('-')[1],
            nameArray[1]
          ];          
        }
        nameData.nameArray = nameArray;
        let violationData = this.getViolations(nameData);
        nameData.banned = violationData.banned;
        nameData.invalid = violationData.invalid;
        nameData.violation = violationData.violation;
        nameData.style = mode;
        if (violationData.violation) {
          // console.error('violationData', nameData.fullName, violationData);        
          // console.error('returning', nameData);        
        }
        return nameData;
      } else {
        return { fullName: nameData.fullName, redundant: true }
      }
    };
  }
}