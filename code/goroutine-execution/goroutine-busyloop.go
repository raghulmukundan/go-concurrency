package main

import (
	"fmt"
	"time"
)

func busy() {
	for i := 0; i < 1e9; i++ {
		fmt.Println("Done!")
	}
}

func main() {
	go busy()
	fmt.Println("Will I ever print?")
	time.Sleep(time.Microsecond)
}
