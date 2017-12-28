var minimalData
function Fighter(name,power,skill,strength){

  this.name = name;
  this.points = 0;
  this.power = power;
  this.skill = skill;
  this.strength = strength;
  this.PC = 0;
}

function Tournament(name,startDate,endDate,numFighter,fighters,fightProfile){

  this.name = name;
  this.startDate = startDate;
  this.endDate = endDate;
  this.numFighter = numFighter;
  this.fighters = fighters;
  this.clasifications = shuffle(fighters).slice();
  this.matchResults = []
  this.fightProfile = fightProfile; 
}

Tournament.prototype.fight = function(){

  var winners = this.fighters.slice();

  if(winners.length === 1)
  {
    console.log('The winner is '+winners[0].name)
    return;
  }
  for (var i = 0; i < winners.length; i+=2) {
    var setsPlayer1 = 0;
    var setsPlayer2 = 0;
    console.log(winners[i].name +' vs '+ winners[i+1].name);
    for(var a = 0; a<3; a++){

      this.calPC(winners[i]);
      this.calPC(winners[i+1]);
      if((a == 2 && setsPlayer1==2) || (a == 2 && setsPlayer2==2))break
      else if(winners[i].PC > winners[i+1].PC)setsPlayer1++
      else setsPlayer2++ 
    }
    if(setsPlayer1>setsPlayer2)this.fighters.splice(this.fighters.indexOf(winners[i+1]),1)
    else this.fighters.splice(this.fighters.indexOf(winners[i]),1)
    this.matchResults.push(setsPlayer1,setsPlayer2);
  }
  
  console.log('------------------------');
  this.fight();
  generateBracket(this.clasifications,this.matchResults);
};

Tournament.prototype.calPC = function(fighter) {
  var weightPower = this.fightProfile[0];
  var weightSkill = this.fightProfile[1];
  var weightStrength = this.fightProfile[2];

  fighter.PC = (randomInt(0,fighter.power)*weightPower)
        +(randomInt(0,fighter.skill)*weightSkill)
        +(randomInt(0,fighter.strength)*weightStrength);
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function randomInt(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

function generateBracket(teams,matchResults)
{
  minimalData = {
    teams :[],
    results :[]
  }
  for(var i = 0; i<teams.length; i+=2)
  {
    minimalData.teams.push([teams[i].name,teams[i+1].name])
  }
  switch(teams.length){

    case 4:
      minimalData.results.push([],[]);
      minimalData.results[0].push([matchResults[0],matchResults[1]],
                                  [matchResults[2],matchResults[3]]);

      minimalData.results[1].push([matchResults[4],matchResults[5]])
    case 8:
      minimalData.results.push([],[],[])
      minimalData.results[0].push([matchResults[0],matchResults[1]],
                                  [matchResults[2],matchResults[3]],
                                  [matchResults[4],matchResults[5]],
                                  [matchResults[6],matchResults[7]])

      minimalData.results[1].push([matchResults[8],matchResults[9]],
                                  [matchResults[10],matchResults[11]])

      minimalData.results[2].push([matchResults[12],matchResults[13]])

    case 16:
      minimalData.results.push([],[],[],[])
      minimalData.results[0].push([matchResults[0],matchResults[1]],
                                  [matchResults[2],matchResults[3]],
                                  [matchResults[4],matchResults[5]],
                                  [matchResults[6],matchResults[7]],
                                  [matchResults[8],matchResults[9]],
                                  [matchResults[10],matchResults[11]],
                                  [matchResults[12],matchResults[13]],
                                  [matchResults[14],matchResults[15]])

      minimalData.results[1].push([matchResults[16],matchResults[17]],
                                  [matchResults[18],matchResults[19]],
                                  [matchResults[20],matchResults[21]],
                                  [matchResults[22],matchResults[23]])

      minimalData.results[2].push([matchResults[24],matchResults[25]],
                                  [matchResults[26],matchResults[27]])

      minimalData.results[3].push([matchResults[28],matchResults[29]])

    case 32:
      minimalData.results.push([],[],[],[],[])
      minimalData.results[0].push([matchResults[0],matchResults[1]],
                                  [matchResults[2],matchResults[3]],
                                  [matchResults[4],matchResults[5]],
                                  [matchResults[6],matchResults[7]],
                                  [matchResults[8],matchResults[9]],
                                  [matchResults[10],matchResults[11]],
                                  [matchResults[12],matchResults[13]],
                                  [matchResults[14],matchResults[15]],
                                  [matchResults[16],matchResults[17]],
                                  [matchResults[18],matchResults[19]],
                                  [matchResults[20],matchResults[21]],
                                  [matchResults[22],matchResults[23]],
                                  [matchResults[24],matchResults[25]],
                                  [matchResults[26],matchResults[27]],
                                  [matchResults[28],matchResults[29]],
                                  [matchResults[30],matchResults[31]])

      minimalData.results[1].push([matchResults[32],matchResults[33]],
                                  [matchResults[34],matchResults[35]],
                                  [matchResults[36],matchResults[37]],
                                  [matchResults[38],matchResults[39]],
                                  [matchResults[40],matchResults[41]],
                                  [matchResults[42],matchResults[43]],
                                  [matchResults[44],matchResults[45]],
                                  [matchResults[46],matchResults[47]])

      minimalData.results[2].push([matchResults[48],matchResults[49]],
                                  [matchResults[50],matchResults[51]],
                                  [matchResults[52],matchResults[53]],
                                  [matchResults[54],matchResults[55]])

      minimalData.results[3].push([matchResults[56],matchResults[57]],
                                  [matchResults[58],matchResults[59]])

      minimalData.results[4].push([matchResults[60],matchResults[61]])

  }
  
  $(function() {
    $('#minimal').bracket({skipConsolationRound: true,
    init: minimalData})//data to initialize the bracket with 
  })
}

var jugardores =[
  new Fighter('Rubén',5,3,2),
  new Fighter('Sergio',5,3,2),
  new Fighter('Roberto',5,3,2),
  new Fighter('Javi',5,3,2),
  new Fighter('Raul',5,3,2),
  new Fighter('David',5,3,2),
  new Fighter('JD',5,3,2),
  new Fighter('Ismael',5,3,2),
  new Fighter('Yo',5,3,2),
  new Fighter('Tu',5,3,2),
  new Fighter('El',5,3,2),
  new Fighter('Nosotros',5,3,2),
  new Fighter('Vosotros',5,3,2),
  new Fighter('Ellos',5,3,2),
  new Fighter('Tambien',5,3,2),
  new Fighter('Ganan',5,3,2),
  new Fighter('Rubén',5,3,2),
  new Fighter('Sergio',5,3,2),
  new Fighter('Roberto',5,3,2),
  new Fighter('Javi',5,3,2),
  new Fighter('Raul',5,3,2),
  new Fighter('David',5,3,2),
  new Fighter('JD',5,3,2),
  new Fighter('Ismael',5,3,2),
  new Fighter('Yo',5,3,2),
  new Fighter('Tu',5,3,2),
  new Fighter('El',5,3,2),
  new Fighter('Nosotros',5,3,2),
  new Fighter('Vosotros',5,3,2),
  new Fighter('Ellos',5,3,2),
  new Fighter('Tambien',5,3,2),
  new Fighter('Ganan',5,3,2)
  ];

var torneo1 = new Tournament('Clash Royal','19/10/1996','21/10/1996',8,jugardores,[50,40,10]);

