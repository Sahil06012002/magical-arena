import GameManager from '../GameManager';
import IPlayer from '../IPlayer';

describe('GameManager', () => {
    const player1Data: IPlayer = {
        name: 'Player1',
        health: 100,
        strength: 50,
        attack: 30,
        state: false
    };

    const player2Data: IPlayer = {
        name: 'Player2',
        health: 120,
        strength: 40,
        attack: 35,
        state: false
    };

    let gameManager: GameManager;

    beforeEach(() => {
        gameManager = GameManager.getInstance(player1Data, player2Data);
    });

    test('test should check if the game is over',() => {
        expect(gameManager.isGameOver()).toBe(false);
    })

    //state  of the player with lower health levels is set to true
    test('test should decide opener correctly', () => {
        gameManager.decideOpener();
        expect(gameManager.currentAttackerName()).toBe('Player1');
    });

    //uptill this point no round hass been played so winner will be player2 
    test('test should find winner correctly', () => {
        const winner = gameManager.findWinner();
        expect(winner).toBe('Player2');
    });

    //adding out of bound dice values
    test('test should not affect the health of the defender and fucntion is doing a early return', () => {
        gameManager.decideOpener();
        const remainingHealth = gameManager.startGame(7, 9); // startGame return the remaining health of the defender 
        expect(remainingHealth).toBeUndefined();
    });


    //attacker -> player1 with dice value 4 and total attack will be 4*30 = 120
    //defender -> player2 with dice value 2 and total defending strength 2*40 = 80
    //total damage to defender = 120-80 => 40
    //remaining health of the defender will be 120-40 => 80

    test('test should evaluate round1 correctly', () => {
        gameManager.decideOpener();
        const remainingHealth = gameManager.startGame(4, 2); // startGame return the remaining health of the defender 
        expect(remainingHealth).toBe(80);
    });


    //now attacker is player2
    //attacker -> player2 with dice value 2 and total attack will be 70
    //defender -> player1 with dice value 1 and total defending strength 50
    //total damage to defender = 70-50 => 20
    //remaining health of the defender will be 100-20 => 80
    test('test should evaluate round2 correctly', () => {
        const remainingHealth = gameManager.startGame(2, 1); // startGame return the remaining health of the defender 
        expect(remainingHealth).toBe(80);
    });


    test('explicitly ending the game and checking the isOver function',()=>{
        const player1 = gameManager.getPlayer1Instance();
        player1.setHealth(0);
        expect(gameManager.isGameOver()).toBe(true);
    })

});
