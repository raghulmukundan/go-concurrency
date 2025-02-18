// Go's way: Pass messages (like kitchen orders)
orders := make(chan string)
go cookChef(orders)
orders <- "Pizza" // Send an order through the channel