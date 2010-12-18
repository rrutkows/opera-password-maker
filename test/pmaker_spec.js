describe("Password Maker", function() {

    it("should generate identical passwords as SuperGenPas does", function() {
        expect(makePassword("a", "b", 10)).toEqual("bDmOz98Cih");
        expect(makePassword("ą", "b", 10)).toEqual("cexWY2XgHb");
    });

    it("should get domain name from URL properly", function() {
        var testData = [
            ["https://www.google.com/accounts/ServiceLogin?service=mail", "google.com"],

            ["http://www.anathema.art.pl/forum/login.php", "anathema.art.pl"],

            ["http://a.ba.ar", "a.ba.ar"],
            ["http://a.uba.ar", "uba.ar"],

            ["http://a.act.du.au", "act.du.au"],
            ["http://a.ac.edu.au", "ac.edu.au"],
            ["http://a.act.edu.au", "a.act.edu.au"],

            ["http://a.b.c.tokyo.jp", "b.c.tokyo.jp"],
            ["http://a.b.metro.tokyo.jp", "metro.tokyo.jp"],

            ["http://a.b.go.nc.tr", "go.nc.tr"],
            ["http://a.b.go.nic.tr", "nic.tr"],
            ["http://a.b.gov.nc.tr", "b.gov.nc.tr"],

            ["file://localhost/file", "localhost"]
        ];
        
        for (var i = 0, l = testData.length; i < l; i++)
            expect(getDomainName(testData[i][0])).toEqual(testData[i][1]);
    });
});
