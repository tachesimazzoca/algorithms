package algorithms.analysis

object Doubling {
  case class Observation(number: Double, cost: Double)

  type Cost = Double
  type Ratio = Double

  private val lnOf2 = math.log(2)
  private val numOfDec = 2

  private def round(v: Double): Double = {
    val d = math.pow(10d, numOfDec)
    math.round(v * d) / d
  }

  def ratios(costs: List[Cost]): List[Ratio] = {
    def loop(acc: List[Ratio], xs: List[Cost]): List[Ratio] =
      xs match {
        case y1 :: y2 :: ys => {
          val ratio = round(y2 / y1)
          loop(ratio :: acc, y2 :: ys)
        }
        case _ => acc
      }

    loop(Nil, costs)
  }

  def lgRatios(costs: List[Cost]): List[Ratio] =
    ratios(costs) map { x => round(math.log(x) / lnOf2) }

  def orderOfGrowth(obs: List[Observation], b: Ratio): Double => Double = {
    val as = for {
      ob <- obs
    } yield ob.cost / math.pow(ob.number, b)
    val a = as.sum / as.length
    n => { round(a * math.pow(n, b)) }
  }
}
