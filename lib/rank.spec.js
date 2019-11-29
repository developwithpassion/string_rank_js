import rank from './rank';
import { expect } from 'chai';

describe('string ranking', () => {
  let word_to_match;

  beforeEach(() => {
    word_to_match = 'Hello World';
  });

  describe('exact match', () => {
    it('always returns a score of 1', () => {
      expect(rank('Hello World', word_to_match)).to.eql(1.0);
    });
  });

  describe('non matching', () => {
    it('characters in search phrase that dont occur in the original world result in no match', () => {
      expect(rank(word_to_match, 'Hex')).to.eql(0);
      expect(rank(word_to_match, '_World')).to.eql(0);
    });
  });

  describe('match order', () => {
    it('characters in phrase must be in same order as matches in the target word', () => {
      expect(rank(word_to_match, 'ro')).to.eql(0);
    });
  });

  describe('case sensitivity', () => {
    it('scores matching case better than non matching case', () => {
      let same_case_result = rank(word_to_match, 'Hello');
      let different_case_result = rank(word_to_match, 'hello');

      expect(same_case_result).to.be.greaterThan(different_case_result);
    });
  });

  describe('acronym matching', () => {
    it('scores acronyms correctly', () => {
      expect(rank(word_to_match, 'HW')).to.be.greaterThan(rank(word_to_match, 'Hd'));
    });
  });
});
