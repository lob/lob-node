'use strict';

var Bluebird = require('bluebird');
var chai     = require('chai');
var sinon    = require('sinon');

var Endpoint  = require('../lib/endpoint');
var Requester = require('../lib/requester');

var expect = chai.expect;

describe('endpoint', function () {

  describe('makePathInterpolator', function () {
    it('should return a function that can interpolate a string', function () {
      var interpolator = Endpoint.makePathInterpolator('/hi/{company}/1/{id}');
      expect(interpolator({ id: 123, company: 'lob' }))
        .to.eql('/hi/lob/1/123');
    });
  });

  describe('createArgObject', function () {
    it('should collect arguments from an array into a hash', function () {
      var args = ['hello', 1];
      var argNames = ['msg', 'num'];
      expect(Endpoint.createArgObject(args, argNames))
        .to.eql({ msg: 'hello', num: 1 });
    });

    it('should not collect more arguments then argument names', function () {
      var args = ['hello', 1, 'extra'];
      var argNames = ['msg', 'num'];
      expect(Endpoint.createArgObject(args, argNames))
        .to.eql({ msg: 'hello', num: 1 });
    });
  });

  describe('makeIndividual', function () {
    var res = ['res', 'body'];
    it('should create a function which makes a GET request', function () {
      var settings = {
        host: 'https://api.lob.com',
        basePath: '/v1',
        key: 'key',
        userAgent: 'agent'
      };
      var endpointSettings = {
        name: 'hello',
        method: 'GET',
        path: '/test/{id}',
        args: ['id']
      };
      var id = 'abc123';

      var requesterMock = sinon.mock(Requester);
      requesterMock.expects('request').once()
        .withArgs({
          url: 'https://api.lob.com/v1/test/abc123',
          auth: {
            user: 'key',
            password: ''
          },
          headers: {
            'User-Agent': 'agent'
          },
          json: true,
          method: 'GET'
        })
        .returns(Bluebird.resolve(res).nodeify());

      var requestFunc = Endpoint.makeIndividual(settings, endpointSettings);
      requestFunc(id)
      .then(function () {
        requesterMock.verify();
      })
      .finally(function () {
        requesterMock.restore();
      });
    });

    it('should create function which makes a POST request', function () {
      var settings = {
        host: 'https://api.lob.com',
        basePath: '/v1',
        key: 'key',
        userAgent: 'agent'
      };
      var endpointSettings = {
        name: 'hello',
        method: 'POST',
        path: '/test'
      };
      var params = { company: 'lob', number: 123 };

      var requesterMock = sinon.mock(Requester);
      requesterMock.expects('request').once()
        .withArgs({
          url: 'https://api.lob.com/v1/test',
          auth: {
            user: 'key',
            password: ''
          },
          headers: {
            'User-Agent': 'agent'
          },
          form: params,
          json: true,
          method: 'POST'
        })
        .returns(Bluebird.resolve(res).nodeify());

      var requestFunc = Endpoint.makeIndividual(settings, endpointSettings);
      requestFunc(params)
      .then(function () {
        requesterMock.verify();
      })
      .finally(function () {
        requesterMock.restore();
      });
    });

    it('should include a version header if it is in the settings', function () {
      var settings = {
        host: 'https://api.lob.com',
        basePath: '/v1',
        key: 'key',
        userAgent: 'agent',
        version: '2014-01-07'
      };
      var endpointSettings = {
        name: 'hello',
        method: 'GET',
        path: '/test/{id}',
        args: ['id']
      };
      var id = 'abc123';

      var requesterMock = sinon.mock(Requester);
      requesterMock.expects('request').once()
        .withArgs({
          url: 'https://api.lob.com/v1/test/abc123',
          auth: {
            user: 'key',
            password: ''
          },
          headers: {
            'User-Agent': 'agent',
            'Lob-Version': '2014-01-07'
          },
          json: true,
          method: 'GET'
        })
        .returns(Bluebird.resolve(res).nodeify());

      var requestFunc = Endpoint.makeIndividual(settings, endpointSettings);
      requestFunc(id)
      .then(function () {
        requesterMock.verify();
      })
      .finally(function () {
        requesterMock.restore();
      });
    });
  });

  describe('make', function () {
    it('should pass each endpoint to makeIndividual', function () {
      var settings = { setting: 'set' };
      var endpointSettings = [{ name: 'hello', method: 'GET' }];
      var fakeRequest = 'request';

      var endpointMock = sinon.mock(Endpoint);
      endpointMock.expects('makeIndividual').once()
        .withArgs(settings, endpointSettings[0])
        .returns(fakeRequest);

      var endpoints = Endpoint.make(settings, endpointSettings);

      expect(endpoints.hello).to.eql(fakeRequest);
      endpointMock.verify();
      endpointMock.restore();
    });
  });

});
