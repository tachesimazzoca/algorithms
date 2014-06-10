package algorithms.uf

object QuickUnion {
  def apply(N: Int): QuickUnion = new QuickUnion(N)
}

class QuickUnion(val N: Int) extends UnionFind {
  private[uf] val idx: Array[Int] = Array.range(0, N);

  def find(p: Int): Int = {
    val q = idx(p)
    if (p == q) p
    else find(q)
  }

  def connected(p: Int, q: Int): Boolean = find(p) == find(q)

  def union(p: Int, q: Int): QuickUnion = {
    val rootP = find(p)
    val rootQ = find(q)
    if (rootP != rootQ) idx(rootP) = idx(rootQ)
    this
  }
}
