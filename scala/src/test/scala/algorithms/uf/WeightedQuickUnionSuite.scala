package algorithms.uf

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class WeightedQuickUnionSuite extends FunSuite {
  test("union") {
    assert(WeightedQuickUnion(6)
      .union(1, 0)
      .union(2, 0)
      .union(3, 4)
      .union(4, 5)
      .idx === Array(1, 1, 1, 3, 3, 3))
  }
}
