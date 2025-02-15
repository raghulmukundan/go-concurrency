package main

import (
	"fmt"
	"sync"
)

// The old way: Sharing memory (prone to problems)
func sharingMemory() {
	counter := 0
	var wg sync.WaitGroup

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			counter++ //This can cause race conditions!
			wg.Done()
		}()
	}

	wg.Wait()
	fmt.Println("Final counter value:", counter) //Might not be 1000!

}

func main() {
	sharingMemory()
}
