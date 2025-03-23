package main

import (
	"fmt"
	"time"
)

func cpuHog(id int) {
	start := time.Now()
	// Simulate CPU-bound work with no natural yield points
	for i := 0; i < 1e9; i++ {
		// Tight loop; preemption can occur at iteration boundaries
	}

	fmt.Printf("CPU Hog %d done after %v!\n", id, time.Since(start))
}

func cooperative(id int) {
	start := time.Now()
	for i := 0; i < 5; i++ {
		fmt.Printf("Cooperative %d: %d\n", id, i)
		time.Sleep(100 * time.Millisecond) // Natural Cooperative yield
	}
	fmt.Printf("Cooperative %d done after %v!\n", id, time.Since(start))

}

func main() {
	go cpuHog(1)      // CPU-bound goroutine
	go cooperative(1) // Cooperative goroutine
	go cpuHog(2)      // Another CPU-bound goroutine
	fmt.Printf("Main started!\n")
	time.Sleep(1 * time.Second) // Wait to observe
	fmt.Printf("Main done!\n")
}
