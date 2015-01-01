package algorithms

import scala.collection.immutable.Queue

package object graph {
  type Graph = Map[Int, Set[Int]]

  /**
   * Converts the given graph into an undirected graph.
   *
   * @param graph
   * @return A converted undirected graph.
   */
  def undirected(graph: Graph): Graph = {
    graph.foldLeft(graph) { case (g, (v, ws)) =>
      ws.foldLeft(g) { (acc, w) =>
        acc.updated(w, acc.getOrElse(w, Set.empty) + v)
      }
    }
  }

  /**
   * Returns the routes from the given vertex by Depth-First-Search.
   *
   * @param graph
   * @param start The root vertex
   * @return The routes as <code>Map(to -> from, ...)</code>
   */
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

  /**
   * Returns the shortest routes from the given vertex by Breadth-First-Search.
   *
   * @param graph
   * @param start The root vertex
   * @return The routes as <code>Map(to -> from, ...)</code>
   */
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

  /**
   * Returns the connected components of the given undirected graph. If the graph
   * is not undirected, this function might return a wrong result.
   *
   * @param graph The undirected graph.
   * @return The connected components as <code>Map(vertex -> groupId, ...)</code>
   */
  def cc(graph: Graph): Map[Int, Int] = {
    // Recursion not call in tail position.
    def search(acc: (Set[Int], Map[Int, Int], Int),
               v: Int): (Set[Int], Map[Int, Int], Int) = {
      graph.getOrElse(v, Set.empty).foldLeft((acc._1 + v, acc._2.updated(v, acc._3), acc._3)) {
        case ((marked, groups, groupId), w) =>
          if (!marked.contains(w)) {
            search((marked, groups, groupId), w)
          } else (marked, groups, groupId)
      }
    }

    graph.foldLeft((Set.empty[Int], Map.empty[Int, Int], -1)) {
      case ((marked, groups, id), (v, _)) =>
        if (!marked.contains(v)) {
          search((marked, groups, id + 1), v)
        } else (marked, groups, id)
    }._2
  }
}
