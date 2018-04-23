import test from 'ava';
const mongojs = require('mongojs');
import repo from '../repos';
const {generateIdForObj} = require('../repos/commonFields')

const db = mongojs('bt-hapi-test-db', ['test-db']);

const removeAll = () => {
	db['testModel'].remove({},{justOne:false}, (err, result) => {});
	db['testModel2'].remove({},{justOne:false}, (err, result) => {});
}

test.before(t => {
	removeAll();
});

test.after(t => {
	removeAll();
});

//test create
test.cb('repo test | create model | created successfully', t => {
	t.plan(1);
	repo.create(
		db, 'testModel', {name:'Fraulein', seq:1},
		(err, result) => {
			err? t.fail: t.pass();
			t.end();
		})
});

//test getAll
test.cb('repo test | listAll model | listed successfully', t => {
	t.plan(2);
	repo.create(
		db, 'testModel2', {name:'Frau', seq:2},
		(err, result) => {
			repo.listAll(
				db, 'testModel2',
				(err, result) => {
					t.is(result.length, 1, 'Result contains one entry');
					t.is(result[0].seq===2, true, 'Result seq is correct');
					t.end();
				})
		})
	
});

//test findone

//test delete

//test update


//test timestamp on update