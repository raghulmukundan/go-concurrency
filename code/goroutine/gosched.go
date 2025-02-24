package main

import (
	"fmt"
	"runtime"
)

func createGoroutine() {
	//how many goroutine are running to start with
	fmt.Printf("Initial Goroutine: %d\n", runtime.NumGoroutine())

	for i := 0; i < 3; i++ {
		go func(id int) {
			fmt.Printf("Goroutine %d started\n", id)
		}(i)
	}

	fmt.Printf("After creation: %d\n", runtime.NumGoroutine())

	runtime.Gosched() //give other goroutines a chance to run
}

func main() {
	createGoroutine()
}
