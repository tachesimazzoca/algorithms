package algorithms.uf

object WeightedQuickUnion {
  def apply(N: Int): WeightedQuickUnion = new WeightedQuickUnion(N)
}

class WeightedQuickUnion(override val N: Int) extends QuickUnion(N) {
  private[uf] val sz: Array[Int] = Array.fill(N)(1)

  override def union(p: Int, q: Int): WeightedQuickUnion = {
    val rootP = find(p)
    val rootQ = find(q)
    if (rootP != rootQ) {
      if (sz(rootP) < sz(rootQ)) {
        idx(rootP) = rootQ
        sz(rootQ) += sz(rootP)
      } else {
        idx(rootQ) = rootP
        sz(rootP) += sz(rootQ)
      }
    }
    this
  }
}
