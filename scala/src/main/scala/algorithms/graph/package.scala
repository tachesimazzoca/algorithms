package algorithms

import scala.collection.immutable.Queue

package object graph {
  type Graph = Map[Int, Set[Int]]

  def dfs(graph: Graph, start: Int): Map[Int, Int] = {
    if (!graph.contains(start))
      throw new NoSuchElementException("key not found:" + start)

    // Recursion not call in tail position.
    def search(acc: (Set[Int], Map[Int, Int]), v: Int): Map[Int, Int] = {
      val marked = acc._1 + v
      graph.getOrElse(v, Set.empty).foldLeft(acc._2) { (ws, w) =>
        if (!marked.contains(w)) {
          val edgeTo = ws.updated(w, v)
          search((marked, edgeTo), w)
        } else ws
      }
    }
    search((Set.empty[Int], Map.empty[Int, Int]), start)
  }

  def bfs(graph: Graph, start: Int): Map[Int, Int] = {
    if (!graph.contains(start))
      throw new NoSuchElementException("key not found:" + start)

    @annotation.tailrec
    def search(acc: (Queue[Int], Set[Int], Map[Int, Int])): Map[Int, Int] = {
      val (v, q) = acc._1.dequeue
      val acc2 = graph.getOrElse(v, Set.empty)
        .foldLeft((q, acc._2, acc._3)) { (a, w) =>
        if (!a._2.contains(w)) {
          val q2 = a._1.enqueue(w)
          val marked = a._2 + w
          val edgeTo = a._3.updated(w, v)
          (q2, marked, edgeTo)
        } else (q, a._2, a._3)
      }
      if (acc2._1.isEmpty) acc2._3
      else search(acc2)
    }
    search((Queue(start), Set(start), Map.empty[Int, Int]))
  }
}
