const express = require('express')

const app = express()
const PORT = process.env.PORT || 4500

// middleware
app.use(express.static('public'))

// view engine
app.set('view engine', 'ejs')

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})