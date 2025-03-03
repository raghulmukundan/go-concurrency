func infiniteLoop() {
	for {
		// Busy work with no function calls or blocking operations
		i := 0
		i++
	}
}

func main() {
	go infiniteLoop()
	fmt.Println("Will I ever print?")
}