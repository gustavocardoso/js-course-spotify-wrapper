const ireland = ['Dublin', 'Galway', 'Cork'];

const love = ireland.map(name => `I love ${name}!`);

const loveArrow = ireland.map(name => `I love ${name}!`);

const loveArrowSingle = ireland.map(name => `I love ${name}!`);

const loveArrowSingleLine = ireland.map(name => `I love ${name}!`);

const loveChain = ireland
                    .filter(name => name === 'Dublin' || name === 'Cork')
                    .map(name => `I love ${name}`);

console.log(love);
console.log(loveArrow);
console.log(loveArrowSingle);
console.log(loveArrowSingleLine);
console.log(loveChain);
