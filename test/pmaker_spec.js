import { getDomainName, makePassword } from 'pmaker-lib/pmaker';

describe('Password Maker', function() {
    it('should generate identical passwords as SuperGenPas does', function() {
        expect(makePassword('a', 'b', 10)).toEqual('bDmOz98Cih');
        expect(makePassword('ą', 'b', 10)).toEqual('cexWY2XgHb');
    });

    it('should get domain name from URL properly', function() {
        var testData = [
            ['https://www.google.com/accounts/Login?hl=pl&continue=http://www.google.pl/', 'google.com'],

            ['googlE.com', 'google.com'],
            ['google.com?hl=pl', 'google.com'],

            ['http://www.anathema.art.pl/forum/login.php', 'anathema.art.pl'],

            ['http://foo.example.com:1234/bar', 'example.com'],

            ['http://a.com.ar', 'a.com.ar'],
            ['http://a.comm.ar', 'comm.ar'],

            ['http://a.act.du.au', 'du.au'],
            ['http://a.ac.edu.au', 'ac.edu.au'],
            ['http://a.act.edu.au', 'a.act.edu.au'],

            ['http://a.b.kawasaki.jp', 'a.b.kawasaki.jp'],
            ['http://a.city.kawasaki.jp', 'city.kawasaki.jp'],

            ['file://localhost/file', 'localhost']
        ];

        for (var i = 0, l = testData.length; i < l; i++) {
            expect(getDomainName(testData[i][0])).toEqual(testData[i][1]);
        }
    });
});
