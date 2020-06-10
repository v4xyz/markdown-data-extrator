# md-to-json
让你轻松的获取markdown文档中的表格数据及更多 | Help you easily get data in table content from markdown and more

## 使用|Usage
```js
const fs = require('fs')
const path = require('path')
const mdToJSON = require('md-to-json')

const markdownFile = path.resolve('.', 'test.md')

fs.readFile(markdownFile, (err, data) => {
	if (err) {
		console.log(err)
		return 
	}

	// htmlContent: the html content get from marked, see: https://github.com/markedjs/marked
	// $: the cheerio object, see: https://github.com/cheeriojs/cheerio
	// mdContent: the input markdown content
	const [tableData, htmlContent, $, mdContent] = mdToJSON(data.toString())
	console.log(tableData)

	// if you want get more data from markdown content	
	$.load(htmlContent)('h1').text()

})
```

