package algorithms.stack

trait Stack[T] {
  def isEmpty(): Boolean

  def push(item: T)

  def pop(): T
}
