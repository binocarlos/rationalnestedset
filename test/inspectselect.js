var parser = require('../');

describe('inspectselect', function(){

  it('should parse a simple selector', function () {

  	var parsed = parser('city.south[name=bristol]');

    parsed.length.should.equal(1);
    parsed[0].length.should.equal(1);

    var selector = parsed[0][0];

    selector.tagname.should.equal('city');
  })

  
})
