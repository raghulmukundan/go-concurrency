package main

func showStackBehavior() {
	for i := 0; i < 100_000; i++ {
		go func(depth int) {
			// Each goroutine uses a bit of stack space
		}(i)
	}
}

func main() {
	showStackBehavior()
}
