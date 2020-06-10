const fs = require('fs')
const path = require('path')
const marked = require('marked')
const yfm = require('yaml-front-matter')
const $ = require('cheerio')

/**
* 获取table数据
*/
function getTableData (table) {
	// cherrioz只能使用jquery兼容方法 不能使用node.innerText 这种标准DOM属性	
  const headers = $(table).find('thead tr th').map((i, node) => $(node).text()).get()
  const bodys =  $(table).find('tbody tr').map((i, node) => node).get()
  	.map(tr => $(tr).find('td').map((i, node) => $(node).text()).get())

  // return $(table).find('thead tr').children()
  return bodys.map(item => {

  	return headers.reduce((acc, field, index) => {
      const fieldValue = item[index]

      // 数字内容字符串使用Number函数转为数字
  		return {...acc,
  			[field]: (/^[\-\d]\d*\.?\d*$/).test(fieldValue) ? Number(fieldValue) : fieldValue
  		}
  	}, {})
  })
}  

function markdownToJson (mdContent) {

  const htmlContent = marked(mdContent)
  // console.log(htmlContent)
  const tables = $.load(htmlContent)('table')
  console.log(tables.length)

  // return getTableData(tables[0])
  return Array.prototype.map.call(tables, table => {

    return getTableData(table)
  }) 
}

module.exports = markdownToJson
