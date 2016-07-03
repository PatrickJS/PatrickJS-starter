/**
 * Created by U80830793 on 06.06.2016.
 */

describe('shared-zas: simple.service', () => {

    beforeEach(() => {
        console.info('simple service beforeEach');
    });

    it('Simple service prouvant que les tests fonctionnent dans le starter', () => {
        let mock;

        mock = '7560000000000';
        expect(mock).toEqual('7560000000000');
    });
});
