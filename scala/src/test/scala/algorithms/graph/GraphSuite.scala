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
}
