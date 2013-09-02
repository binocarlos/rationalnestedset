# Rational Nested Set Tree Encoder



This Library is responsible for creating the [Rational Number](http://en.wikipedia.org/wiki/Rational_number)
keys for creating a nested set tree structure

The big advantage over normal nested set is that insert speeds are much faster because you do not need to update
other encodings in the database

The premise is that the left boundary of the [Nested Set Model](http://en.wikipedia.org/wiki/Nested_set_model)
is calculated as a rational number based upon a [Continued Fraction](http://en.wikipedia.org/wiki/Continued_fraction)
which uses an alternate sequence of relative node position and unity as it's values.

The right boundary is assumed to be the left boundary of the nodes immediate sibling - this results in being able
to retrieve descendants and ancestors of a node with one SQL hit.

Each boundary is represented as 2 integers - the numerator and denominator of the rational number and each node
will contain it's own numerator and denominator (as the left boundary) and that of it's immediate sibling (as the right boundary).

This means if:

   	ln = left numerator, ld = left denominator

   	rn = right numerator, rd = right denominator

then all descendants of this node can be retrieved using:

   	( this.ln / this.ld ) < ( descendant.ln / descendant.ld ) < ( this.rn / this.rd )

and all ancestors of this node can be retrieved using:

   	( ancestor.ln / ancestor.ld ) < ( this.ln / this.ld ) < ( ancestor.rn / ancestor.rd )

More importantly - inserting a new node into the tree becomes far more efficient because there are infinite rational numbers
that lie BETWEEN ( this.ln / this.ld ) and ( this.rn / this.rd )

Using the classic nested set left and right singular values - an average of n/2 updates needed to be made just to insert one node!

Using this method - a the left and right keys for a descendant can be calculated and are guaranteed to fall within the left and right 
boundaries of the parent node without having to affect the rest of the tree - making inserts a factor of 1 rather than averaging n/2.

This is based upon the stirling work done by Dan Hazel (dan hazel@technologyonecorp.com) in his paper
[Using rational numbers to key nested sets](http://arxiv.org/abs/0806.3115) - all credit due to him : )

This library makes use of the gmp extenstion to do large number arithmetic and and will return strings of those numbers
this is because larger numbers will fall over (32-bit limitations) and so we will pass these string values into MySQL
which will use the decimal field type to do it's internal calculations

## Usage

```js

var rationalnestedset = require('rationalnestedset');

// get the tree encodings for the 5th thing inside the 4th thing inside the 3rd thing
var encodings = rationalnestedset([3, 4, 5]);

console.dir(encodings);

```


## Installation

    $ npm install rationalnestedset

## Running Tests

To run the test suite first invoke the following command within the repo, installing the development dependencies:

    $ npm install

then run the tests:

    $ make test

## License 

(The MIT License)

Copyright (c) 2006-2013 Kai Davenport

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.