const fs = require('fs')
const path = require('path')
const mdToJSON = require('../')

fs.readFile(path.resolve(__dirname, 'fixtures', 'test01.md'), (err, data) => {

	if (err) {
		console.log(err)
		return 
	}

	console.log(mdToJSON(data.toString()))

})
