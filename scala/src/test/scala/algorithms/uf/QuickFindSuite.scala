package algorithms.uf

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class QuickFindSuite extends FunSuite {
  test("apply") {
    assert(QuickFind(3).idx === Array(0, 1, 2))
  }

  test("connected") {
    assert(QuickFind(3).connected(0, 1) === false)
    assert(QuickFind(3).union(1, 2).connected(1, 2) === true)
  }

  test("union") {
    assert(QuickFind(5).union(0, 1).idx === Array(1, 1, 2, 3, 4))
    assert(
      QuickFind(5)
        .union(0, 1)
        .union(2, 4)
        .idx === Array(1, 1, 4, 3, 4))

    assert(
      QuickFind(5)
        .union(0, 1)
        .union(2, 4)
        .union(4, 3)
        .idx === Array(1, 1, 3, 3, 3))
  }
}
