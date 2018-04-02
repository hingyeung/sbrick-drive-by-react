import { insert, remove, reorder } from './ListUtils';

describe('ListUtils', function () {
  let listToModify: number[];

  beforeEach(() => {
    listToModify = [0, 1, 2, 3];
  });

  describe('reorder', function () {
    it('should reorder items at the front', function () {
      expect(reorder(listToModify, 0, 1)).toEqual([1, 0, 2, 3]);
    });
    it('should reorder items in the middle', function () {
      expect(reorder(listToModify, 1, 2)).toEqual([0, 2, 1, 3]);
    });
    it('should reorder items at the end', function () {
      expect(reorder(listToModify, 2, 3)).toEqual([0, 1, 3, 2]);
    });
    it('should reorder with swapped index)', function () {
      expect(reorder(listToModify, 3, 2)).toEqual([0, 1, 3, 2]);
    });

    it('should not reorder items in a list when one of the index is out-of-bound', function () {
      // clone listToModify
      const expectedList = listToModify.slice(0);
      expect(reorder(listToModify, 3, 4)).toEqual(expectedList);
    });
  });

  describe('insert', function () {
    it('should insert new item at the front', function () {
      expect(insert(listToModify, 0, 99)).toEqual([99, 0, 1, 2, 3]);
    });

    it('should insert new item in the middle', function () {
      expect(insert(listToModify, 3, 99)).toEqual([0, 1, 2, 99, 3]);
    });

    it('should insert new item at the end', function () {
      expect(insert(listToModify, 4, 99)).toEqual([0, 1, 2, 3, 99]);
    });

    it('should insert new item at the end when target index is out-of-bound', function () {
      expect(insert(listToModify, 4, 99)).toEqual([0, 1, 2, 3, 99]);
    });
  });

  describe('remove', function () {
    it('should remove item at the front', function () {
      expect(remove(listToModify, 0)).toEqual([1, 2, 3]);
    });
    it('should remove item in the middle', function () {
      expect(remove(listToModify, 1)).toEqual([0, 2, 3]);
    });
    it('should remove item at the end', function () {
      expect(remove(listToModify, 3)).toEqual([0, 1, 2]);
    });
  });
});