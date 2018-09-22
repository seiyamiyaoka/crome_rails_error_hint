import assert from 'assert';
import { test } from '../testFunc';

// describe('chageTitle', () => {
//   it('titleを書き換える', () => {
//     assert.equal(changeTitle(), "aaa")
//   })
// })

it('test', () => {
  const result = test()
  const expected = 'test'
  assert.equal(result,expected) 
})