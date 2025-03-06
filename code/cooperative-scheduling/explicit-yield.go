package main

import (
	"fmt"
	"time"
)

func looper() {
	for i := 0; i < 3; i++ {
		fmt.Println("Loop: ", i)
		time.Sleep(time.Millisecond) //Explicit yield
	}

}

func routine() {
	for i := 0; i < 3; i++ {
		fmt.Println("Routine: ", i)
		time.Sleep(time.Millisecond) //Explicit yield
	}
}

func main() {
	go looper()
	go routine()
	time.Sleep(time.Second) //Brief wait for demo
}
