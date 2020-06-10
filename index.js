const fs = require('fs')
const path = require('path')
const marked = require('marked')
const $ = require('cheerio')

/**
 * convert html table content to array content 
 * @param  {Object} table Table Object get from cheerio
 * @return {[type]}       an 
 */
function getTableData (table) {
	// cherrio只能使用jquery兼容方法 不能使用node.innerText 这种标准DOM属性	
  // you can't use any BOM based api in cheerio, eg: node.innerText  
  const headers = $(table).find('thead tr th').map((i, node) => $(node).text()).get()
  const bodys =  $(table).find('tbody tr').map((i, node) => node).get()
  	.map(tr => $(tr).find('td').map((i, node) => $(node).text()).get())

  return bodys.map(item => {

  	return headers.reduce((acc, field, index) => {
      const fieldValue = item[index]

      // 数字内容字符串使用Number函数转为数字
      // Use String() to convert string number to number
  		return {...acc,
  			[field]: (/^[\-\d]\d*\.?\d*$/).test(fieldValue) ? Number(fieldValue) : fieldValue
  		}
  	}, {})
  })
}  

function markdownToJson (mdContent) {

  const htmlContent = marked(mdContent)
  const tables = $.load(htmlContent)('table')
  
  // 以数组方式返回[处理结果, 转化出的html文本, $, 原始markdown内容] 
  // 方便二次处理
  // return an arrary consist of [resultData, htmlContent, $, markdowncontent]
  // convenient for you to get more info you want get from markdown content
  return [
    Array.prototype.map.call(tables, table => {
  
        return getTableData(table)
    }),
    htmlContent,
    $,
    mdContent,
  ]
}

module.exports = markdownToJson
