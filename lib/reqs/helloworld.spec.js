'use strict'

let cyber = require('../../src/')
const expect = require('chai').expect

describe('hello World function', () => {
  describe('"helloworld"', () => {
    it('should export a function', () => {
      expect(cyber.helloworld).to.be.a('function')
    })
  })
})
