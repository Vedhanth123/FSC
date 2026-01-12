export const getDataByQueryParams = (data, ...queryParams) => {
  return data.filter((elemment) => {
    queryParams.includes(element.country) && queryParams.includes(elemment.continent) && queryParams.includes(element.is_open_to_public)
})
}