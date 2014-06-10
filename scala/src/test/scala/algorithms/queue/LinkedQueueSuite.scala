package algorithms.queue

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

@RunWith(classOf[JUnitRunner])
class LinkedQueueSuite extends FunSuite {
  test("create an empty queue") {
    val queue = LinkedQueue.empty[String]
    assert(queue.isEmpty === true)
  }

  test("enqueue / dequeue string") {
    val queue = LinkedQueue.empty[String]
    queue.enqueue("foo")
    assert(queue.dequeue() === "foo")
    assert(queue.isEmpty === true)

    queue.enqueue("bar")
    queue.enqueue("baz")
    queue.enqueue("fuga")
    assert(queue.dequeue() === "bar")
    assert(queue.dequeue() === "baz")
    assert(queue.dequeue() === "fuga")

    val dequeueE = try {
      queue.dequeue()
      false
    } catch {
      case e: IndexOutOfBoundsException => true
      case e: Throwable => false
    }
    if (!dequeueE) fail("must throw IndexOutOfBoundsException")
  }

  test("pattern") {
    val sb = new StringBuilder
    val queue = LinkedQueue.empty[Char]
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
