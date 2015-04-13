'use strict';
/* jshint node:true*/
/*globals describe, it*/

var chai = require('chai');
var expect = chai.expect;
var netto = require('..');

describe('#defaults', function () {
    it('1 equal to 1', function () {
        expect(1).to.equal(1);
    });

    it('netto.root to empty string', function () {
        expect(netto.root).to.be.empty;
    });

    it('netto.env to \'node\'', function () {
        expect(netto.env).to.equal('node');
    });
});

describe('GET requests to jsonplaceholder.typicode.com', function () {
    it('netto.root should change to \'jsonplaceholder.typicode.com\'', function () {
        netto.root = 'jsonplaceholder.typicode.com';
        expect(netto.root).to.equal('jsonplaceholder.typicode.com');
    });

    it ('/posts returns 100 posts and no error', function (done) {
        netto.get('/posts', function (err, data) {
            data = JSON.parse(data);
            expect(err).to.be.null;
            expect(data.length).to.equal(100);
            done();
        });
    });

    it('/posts/1 returns post with id 1 and no error', function (done) {
        netto.get('/posts/1', function (err, data) {
            data = JSON.parse(data);
            expect(err).to.be.null;
            expect(data.id).to.equal(1);
            done();
        });
    });

    it('/posts?userId=2 returns posts by user 2 and no error', function (done) {
        var expected = { 
            userId: 2,
            id: 11,
            title: 'et ea vero quia laudantium autem',
            body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi' 
        };
        netto.get('/posts?userId=2', function (err, data) {
            data = JSON.parse(data);
            expect(err).to.be.null;
            expect(data[0]).to.deep.equal(expected);
            done();
        });
    });
});

describe('POST requests to jsonplaceholder.typicode.com', function () {
    it('/posts returns id of new successful post and no error', function (done) {
        var  data = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        netto.post('/posts', data, function (err, data) {
            data = JSON.parse(data);
            expect(err).to.be.null;
            expect(data).to.deep.equal({ id: 101 });
            done();
        });
    });
});

describe('Update requests to jsonplaceholder.typicode.com', function () {
    it('/posts/1 PUT returns updated post', function (done) {
        var  data = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        netto.put('/posts/1', data, function (err, data) {
            data = JSON.parse(data);
            expect(err).to.be.null;
            expect(data.id).to.equal(1);
            done();
        });
    });

    it('/posts/1 PATCH returns updated post', function (done) {
        var  data = {
            title: 'foo',
            body: 'bar'
        };
        netto.patch('/posts/1', data, function (err, data) {
            data = JSON.parse(data);
            expect(err).to.be.null;
            expect(data.id).to.equal(1);
            done();
        });
    });
});


describe('DELETE requests to jsonplaceholder.typicode.com', function () {
    it('/posts/1 returns status code', function (done) {
        netto.delete('/posts/1', function (err, data) {
            data = JSON.parse(data);
            expect(err).to.be.null;
            expect(data.status).to.equal(204);
            done();
        });
    });
});