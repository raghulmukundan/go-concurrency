package main

import (
	"fmt"
	"time"
)

func busyLoop() {
	// Simulate CPU-bound work with no natural yield points
	for i := 0; i < 1e9; i++ {
		// Tight loop; preemption can occur at iteration boundaries
	}
	fmt.Println("Busy loop done!")
}

func polite() {
	for i := 0; i < 3; i++ {
		fmt.Println("Polite:", i)
		time.Sleep(100 * time.Millisecond) // Natural yield
	}
}

func main() {
	go busyLoop() // CPU-bound goroutine
	go polite()   // Cooperative goroutine
	fmt.Println("Main started!")
	time.Sleep(1 * time.Second) // Wait to observe
	fmt.Println("Main done!")
}
