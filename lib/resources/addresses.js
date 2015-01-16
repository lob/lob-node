'use strict';

module.exports = [
  {
    name: 'create',
    method: 'POST',
    path: '/addresses'
  },
  {
    name: 'list',
    method: 'GET',
    path: '/addresses'
  },
  {
    name: 'retrieve',
    method: 'GET',
    path: '/addresses/{id}',
    args: ['id']
  },
  {
    name: 'delete',
    method: 'DELETE',
    path: '/addresses/{id}',
    args: ['id']
  }
];
