package algorithms.graph

import org.junit.runner.RunWith
import org.scalatest.FunSuite
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class CCSuite extends FunSuite {
  test("cc(graph) returns the valid connected components") {
    val g = Map(
      0 -> Set(1, 2),
      1 -> Set(0, 2),
      2 -> Set(0, 1),
      3 -> Set(4),
      4 -> Set(3)
    )
    val expected = Map(
      0 -> 0,
      1 -> 0,
      2 -> 0,
      3 -> 1,
      4 -> 1
    )
    assert(cc(g) === expected)
  }
}
