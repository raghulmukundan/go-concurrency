package main

import (
	"fmt"
	"time"
)

func sayHi() {
	fmt.Println("Hi!")
}

func main() {
	go func() {
		for i := 0; i < 3; i++ {
			fmt.Println("hello") // Might yield here
		}
	}()

	fmt.Println("Main runs!")
	time.Sleep(time.Millisecond) //Brief wait for demo
}
