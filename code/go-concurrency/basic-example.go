package main

import (
	"fmt"
	"time"
)

// In the past: Single-core CPU
func oldComputer() {
	// Could only do one thing at a time
	doTask1()
	doTask2()
	doTask3()
}

// Modern computer: Multiple cores
func modernComputer() {
	// Can do multiple things simultaneously
	go doTask1() // Run on core 1
	go doTask2() // Run on core 2
	go doTask3() // Run on core 3
}

// simulate a task that takes some time to complete
func doTask1() {
	fmt.Println("Starting Task 1")
	// Simulate work by sleeping
	time.Sleep(2 * time.Second)
	fmt.Println("Completed Task 1")
}

func doTask2() {
	fmt.Println("Starting Task 2")
	// Simulate work by sleeping
	time.Sleep(2 * time.Second)
	fmt.Println("Completed Task 2")
}

func doTask3() {
	fmt.Println("Starting Task 3")
	// Simulate work by sleeping
	time.Sleep(2 * time.Second)
	fmt.Println("Completed Task 3")
}

func main() {
	// First, run tasks the old way (sequentially)
	oldComputer()

	// Then, run tasks the modern way (concurrently)
	modernComputer()
}
