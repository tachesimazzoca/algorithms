package algorithms.uf

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class QuickUnionSuite extends FunSuite {
  test("apply") {
    assert(QuickUnion(3).idx === Array(0, 1, 2))
  }

  test("connected") {
    assert(QuickUnion(3).connected(0, 1) === false)
    assert(QuickUnion(3).union(1, 2).connected(1, 2) === true)
  }

  test("union") {
    assert(QuickUnion(5).union(0, 1).idx === Array(1, 1, 2, 3, 4))

    assert(
      QuickUnion(5)
        .union(0, 1)
        .union(2, 4)
        .idx === Array(1, 1, 4, 3, 4))

    assert(
      QuickUnion(5)
        .union(0, 1)
        .union(2, 4)
        .union(4, 3)
        .idx === Array(1, 1, 4, 3, 3))
  }
}
