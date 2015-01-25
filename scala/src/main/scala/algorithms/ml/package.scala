package algorithms

package object ml {
  def mse(data: Seq[(Double, Double)], h: Double => Double): Double = {
    val se = data map { case (x, y) =>
      math.pow(h(x) - y, 2)
    }
    se.sum / data.size
  }

  def gradientDecent(data: Seq[(Double, Double)],
                     max: Int,
                     position: (Double, Double),
                     rate: Double): (Double, Double, Int) = {
    val N = data.size

    def loop(acc: (Double, Double, Int)): (Double, Double, Int) = {
      val a = acc._1
      val b = acc._2
      val c = acc._3
      if (c == 0)
        throw new Error("Any local optima could not be found. " + acc)
      val ga = (data.map { case (x, y) => (a + b * x) - y }).sum / N
      val gb = (data.map { case (x, y) => ((a + b * x) - y) * x }).sum / N
      val a2 = a - rate * ga
      val b2 = b - rate * gb
      if (isGoodEnough(a, a2) && isGoodEnough(b, b2)) (a2, b2, max - c)
      else loop(a2, b2, c - 1)
    }

    def isGoodEnough(a: Double, b: Double): Boolean = {
      math.abs(a - b) < 0.0001d
    }

    loop((position._1, position._2, max))
  }
}
