package algorithms.stack

import scala.reflect.ClassTag

object ArrayStack {
  def empty[T: ClassTag](): Stack[T] = new ArrayStack[T]
}

class ArrayStack[T: ClassTag] extends Stack[T] {
  private var items: Array[T] = new Array[T](1)
  private var offset: Int = 0

  def isEmpty(): Boolean = offset == 0

  def push(item: T) {
    if (offset >= items.length) items = resize(items.length * 2)
    items(offset) = item
    offset += 1;
  }

  def pop(): T = {
    if (offset <= 0) throw new IndexOutOfBoundsException
    offset -= 1
    val item = items(offset)
    if (offset > 0 && offset == items.size / 4) items = resize(items.size / 2)
    item
  }

  private def resize(size: Int): Array[T] = {
    val dup = new Array[T](size)
    val n = math.min(size, items.size)
    for (i <- 0 until n) if (i < offset) dup(i) = items(i)
    dup
  }
}
