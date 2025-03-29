const next = function(data, pageNum, pageSize) {
  const total = data.length
  const max = Math.ceil(total / pageSize)
  if (pageNum > max) {
    pageNum = max
  }
  if(pageNum < 0) {
    pageNum = 0
  }
  const start = pageSize * pageNum
  const end = pageSize * (pageNum + 1)
  return data.slice(start, end)
}



