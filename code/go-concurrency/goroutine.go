func demonstrateGoroutines() {
    // Each goroutine might only need ~2KB
    for i := 0; i < 10000; i++ {
        go func(id int) {
            fmt.Printf("Goroutine %d running\n", id)
        }(i)
    }
    time.Sleep(time.Second)
}