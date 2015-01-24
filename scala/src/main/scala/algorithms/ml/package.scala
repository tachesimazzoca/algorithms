package algorithms

package object ml {
  def mse(data: Seq[(Double, Double)], h: Double => Double): Double = {
    val se = data map { case (x, y) =>
      math.pow(h(x) - y, 2)
    }
    se.sum / data.size
  }
}
