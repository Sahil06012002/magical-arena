import * as readlineSync from 'readline-sync';
import GameManager from './GameManager';
import IPlayer from './IPlayer';

//taking positive values for player attributes
function getPositiveIntInput(prompt: string): number {
    let value: number;
    do {
        value = readlineSync.questionInt(prompt);
        if (value <= 0) {
            console.log("Please enter a positive integer.");
        }
    } while (value <= 0);
    return value;
}
//for now taking all the attributes from the user but better approach would be to start with some 
//specific health and store the user history and health
export function getPlayerInput(): IPlayer {
    const name = readlineSync.question('Enter player name: ');
    const health = getPositiveIntInput('Enter player health: ');
    const strength = getPositiveIntInput('Enter player strength: ');
    const attack = getPositiveIntInput('Enter player attack: ');
    return { name, health, strength, attack, state: false };
}


// Initialize players from console input
const player1Input = getPlayerInput();
const player2Input = getPlayerInput();

const gameManager = GameManager.getInstance(player1Input,player2Input);
gameManager.decideOpener();




//as soon as the defending player's health gets below or equal to 0 the game could be stopped and winner can be decided
while(!gameManager.isGameOver()){
    const currentAttacker = gameManager.currentAttackerName()//this method finds the attacker of the round
    const attackerPrompt = `${currentAttacker},You are the attacker, roll your dice by clicking Enter: `;
    readlineSync.question(attackerPrompt);
    const attackerDiceVal = Math.floor(Math.random()*6)+1;
    console.log("your dice value is ",attackerDiceVal);

    const currentDefender = gameManager.currentDefenderName()
    const defenderPrompt = `${currentDefender},You are the defender, roll your dice by clicking Enter: `;
    readlineSync.question(defenderPrompt);
    const defenderDiceVal = Math.floor(Math.random()*6)+1;
    console.log("your dice value is ",defenderDiceVal);

   //attacker will be decided in the gameManger class and attackerDiceVal will map to that player and accordingly for defender.
    gameManager.startGame(attackerDiceVal,defenderDiceVal);
}

const winner = gameManager.findWinner();
console.log("Game over. Congratulations, "+ winner + ",You are the winner!!!");




