import resolveModule from "../index";
import is from "is";
import { expect } from "chai";
import path from "path";

describe("Resolve module", () => {
  const normalize = p => p.replace(/\//g, path.sep);

  describe("when no base directory is specified", () => {
    let resolver;

    beforeEach(() => {
      resolver = resolveModule();
    });

    it("returns a function", () => {
      is.function(resolver).should.be.true;
    });

    it("does not resolve path", () => {
      resolver("example/1/index", "./test/example/2/index.js").should.equal(
        normalize("example/1/index")
      );
    });
  });

  describe("when an invalid base directory is specified", () => {
    it("complains if the path I pass in is not a string", () => {
      expect(() => resolveModule(1234)).to.throw(
        Error,
        "babel-resolve-relative-module: The base directory path must be a valid string."
      );
    });
  });

  describe("when a base directory is specified", () => {
    let resolver;

    beforeEach(() => {
      resolver = resolveModule("./test");
    });

    it("returns a function", () => {
      is.function(resolver).should.be.true;
    });

    it("resolves a relative path in a sibling directory", () => {
      resolver("example/1/index", "./test/example/2/index.js").should.equal(
        normalize("./../1/index")
      );
    });

    it("resolves a relative path in a parent directory", () => {
      resolver("example/2/index", "./test/example/2/3/index.js").should.equal(
        normalize("./../index")
      );
    });

    it("resolves a relative path in a child directory", () => {
      resolver("example/2/3/index", "./test/example/2/index.js").should.equal(
        normalize("./3/index")
      );
    });

    it("does not resolve an unknown relative path", () => {
      resolver("fs", "./test/example/2/index.js").should.equal("fs");
    });

    // TODO: Allow specifying modules in the root directory.
    it.skip("resolves a relative path in the root directory", () => {
      resolver("index", "./test/example/2/index.js").should.equal(
        "./../../index"
      );
    });
  });
});
