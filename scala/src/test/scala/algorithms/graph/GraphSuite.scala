package algorithms.graph

import org.junit.runner.RunWith
import org.scalatest.FunSuite
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class GraphSuite extends FunSuite {
  test("undirected(Graph) converts into an undirected graph") {
    val g = Map(
      0 -> Set(1),
      1 -> Set(2),
      3 -> Set(4)
    )
    val expected = Map(
      0 -> Set(1),
      1 -> Set(0, 2),
      2 -> Set(1),
      3 -> Set(4),
      4 -> Set(3)
    )
    assert(undirected(g) === expected)
  }

  test("isBipartite(star) returns true") {
    for (n <- 2 to 10) {
      val xs = (for (i <- 1 until n) yield (i, Set(0))).toMap
      val x = (0 -> xs.unzip._1.toSet)
      assert(isBipartite(undirected(xs + x)))
    }
  }

  test("isBipartite(k2-2) returns true") {
    val g = Map(0 -> Set(2, 3), 1 -> Set(2, 3))
    assert(isBipartite(undirected(g)))
  }

  test("isBipartite(k3-2) returns true") {
    val g = Map(0 -> Set(2, 3, 4), 1 -> Set(2, 3, 4))
    assert(isBipartite(undirected(g)))
  }

  test("isBipartite(k3-3) returns true") {
    val g = Map(0 -> Set(3, 4, 5), 1 -> Set(3, 4, 5), 2 -> Set(3, 4, 5))
    assert(isBipartite(undirected(g)))
  }
}
