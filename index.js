const fs = require('fs')
const path = require('path')
const marked = require('marked')
const yfm = require('yaml-front-matter')
const $ = require('cheerio')

function getTableData (table) {


}

fs.readFile('./test01.md', (err, data) => {
	
	const htmlContent = marked(data.toString())
	console.log(htmlContent)
	const tables = $.load(htmlContent)('table')
	console.log($(tables[0]).text())

})

