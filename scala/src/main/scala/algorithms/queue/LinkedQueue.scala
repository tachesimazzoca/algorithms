package algorithms.queue

object LinkedQueue {
  def empty[T](): Queue[T] = new LinkedQueue[T]
}

class LinkedQueue[T] extends Queue[T] {
  case class Node(item: T, var next: Option[Node])

  private var first: Option[Node] = None
  private var last: Option[Node] = None

  def isEmpty(): Boolean = first.isEmpty

  def enqueue(item: T) {
    val oldLast = last
    last = Option(new Node(item, None))
    if (first.isEmpty) first = last
    else oldLast match {
      case Some(nd) => nd.next = last
      case None => new Error("last must be Some(Node)")
    }
  }

  def dequeue(): T = first match {
    case Some(x) =>
      first = x.next
      if (first.isEmpty) last = None
      x.item
    case None => throw new IndexOutOfBoundsException
  }
}
