package algorithms.graph

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class DFSSuite extends FunSuite {
  test("dfs(empty, 0) throws NoSuchElementException") {
    val g = Map.empty[Int, Set[Int]]
    intercept[NoSuchElementException] {
      dfs(g, 0)
    }
  }

  test("dfs(Map(0 -> Set()), 0) returns an empty map") {
    val g = Map(0 -> Set.empty[Int])
    assert(dfs(g, 0) === Map.empty[Int, Int])
  }

  test("dfs(Map(0 -> Set(0)), 0) returns an empty map") {
    val g = Map(0 -> Set(0))
    assert(dfs(g, 0) === Map.empty[Int, Int])
  }

  test("dfs(Map(0 -> Set(1)), 0) returns Map(1 -> 0)") {
    val g = Map(0 -> Set(1))
    val edgeTo = dfs(g, 0)
    assert(edgeTo.get(1) === Some(0))
    assert(edgeTo.get(0) === None)
  }

  test("dfs(Map(0 -> Set(1), 1 -> Set(0)), 1) returns Map(0 -> 1)") {
    val g = Map(0 -> Set(1), 1 -> Set(0))
    val edgeTo = dfs(g, 1)
    assert(edgeTo.get(0) === Some(1))
    assert(edgeTo.get(1) === None)
  }

  test("dfs(Map(...), 0) returns a valid map") {
    val g = Map(
      0 -> Set(1, 2, 4, 5),
      1 -> Set(0),
      2 -> Set(0),
      3 -> Set(4, 5),
      4 -> Set(0, 3, 5),
      5 -> Set(0, 3),
      6 -> Set(7),
      7 -> Set(6)
    )

    g.keys foreach { start =>
      val edgeTo = dfs(g, start)
      def f(from: Int, w: Int): Unit = {
        val vOpt = edgeTo.get(w)
        if (!vOpt.isDefined)
          fail("The edge has no route from " + from)
        else {
          val v = vOpt.get
          if (!g(v).contains(w))
            fail(s"The vertex ${v} has no edge to ${w}")
          if (v != from) f(from, v)
        }
      }
      edgeTo.keys.foreach(f(start, _))
    }
  }
}