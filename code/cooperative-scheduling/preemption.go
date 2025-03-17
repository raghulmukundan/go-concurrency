package main

import (
	"fmt"
	"time"
)

func preemption() {
	for i := 0; i < 1e9; i++ {
	} //CPU bound loop
	fmt.Println("Finished!")
}

func main() {
	go preemption()
	fmt.Println("Main")
	time.Sleep(time.Millisecond)
}
