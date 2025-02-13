// In the past: Single-core CPU
func oldComputer() {
    // Could only do one thing at a time
    doTask1()
    doTask2()
    doTask3()
}

// Modern computer: Multiple cores
func modernComputer() {
    // Can do multiple things simultaneously
    go doTask1()  // Run on core 1
    go doTask2()  // Run on core 2
    go doTask3()  // Run on core 3
}