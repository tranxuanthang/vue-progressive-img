export const createFilterElement = () => {
  const filterEl = document.createElement('div')
  filterEl.innerHTML = '<svg class="filter-svg"><filter id="sharpBlur"><feGaussianBlur stdDeviation="8"></feGaussianBlur><feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"></feColorMatrix><feComposite in2="SourceGraphic" operator="in"></feComposite></filter></svg>'
  document.body.append(filterEl)
}
