func makeBreakfast() {
	go makeCoffee() // Just add 'go' - that's it!
	go makeToast()
}