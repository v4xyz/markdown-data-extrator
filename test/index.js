const fs = require('fs')
const path = require('path')
const mdToJSON = require('../')

const stubData = [ [ { '字段名称': '文章标题[title]', '规则': '', '说明': '' },
    { '字段名称': '文件名[source]', '规则': '', '说明': '' },
    { '字段名称': '模板[layout]', '规则': '', '说明': '' } ],
  [ { '字段名称': '文章标题[title]', '规则': '', '说明': '' },
    { '字段名称': '文件名[source]', '规则': '', '说明': '' },
    { '字段名称': '模板[layout]', '规则': '', '说明': '' },
    { '字段名称': '更新时间[updated]', '规则': '', '说明': '' },
    { '字段名称': '编辑[opt_btn_edit]', '规则': '', '说明': '编辑按钮' },
    { '字段名称': '详情[opt_btn_detail]', '规则': '', '说明': '详情按钮' } ] ]

fs.readFile(path.resolve(__dirname, 'fixtures', 'test01.md'), (err, data) => {

	if (err) {
		console.log(err)
		return 
	}

	const [tableData, htmlContent, $, mdContent] = mdToJSON(data.toString())

	console.log(tableData)
	if (JSON.stringify(tableData) === JSON.stringify(stubData)) {
		console.log('Test passed')
	} else {
		console.log('Test faild')
	}

	if ($.load(htmlContent)('table').length == 2) {
		console.log('Test passed')
	} else {
		console.log('Test faild')
	}

})
