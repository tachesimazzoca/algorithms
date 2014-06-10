package algorithms.stack

object LinkedStack {
  def empty[T](): Stack[T] = new LinkedStack[T]
}

class LinkedStack[T] extends Stack[T] {
  private abstract class Link
  private case class Node(item: T, next: Link) extends Link
  private case object Empty extends Link

  private var first: Link = Empty

  def isEmpty(): Boolean = first == Empty

  def push(item: T) {
    first = Node(item, first)
  }

  def pop(): T = first match {
    case Node(item, next) =>
      first = next; item
    case Empty => throw new IndexOutOfBoundsException
  }
}
