package main

import (
	"fmt"
	"sync"
)

func communicatingChannels() {
	ch := make(chan int)
	var wg sync.WaitGroup

	// Create a done channel to signal counter completion
	done := make(chan bool)

	//counter go routine
	go func() {
		count := 0
		for range ch {
			count++
		}

		fmt.Println("Final Count: ", count)
		done <- true // Signal that counting is complete
	}()

	//worker go routine
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			ch <- 1
			wg.Done()
		}()
	}

	wg.Wait()
	close(ch)
	<-done // Wait for counter to finish processing
}

func main() {
	communicatingChannels()
}
