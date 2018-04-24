import test from 'ava';
import server from '../../server';

// common
const getRequest = (id = null) => ({
  method: 'GET',
  url: id
    ? '/bugs/' + id
    : '/bugs'
})
const postRequest = payload => ({method: 'POST', url: '/bugs', payload})
const deleteRequest = id => ({
  method: 'DELETE',
  url: '/bugs/' + id
})

// ----------------------------------------------------

test.cb('endpoint test | POST /bugs | empty payload -> 400 Bad Request', t => {
  t.plan(1);
  server
    .inject(postRequest({}))
    .then(response => {
      t.is(response.statusCode, 400, 'status code is 400');
      t.end()
    });

});

// ----------------------------------------------------

const legalPayload = {
  title: "lala1234",
  createdById: '123456123456123456123456123456123456',
  assignedToId: '123456123456123456123456123456123456',
  description: 'aaa'
}

test('endpoint test | POST /bugs | valid payload -> 201 Created', t => server.inject(postRequest(legalPayload)).then(response => {
  t.is(response.statusCode, 201, 'status code is 201');
}));

// ----------------------------------------------------

test('endpoint test | GET /bugs | valid result -> 200 OK', t => server.inject(getRequest()).then(response => {
  t.is(response.statusCode, 200, 'status code is 200');
  t.is(JSON.parse(response.payload).length > 0, true, 'Result contains more than one entry');
}));

// ---------------------------------------------------- test run in Callback
// mode. More details here - https://github.com/avajs/ava#assertion-planning
test.cb('endpoint test | DELETE /bugs/<id> | deleted successfully -> 200 OK', t => {
  t.plan(1); // We are saying that there is going to be only one assertion
  server
    .inject(getRequest())
    .then(response => {
      const payload = JSON.parse(response.payload);
      const lengthBefore = payload.length;
      const idToBeDeleted = payload[0]._id;
      server
        .inject(deleteRequest(idToBeDeleted))
        .then(response => {
          server
            .inject(getRequest())
            .then(response => {
              t.is(JSON.parse(response.payload).length === lengthBefore - 1, true, 'Result contains one less entry');
              t.end(); // signalling that all the callbacks are now complete and test can end.
            })
        })
    })
});