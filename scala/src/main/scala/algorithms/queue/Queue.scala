package algorithms.queue

trait Queue[T] {
  def isEmpty(): Boolean

  def enqueue(item: T)

  def dequeue(): T
}
