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

	it('should do a chunky nested set query', function () {

		this.timeout(5000);

		function r(start, range){
			return start + Math.round(Math.random() * range);
		}

		function rarr(len, range){
			var ret = [];
			for(var i=0; i<len; i++){
				ret.push(r(1, range));
			}
			return ret;
		}

		var counter = 0;
		var bad = 0;
		var bads = {};
		for(var i=0; i<100; i++){
			var toplength = r(1, 20);
			var bottomlength = r(1, 5);
			var top = rarr(toplength, 10);
			var bottom = ([]).concat(top, rarr(bottomlength, 10));
			var parent = parser(top);
			var child = parser(bottom);
		
			var isleftinside = child.left.encoding > parent.left.encoding;
			var isrightinside = child.right.encoding < parent.right.encoding;

			if(!isleftinside || !isrightinside){
				
				if(!bads[top.join('.')]){
					bad++;
					console.log('-------------------------------------------');
					console.log('-------------------------------------------');
					console.dir(top);
					console.log('-------------------------------------------');
					console.dir(bottom);
					bads[top.join('.')] = true;
				}

				
				
					
			}

			counter++;
		}

		console.log('-------------------------------------------');
		console.log(bad);
		console.log('/');
		console.dir(counter);

		//var parent = parser([5,10,23,38,3,34,5,6,67,6,5,4,3,4,56]);
		//var child = parser([5,10,23,38,3,34,5,6,67,6,5,4,3,4,56,5]);
/*
		var parent = parser([3,4,2]);
		var child = parser([3,4,2,3,3,1,2,4,9,12,15]);
		console.log('');
		console.log(parent.left.encoding + ' ' + parent.right.encoding);
		console.log(child.left.encoding + ' ' + child.right.encoding);
		
		var isleftinside = child.left.encoding > parent.left.encoding;
		var isrightinside = child.right.encoding < parent.right.encoding;
		
		isleftinside.should.equal(true);
		isrightinside.should.equal(true);		
*/

	})  

  
})

