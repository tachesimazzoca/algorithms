package algorithms.stack

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class ArrayStackSuite extends FunSuite {
  test("create array stack") {
    val stack = ArrayStack.empty[String]()
    assert(stack.isEmpty === true)
  }

  test("push / pop string") {
    val stack = ArrayStack.empty[String]()
    val len = 20
    for (n <- 1 to len) {
      stack.push("value" + n)
    }
    for (n <- len to 1 by -1) {
      assert(stack.pop() === "value" + n)
    }
    val popE = try {
      stack.pop()
      false
    } catch {
      case e: IndexOutOfBoundsException => true
      case e: Throwable => false
    }
    if (!popE) fail("must throw IndexOutOfBoundsException")
  }

  test("pattern") {
    val sb = new StringBuilder
    val stack = ArrayStack.empty[Char]
    "0123456--789--------".foreach { chr =>
      if (chr != '-') stack.push(chr)
      else sb.append(stack.pop().toString)
    }
    assert(sb.toString === "6598743210")

    sb.clear
    "0123456-------7-8-9-".foreach { chr =>
      if (chr != '-') stack.push(chr)
      else sb.append(stack.pop().toString)
    }
    assert(sb.toString === "6543210789")

    sb.clear
    "0-1-234---56--78-9--".foreach { chr =>
      if (chr != '-') stack.push(chr)
      else sb.append(stack.pop().toString)
    }
    assert(sb.toString === "0143265897")
  }
}
