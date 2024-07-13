import IPlayer from "./IPlayer";
export default class Player{
    private name : string;
    private  health : number;
    public strength : number;
    public attack : number;
    private state : boolean;
    constructor(player : IPlayer)
    {
        this.name = player.name;
        this.health = player.health;
        this.strength = player.strength;
        this.attack = player.attack;
        this.state = player.state
    }
    public setState(state : boolean)
    {
        this.state = state;
    }
    public getState()
    {
        return this.state;
    }
    public getHealth()
    {
        return this.health;
    }
    public setHealth(health: number)
    {
        (health < 0) ? this.health = 0 : this.health = health;
    }

    public getPlayerName()
    {
        return this.name
    }
    public playerAttack(diceValue: number)
    {
        if(diceValue < 1 || diceValue > 6) return this.attack;
        return this.attack*diceValue;
    }
    public playerStrenght(diceValue: number)
    {
        if(diceValue < 1 || diceValue > 6) return this.strength;
        return this.strength*diceValue;
    }
    public totalDamage(attack : number,strength : number)
    {
        if(strength < 0) strength = 0;
        //if strength is greater than attack there will be no damage
        if(attack > strength)
        return attack-strength;
        return 0;
    }
    public reevaluateHealthAfterAttack(damage : number)
    {
        if(damage > 0)
        this.health = this.health-damage;
    }

}