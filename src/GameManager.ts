import Player from "./Player";
import IPlayer from "./IPlayer";
export default class GameManager{

    private static instance : GameManager; 
    //creation of concrete objects could be improved but seems pretty fine for console based app  
    private player1: Player;
    private player2: Player;


    private constructor(player1 : IPlayer,player2: IPlayer)
    {
        this.player1 = new Player(player1);
        this.player2 = new Player(player2); 
    }
    //exposing the player objects from the gameManager class for testing purposes
    //these functions are not used anywhere in the code except in the test classes
    /*-----------------------*/
    public getPlayer1Instance()
    {
        return this.player1;
    }
    public getPlayer2Instance()
    {
        return this.player2;
    }
    /*-----------------------*/


    //single instance of the GameManager will be provided anywhere it is needed
    public static getInstance(player1 : IPlayer,player2: IPlayer)
    {
        if(GameManager.instance) return GameManager.instance;
        this.instance =  new GameManager(player1,player2);
        return this.instance;
    }

    public currentAttackerName()
    {
        try{
            if(this.player1.getState()) return this.player1.getPlayerName();
            return this.player2.getPlayerName();
        }catch(e)
        {
            console.error(e);
        }
    }
    public currentDefenderName() {
        if(!this.player1.getState()) return this.player1.getPlayerName();
        return this.player2.getPlayerName();
    }


    public decideOpener() {
        const player1Health = this.player1.getHealth();
        const player2Health = this.player2.getHealth();
    
        this.player1.setState(player1Health < player2Health);
        this.player2.setState(!this.player1.getState());
    }

    //this evalutes the players health after the round has been played
    private evaluateRound(attackerDiceVal: number,defenderDiceVal: number)
    { 
        try{
            const attacker = this.player1.getState() ? this.player1 : this.player2;
            const defender = this.player1.getState() ? this.player2 : this.player1;

            const attack = attacker.playerAttack(attackerDiceVal);
            const strength = defender.playerStrenght(defenderDiceVal);
            const damage = defender.totalDamage(attack, strength);
            defender.reevaluateHealthAfterAttack(damage);

            // Swap states for next round
            this.player1.setState(!this.player1.getState());
            this.player2.setState(!this.player2.getState());

            console.log(defender.getPlayerName(), defender.getHealth());
            return defender.getHealth();
        }catch(e)
        {
            console.error(e);
        }
    }
    private validateDiceValues(attackerDiceVal : number, defenderDiceVal: number) : boolean {
        if ((attackerDiceVal >= 1 && attackerDiceVal <= 6) && (defenderDiceVal >= 1 && defenderDiceVal <= 6)) {
            return true;
        } else {
            return false;
        }
    }

    //main method that can be called from the starting point
    //would return the remaining health of the defender
    public startGame(attackerDiceVal: number,defenderDiceVal: number)
    {
        const validDice = this.validateDiceValues(attackerDiceVal,defenderDiceVal)
        if(validDice)
        return this.evaluateRound(attackerDiceVal,defenderDiceVal);   
        return;
    }

    public findWinner(): string {
        return this.player1.getHealth() > this.player2.getHealth() ? this.player1.getPlayerName() : this.player2.getPlayerName();
    }

    public isGameOver() : boolean 
    {
        if(this.player1.getHealth() <= 0 || this.player2.getHealth() <= 0) return true;
        return false;
    }
    
    
}
