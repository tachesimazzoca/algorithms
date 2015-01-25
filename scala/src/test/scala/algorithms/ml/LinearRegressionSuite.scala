package algorithms.ml

import org.junit.runner.RunWith
import org.scalatest.FunSuite
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class LinearRegressionSuite extends FunSuite {
  test("mse") {
    // h(x) = a + b * x, if a = 0, b = 2
    // (0^2 + 0^2 + 0^2) / 3 = 0
    assert(0 === mse(Seq((1d, 2d), (2d, 4d), (3d, 6d)), x => 2 * x))

    // h(x) = a + b * x, if a = 0, b = 0.5
    // (0^2 + 0^2 + 0^2 + 0^2) / 4 = 0
    assert(0 === mse(Seq((1d, 0.5d), (2d, 1d), (4d, 2d), (0d, 0d)), x => 0.5 * x))
  }

  test("gradientDescent") {
    val data = Seq((1d, 2d), (2d, 4d), (3d, 6d))
    intercept[Error] {
      gradientDecent(data, 412, (1d, 1d), 0.1d)
    }
    gradientDecent(data, 413, (1d, 1d), 0.1d)
  }
}
