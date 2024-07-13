import Player from '../Player';
import IPlayer from '../IPlayer';

describe('Player', () => {
    const playerData: IPlayer = {
        name: 'Player1',
        health: 100,
        strength: 50,
        attack: 30,
        state: false
    };

    let player: Player;

    beforeEach(() => {
        player = new Player(playerData);
    });

    test('should return correct health', () => {
        expect(player.getHealth()).toBe(100);
    });

    test('should set health correctly', () => {
        player.setHealth(80);
        expect(player.getHealth()).toBe(80);
    });

    test('function should calculate attack correctly for all values', () => {
        expect(player.playerAttack(2)).toBe(60);
        expect(player.playerAttack(-1)).toBe(30);
    });


    test('function should calculate strength correctly for all values', () => {
        expect(player.playerStrenght(2)).toBe(100);
        expect(player.playerStrenght(-1)).toBe(50);
    });

    test('damage should happen only when attack is greater than strength else it should be 0 ', () => {
        expect(player.totalDamage(100, 50)).toBe(50);
        expect(player.totalDamage(30, 50)).toBe(0);

    });

    test('test for negetive values', () => {
        expect(player.totalDamage(-100, 50)).toBe(0);
        expect(player.totalDamage(30, -50)).toBe(30);//if strength is negetive attack would happen upto its maximum extent

    });

    test('function should reevaluate health correctly after attack correctly', () => {
        player.reevaluateHealthAfterAttack(30);
        expect(player.getHealth()).toBe(70);
    });

    test('function should reevaluate health correctly after attack correctly for negetive damages', () => {
        player.reevaluateHealthAfterAttack(-50);
        expect(player.getHealth()).toBe(100);
    });
});
