package main

import (
	"fmt"
	"runtime"
	"time"
)

func cooperativeScheduling() {
	go func() {
		// This goroutine will run until it decides to yield
		for i := 0; i < 3; i++ {
			fmt.Println("Working..")
			// Voluntarily yield with runtime.Gosched()
			runtime.Gosched()
		}
	}()

	//Another goroutine
	go func() {
		fmt.Println("Waiting for my turn...")
	}()

	time.Sleep(100 * time.Millisecond)
}

func main() {
	cooperativeScheduling()
}
