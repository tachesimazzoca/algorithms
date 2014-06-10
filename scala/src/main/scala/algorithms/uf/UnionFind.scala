package algorithms.uf

trait UnionFind {
  def find(p: Int): Int

  def connected(p: Int, q: Int): Boolean

  def union(p: Int, q: Int): UnionFind
}
