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
    // TODO: Recursion not call in tail position.
    def search(acc: (Set[Int], Map[Int, Int]), v: Int): Map[Int, Int] = {
      // Mark the next vertex.
      val marked = acc._1 + v
      graph.getOrElse(v, Set.empty).foldLeft(acc._2) { (ws, w) =>
        // If the vertex is not marked, save the route and search from it recursively.
        if (!marked.contains(w)) search((marked, ws.updated(w, v)), w)
        else ws
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
    @annotation.tailrec
    def search(acc: (Queue[Int], Set[Int], Map[Int, Int])): Map[Int, Int] = {
      // Dequeue the next vertex.
      val (v, q) = acc._1.dequeue
      val b = graph.getOrElse(v, Set.empty).foldLeft((q, acc._2, acc._3)) {
        (a, w) =>
          // If the vertex is not marked, enqueue the vertex and mark it.
          if (!a._2.contains(w)) (a._1.enqueue(w), a._2 + w, a._3.updated(w, v))
          else (q, a._2, a._3)
      }
      // Search recursively if the queue is not empty.
      if (b._1.isEmpty) b._3
      else search(b)
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
    // TODO: Recursion not call in tail position.
    def search(acc: (Set[Int], Map[Int, Int], Int),
               v: Int): (Set[Int], Map[Int, Int], Int) = {
      graph.getOrElse(v, Set.empty).foldLeft((acc._1 + v, acc._2.updated(v, acc._3), acc._3)) {
        case ((marked, groups, groupId), w) =>
          if (!marked.contains(w)) search((marked, groups, groupId), w)
          else (marked, groups, groupId)
      }
    }

    graph.foldLeft((Set.empty[Int], Map.empty[Int, Int], -1)) {
      // marked: A set of the visited vertexes
      // groups: A group map of the vertexes
      // id: An group ID of each component
      case ((marked, groups, id), (v, _)) =>
        if (!marked.contains(v)) search((marked, groups, id + 1), v)
        else (marked, groups, id)
    }._2
  }

  /**
   * Returns whether or not the graph is bipartite.
   *
   * @param graph
   * @return
   */
  def isBipartite(graph: Graph): Boolean = {
    // TODO: Recursion not call in tail position.
    def search(acc: (Set[Int], Map[Int, Boolean], Boolean),
               v: Int): (Set[Int], Map[Int, Boolean], Boolean) = {
      // Search each edge
      @annotation.tailrec
      def f(acc: (Set[Int], Map[Int, Boolean], Boolean),
            vertexes: List[Int]): (Set[Int], Map[Int, Boolean], Boolean) = {
        if (vertexes.isEmpty) acc
        else {
          val (w :: ws) = vertexes
          val (marked, colors, _) = acc
          if (!marked.contains(w)) {
            // Set the color of the vertex to the reversed color.
            val a = search((marked, colors.updated(w, !colors.getOrElse(v, false)), true), w)
            f(a, ws)
          } else {
            // The graph is bipartite if the color the vertex is different from the visited one.
            val bipartite = colors.getOrElse(v, false) != colors.getOrElse(w, false)
            // Break the loop immediately if the graph is not bipartite.
            if (!bipartite) (marked, colors, bipartite)
            else f((marked, colors, true), ws)
          }
        }
      }
      f((acc._1 + v, acc._2, acc._3), graph.getOrElse(v, Set.empty).toList)
    }

    // acc: (marked, colors, bipartite)
    // marked: A set of the visited vertexes
    // colors: A color map of the vertexes
    // bipartite: Whether or not the graph is bipartite
    @annotation.tailrec
    def loop(acc: (Set[Int], Map[Int, Boolean], Boolean),
             vertexes: List[Int]): (Set[Int], Map[Int, Boolean], Boolean) = {
      if (vertexes.isEmpty) acc
      else {
        val (v :: vs) = vertexes
        val (_, _, bipartite) = search(acc, v)
        if (bipartite) loop(acc, vs)
        else acc
      }
    }
    val (_, _, bipartite) = loop((Set.empty[Int], Map.empty[Int, Boolean], true), graph.keys.toList)
    bipartite
  }
}
