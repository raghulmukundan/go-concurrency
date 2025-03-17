package main

import (
	"fmt"
	"time"
)

func allocate() {
	for i := 0; i < 1e6; i++ {
		_ = make([]byte, 1024) // Triggers GC eventually
	}
	fmt.Println("Allocated!")
}

func main() {
	go allocate()
	fmt.Println("Main")
	time.Sleep(time.Millisecond)
}
