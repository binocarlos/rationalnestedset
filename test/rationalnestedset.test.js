var parser = require('../');

describe('rational nested set', function(){

  it('should parse a position array', function () {

		var encodings = parser([3,4,2]);

		encodings.left.numerator.should.equal(65);
		encodings.left.denominator.should.equal(17);
		encodings.left.encoding.should.equal('000382352941176470588235294117647058');

		encodings.right.numerator.should.equal(88);
		encodings.right.denominator.should.equal(23);
		encodings.right.encoding.should.equal('000382608695652173913043478260869565');

  })

    it('should produce encodings that live inside a parent set', function () {

		var parent = parser([3,4,2]);
		var child = parser([3,4,2,8]);

		var isleftinside = child.left.encoding > parent.left.encoding;
		var isrightinside = child.right.encoding < parent.right.encoding;
		
		isleftinside.should.equal(true);
		isrightinside.should.equal(true);

  })

  
})

