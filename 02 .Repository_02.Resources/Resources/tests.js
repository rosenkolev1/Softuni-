let { Repository } = require("./solution.js");
let assert = require('chai').assert;

describe("Tests for the Repository class", function () {
    describe("Class constructor and getter", function () {
        it("Constructor should work correctly and get id func should too", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            assert.deepEqual(repo.props, {money: 'number', name: 'string'});
            assert.deepEqual(repo.data, new Map());
            assert.equal(repo.nextId(), 0);
        });
        it("Constructor should work correctly and get id func should too and count getter as well", function () {
            let repo = new Repository({});
            assert.deepEqual(repo.props, {});
            assert.deepEqual(repo.data, new Map());
            assert.equal(repo.nextId(), 0);
            assert.equal(repo.nextId(), 1);
            assert.equal(repo.nextId(), 2);
            assert.equal(repo.count, repo.data.size);
            repo.data.set(0, 'Something');
            assert.equal(repo.count, repo.data.size);
        });
    });
    describe("Class add method", function () {
        it("Add method should work correctly", function () {
            let repo = new Repository({});
            let output = repo.add({});
            let expectedOutput = 0;
            assert.equal(output, expectedOutput);
            assert.equal(repo.count, 1);
            assert.deepEqual(repo.data.get(output),{});
        });
        it("Add method should work correctly", function () {
            let repo = new Repository({money: 'number', name: 'string', isPartOfTeam: 'undefined'});
            let output = repo.add({money: 16, name: 'Miro', isPartOfTeam: undefined});
            let expectedOutput = 0;
            assert.equal(output, expectedOutput);
            assert.equal(repo.count, 1);
            assert.deepEqual(repo.data.get(output),{money: 16, name: 'Miro', isPartOfTeam: undefined});
        });
        it("Add method should work correctly", function () {
            let repo = new Repository({money: 'number', name: 'string', isPartOfTeam: 'object'});
            let output = repo.add({money: 16, name: 'Miro', isPartOfTeam: {Something: 10}});
            let expectedOutput = 0;
            assert.equal(output, expectedOutput);
            assert.equal(repo.count, 1);
            assert.deepEqual(repo.data.get(output),{money: 16, name: 'Miro', isPartOfTeam: {Something: 10}});
        });
        it("Add method should work correctly", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let outputOne = repo.add({money: 16, name: 'Miro'});
            let expectedOutputOne = 0;
            assert.equal(repo.count, 1);
            let outputTwo = repo.add({money: 100, name: 'Rosen'});
            assert.equal(repo.count, 2);
            let expectedOutputTwo= 1;
            assert.equal(outputOne, expectedOutputOne);
            assert.equal(outputTwo, expectedOutputTwo);
            assert.deepEqual(repo.data.get(outputOne),{money: 16, name: 'Miro'});
            assert.deepEqual(repo.data.get(outputTwo),{money: 100, name: 'Rosen'});
        });
        it("Add method should throw error for incorrect value type of property", function () {
            let repo = new Repository({money: 'number', name: 'string', isPartOfTeam: undefined});
            assert.throws(()=>{
                let output = repo.add({money: 16, name: 'Miro', isPartOfTeam: undefined});
            }, `Property isPartOfTeam is not of correct type!`);
        });
        it("Add method should throw error for incorrect value type of property", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            assert.throws(()=>{
                repo.add({money: 16, name: 'Miro', isPartOfTeam: undefined});
            },`Property isPartOfTeam is not of correct type!`);
            let expectedOutput = 0;
        });
        it("Add method should throw error for no existing property", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            assert.throws(()=>{
                repo.add({money: 16});
            }, `Property name is missing from the entity!`);
        });
        it("Add method should throw error for no existing property", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            assert.throws(()=>{
                repo.add({});
            }, `Property money is missing from the entity!`);
        });
        it("Add method should throw error for incorrect value type of property", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            assert.throws(()=>{
                repo.add({money: {}, name: 'Rosen'});
            }, `Property money is not of correct type!`);
        });
    });
    describe("Class getId method", function () {
        it("getId method should work correctly", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            let outputEntity = repo.getId(0);
            assert.equal(outputEntity, repo.data.get(0));
            assert.deepEqual(outputEntity, repo.data.get(0));
        });
        it("getId method should work correctly", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            repo.add({money: 500, name: 'Rosen'});
            let outputEntity = repo.getId(1);
            assert.equal(outputEntity, repo.data.get(1));
            assert.deepEqual(outputEntity, repo.data.get(1));
        });
        it("getId method should throw error for inexistent person", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            repo.add({money: 500, name: 'Rosen'});
            assert.throws(()=>{
                let outputEntity = repo.getId(2);
            },`Entity with id: 2 does not exist!`);
        });
        it("getId method should throw error for inexistent person", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            repo.add({money: 500, name: 'Rosen'});
            assert.throws(()=>{
                let outputEntity = repo.getId();
            },`Entity with id: undefined does not exist!`);
        });
        it("getId method should throw error for inexistent person", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            repo.add({money: 500, name: 'Rosen'});
            assert.throws(()=>{
                let outputEntity = repo.getId(-1);
            },`Entity with id: -1 does not exist!`);
        });
    });
    describe("Class update method", function () {
        it("update method should work correctly", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let output = repo.add({money: 16, name: 'Miro'});
            repo.update(0, {money: 500, name: 'Rosen'})
            assert.deepEqual(repo.data.get(output),{money: 500, name: 'Rosen'});
        });
        it("update method should throw error for incorrect value type of property", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let output = repo.add({money: 16, name: 'Miro'});
            assert.throws(()=>{
                repo.update(0, {money: 'Ge6a', name: 'Rosen'});
            }, `Property money is not of correct type!`);
        });
        it("Add method should throw error for no existing property", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let output = repo.add({money: 16, name: 'Miro'});
            assert.throws(()=>{
                repo.update(0, {money: 10});
            }, `Property name is missing from the entity!`);
        });
        it("Add method should throw error for incorrect value type of property", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let output = repo.add({money: 16, name: 'Miro'});
            assert.throws(()=>{
                repo.update(0, {money: 500, name: 'Rosen', isPartOfTeam: undefined});
            }, `Property isPartOfTeam is not of correct type!`);
        });
        it("Add method should throw error for inexistent person", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let output = repo.add({money: 16, name: 'Miro'});
            assert.throws(()=>{
                repo.update(1, {money: 500, name: 'Rosen'});
            }, `Entity with id: 1 does not exist!`);
        });
        it("Add method should throw error for inexistent person", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let output = repo.add({money: 16, name: 'Miro'});
            assert.throws(()=>{
                repo.update(-1, {money: 500, name: 'Rosen'});
            }, `Entity with id: -1 does not exist!`);
        });
        it("Add method should throw error for inexistent person", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            assert.throws(()=>{
                repo.update(0, {money: 500, name: 'Rosen'});
            }, `Entity with id: 0 does not exist!`);
        });
        it("Add method should throw error for inexistent person", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            assert.throws(()=>{
                repo.update();
            }, `Entity with id: undefined does not exist!`);
        });
        it("Add method should throw unexpected error", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let output = repo.add({money: 16, name: 'Miro'});
            assert.throws(()=>{
                repo.update(0);
            });
        });
        it("Add method should throw error for inexistent person", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            let output = repo.add({money: 16, name: 'Miro'});
            assert.throws(()=>{
                repo.update(1);
            }, `Entity with id: 1 does not exist!`);
        });
    });
    describe("Class del method", function () {
        it("del method should work correctly", function () {
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            repo.add({money: 500, name: 'Rosen'});
            repo.del(0);
            assert.equal(repo.data.get(0), undefined);
            assert.deepEqual(repo.data.get(1), {money: 500, name: 'Rosen'});
            assert.equal(repo.count, 1);
            repo.del(1);
            assert.equal(repo.data.get(1), undefined);
            assert.deepEqual(repo.data.get(1), undefined);
            assert.equal(repo.count, 0);
            let id = repo.add({money: 500, name: 'Rosen'});
            assert.equal(id, 2);
            assert.deepEqual(repo.data.get(2), {money: 500, name: 'Rosen'});
            assert.equal(repo.count, 1);
        });
        it("del method should throw error for not found id", function () {   
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            repo.add({money: 500, name: 'Rosen'});
            assert.throws(()=>{
                repo.del(2);
            }, `Entity with id: 2 does not exist!`);
        });
        it("del method should throw error for not found id", function () {   
            let repo = new Repository({money: 'number', name: 'string'});
            assert.throws(()=>{
                repo.del(0);
            }, `Entity with id: 0 does not exist!`);
        });
        it("del method should throw error for not found id", function () {   
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            repo.add({money: 500, name: 'Rosen'});
            assert.throws(()=>{
                repo.del(-1);
            }, `Entity with id: -1 does not exist!`);
        });
        it("del method should throw error for not found id", function () {   
            let repo = new Repository({money: 'number', name: 'string'});
            repo.add({money: 16, name: 'Miro'});
            repo.add({money: 500, name: 'Rosen'});
            assert.throws(()=>{
                repo.del();
            }, `Entity with id: undefined does not exist!`);
        });
    });
    // TODO: …
});
