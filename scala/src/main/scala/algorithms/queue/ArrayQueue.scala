package algorithms.queue

import scala.reflect.ClassTag

object ArrayQueue {
  def empty[T: ClassTag](): Queue[T] = new ArrayQueue[T]
}

class ArrayQueue[T: ClassTag] extends Queue[T] {
  private var items: Array[T] = new Array[T](1)

  private var head: Int = 0
  private var tail: Int = 0

  def isEmpty(): Boolean = tail == head

  def enqueue(item: T) {
    if (tail >= items.length) items = resize(items.length * 2)
    items(tail) = item
    tail += 1;
  }

  def dequeue(): T = {
    if (head >= tail) throw new IndexOutOfBoundsException
    val item = items(head)
    head += 1
    val offset = tail - head
    if (offset > 0 && offset == items.length / 4) items = resize(items.length / 2)
    item
  }

  private def resize(size: Int): Array[T] = {
    val dup = new Array[T](size)
    val n = math.min(size, items.size)
    for (i <- 0 until n) if (head + i < tail) dup(i) = items(head + i)
    tail = tail - head
    head = 0
    dup
  }
}
