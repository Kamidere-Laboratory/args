import {expect} from 'chai';
import {args} from './node-args';

describe('Node Args module', function () {
    it('Should get default values', function () {
        const argv = ['a', 'b'];
        const obj = args(argv);

        expect(obj).to.have.property('additional').that.deep.equals(argv);
    });

    it('Should get additional values', function () {
        const argv = ['a', 'b', 'c', 'd'];
        const obj = args(argv);

        expect(obj.additional).to.be.deep.equal(argv);
    });

    it('Should get shorthand values', function () {
        const argv = ['a', 'b', 'c', '-ab', '-cd=2', '-e', 'false', '-f', 'something'];
        const obj = args(argv);

        expect(obj).to.have.deep.property('a', true);
        expect(obj).to.have.deep.property('b', true);
        expect(obj).to.have.deep.property('c', 2);
        expect(obj).to.have.deep.property('d', 2);
        expect(obj).to.have.deep.property('e', false);
        expect(obj).to.have.deep.property('f', 'something');
        expect(obj.additional).to.be.deep.equal(['a', 'b', 'c']);
    });

    it('Should get named values', function () {
        const argv = ['a', 'b', 'c', '--abc', '--def=2', '--g', 'false', '--h', 'something'];
        const obj = args(argv);

        expect(obj).to.have.deep.property('abc', true);
        expect(obj).to.have.deep.property('def', 2);
        expect(obj).to.have.deep.property('g', false);
        expect(obj).to.have.deep.property('h', 'something');
        expect(obj.additional).to.be.deep.equal(['a', 'b', 'c']);
    });

    it('Should handle wrong values', function () {
        const argv = ['a', 'b', '-', 'c', '--', '-', 'd', '-g', '--'];
        const obj = args(argv);

        expect(obj).to.exist;
        expect(Object.keys(obj)).to.be.deep.equal(['additional', 'g']);
        expect(obj).to.have.deep.property('additional').that.deep.equals(['a', 'b', 'c', 'd']);
        expect(obj).to.have.deep.property('g', true);
    });

    it('Should get true value for left variables', function () {
        const argv = ['a', 'b', '-cd'];
        const obj = args(argv);

        expect(obj).to.exist;
        expect(Object.keys(obj).sort()).to.be.deep.equals(['additional', 'c', 'd']);
        expect(obj).to.has.deep.property('c', true);
        expect(obj).to.has.deep.property('d', true);
        expect(obj.additional).to.be.deep.equal(['a', 'b']);
    });
});
