package main

import (
	"fmt"
	"time"
)

func main() {
	go sayHello() // How does Go decide when this runs?
	time.Sleep(100 * time.Millisecond)
}

func sayHello() {
	fmt.Println("Hello, concurrent world!")
}
