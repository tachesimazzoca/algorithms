package algorithms.analysis

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class DoublingSuite extends FunSuite {
  import Doubling._

  test("ratios") {
    assert(ratios(List(0.1d, 0.8d, 6.4d, 51.1d)) === List(7.98, 8.0, 8.0))
    assert(ratios(List(0.3d, 1.3d, 5.1d, 20.5d)) === List(4.02, 3.92, 4.33))
    assert(ratios(List(0.002d, 0.018d, 0.141d, 1.017d, 7.767d, 59.405d,
      450.431d, 3448.969d)) === List(7.66, 7.58, 7.65, 7.64, 7.21, 7.83, 9.0))
  }

  test("lgRatios") {
    assert(lgRatios(List(0.1d, 0.8d, 6.4d, 51.1d)) === List(3.0d, 3.0d, 3.0d))
    assert(lgRatios(List(0.3d, 1.3d, 5.1d, 20.5d)) === List(2.01d, 1.97d, 2.11d))
    assert(lgRatios(List(0.002d, 0.018d, 0.141d, 1.017d, 7.767d, 59.405d,
      450.431d, 3448.969d)) === List(2.94, 2.92, 2.94, 2.93, 2.85, 2.97, 3.17))
  }

  test("orderOfGrowth") {
    val f = orderOfGrowth(
      List(
        Observation(512d, 0.141d),
        Observation(1024d, 1.017d),
        Observation(2048d, 7.767d),
        Observation(4096d, 59.405d),
        Observation(8192d, 450.431d),
        Observation(16384d, 3448.969d)), 2.93d)
    assert(f(512d) === 0.14d)
    assert(f(1024d) === 1.03d)
    assert(f(2048d) === 7.84d)
    assert(f(4096d) === 59.76d)
    assert(f(8192d) === 455.44d)
    assert(f(16384d) === 3470.98d)
  }
}
