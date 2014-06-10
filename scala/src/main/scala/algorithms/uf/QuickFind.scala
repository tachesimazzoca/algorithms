package algorithms.uf

object QuickFind {
  def apply(N: Int): QuickFind = new QuickFind(N)
}

class QuickFind(val N: Int) extends UnionFind {
  private[uf] val idx: Array[Int] = Array.range(0, N);

  def find(p: Int): Int = idx(p)

  def connected(p: Int, q: Int): Boolean = idx(p) == idx(q)

  def union(p: Int, q: Int): QuickFind = {
    if (!connected(p, q)) {
      val pid = idx(p)
      for (i <- 0 to N - 1) {
        if (idx(i) == pid) idx(i) = idx(q)
      }
    }
    this
  }
}
