import resolveModule from '../index'
import is from 'is'
import { expect } from 'chai'
import path from 'path'

describe("Resolve module module", () => {
	it("returns a function", () => {
		const result = resolveModule()
		is.function(result).should.be.true
	})

	it("complains if the path I pass in is not a string", () => {
		expect(() => resolveModule(1234)).to.throw(Error, 'Hey! That path should at least be a string.')
	})

	describe("resolving relative paths", () => {
        const normalize = p => p.replace(/\//g, path.sep)

		let resolver

		beforeEach(() => {
			resolver = resolveModule("./test")
		})

		it("resolves a relative path in a sybling directory", () => {
			resolver('example/1/index', './test/example/2/index.js')
				.should.equal(normalize('./../1/index'))
		})

		it("resolves a relative path in a parent directory", () => {
			resolver('example/2/index', './test/example/2/3/index.js')
				.should.equal(normalize('./../index'))
		})

		it("resolves a relative path in a child directory", () => {
			resolver('example/2/3/index', './test/example/2/index.js')
				.should.equal(normalize('./3/index'))
		})

		it("does not resolve an unknown relative path", () => {
			resolver('fs', './test/example/2/index.js')
				.should.equal('fs')
		})

		it.skip("resolves a relative path in the root directory", () => {
			resolver('index', './test/example/2/index.js')
				.should.equal('./../../index')
		})
	})

})