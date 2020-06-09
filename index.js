const express = require("express")
const morgan = require("morgan")
const logger = require("./middleware/logger")
const noInsomnia = require("./middleware/no-insomnia")
const welcomeRouter = require("./welcome/welcome-router")
const usersRouter = require("./users/users-router")

const server = express()
const port = 4000

server.use(express.json())
server.use(noInsomnia())
// server.use(morgan("combined"))
server.use(logger("short"))

server.use(welcomeRouter)
server.use(usersRouter)

// This is considered error middleware since it has four parameters
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
