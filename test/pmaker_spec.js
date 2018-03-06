import { makePassword } from 'pmaker-lib/pmaker';

describe('Password Maker', function() {
    it('should generate identical passwords as SuperGenPas does', function() {
        expect(makePassword('a', 'b', 10)).toEqual('bDmOz98Cih');
        expect(makePassword('ą', 'b', 10)).toEqual('cexWY2XgHb');
    });
});
