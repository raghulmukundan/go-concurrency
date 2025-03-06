package main

import (
	"fmt"
	"runtime"
	"time"
)

func looper() {
	for i := 0; i < 3; i++ {
		fmt.Println("Loop: ", i)
		runtime.Gosched() //Explicit yield
	}

}

func routine() {
	for i := 0; i < 3; i++ {
		fmt.Println("Routine: ", i)
		runtime.Gosched() //Explicit yield
	}
}

func main() {
	go looper()
	go routine()
	time.Sleep(time.Second) //Brief wait for demo
}
