package main

import (
	"fmt"
	"time"
)

func preemptiveExample() {
	go func() {
		//A CPU-bound loop that doesn't yield voluntarily
		sum := 0
		for i := 0; i < 1_000_000_000; i++ {
			sum += i
		}

		fmt.Println("Sum:", sum)
	}()

	go func() {
		fmt.Println("I still get to run, thanks to preemptive scheduling!")
	}()

	time.Sleep(1 * time.Second)
}

func main() {
	preemptiveExample()
}
