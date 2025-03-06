package main

import (
	"fmt"
	"time"
)

func sender(ch chan string) {
	fmt.Println("Sender: Preparing to send")
	ch <- "Hello from sender!" //Blocks until received
	fmt.Println("Sender: Message Sent")
}

func receiver(ch chan string) {
	fmt.Println("Receiver: Waiting for message")
	msg := <-ch //Blocks until sent
	fmt.Println("Receiver: Message received: ", msg)
}

func main() {
	ch := make(chan string) //Unbuffered channel

	go sender(ch)   //Start sender goroutine
	go receiver(ch) //Start receiver goroutine

	fmt.Println("Main: Goroutines started")
	time.Sleep(1 * time.Second) // Wait to observe full execution
	fmt.Println("Main: Done")
}
