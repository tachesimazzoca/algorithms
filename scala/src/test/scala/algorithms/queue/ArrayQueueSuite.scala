package algorithms.queue

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class ArrayQueueSuite extends FunSuite {
  test("create an empty queue") {
    val queue = ArrayQueue.empty[String]
    assert(queue.isEmpty === true)
  }

  test("enqueue / dequeue string") {
    val queue = ArrayQueue.empty[String]
    val len = 20
    for (n <- 1 to len) {
      queue.enqueue("value" + n)
    }
    for (n <- 1 to len) {
      assert(queue.dequeue() === "value" + n)
    }
    val deqE = try {
      queue.dequeue()
      false
    } catch {
      case e: IndexOutOfBoundsException => true
      case e: Throwable => false
    }
    if (!deqE) fail("must throw IndexOutOfBoundsException")
  }

  test("pattern") {
    val sb = new StringBuilder
    val queue = ArrayQueue.empty[Char]
    "0123456789----------".foreach { chr =>
      if (chr != '-') queue.enqueue(chr)
      else sb.append(queue.dequeue().toString)
    }
    assert(sb.toString === "0123456789")

    sb.clear
    "0-1-2-3-4-5-6-7-8-9-".foreach { chr =>
      if (chr != '-') queue.enqueue(chr)
      else sb.append(queue.dequeue().toString)
    }
    assert(sb.toString === "0123456789")
  }
}
