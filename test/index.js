import resolveModule from '../index'
import is from 'is'

describe("Resolve module", () => {
	it("returns a function", () => {
		const result = resolveModule()
		is.function(result).should.be.true
	})
})