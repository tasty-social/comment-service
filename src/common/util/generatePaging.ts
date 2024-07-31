export class Pagination {
  limit: number
  currentPage: number
  lastPage: number
  nextPage: number
  prevPage: number
  totalItem: number
}

export const renderPagingResponse = (ipp: number, page: number, total): Pagination => {
  const limit = +ipp || 10
  const currentPage = +page || 1
  const lastPage = Math.ceil(total / limit)
  const nextPage = currentPage + 1 > lastPage ? null : currentPage + 1
  const prevPage = currentPage - 1 < 1 ? null : currentPage - 1
  const totalItem = total

  return {
    limit,
    currentPage,
    lastPage,
    nextPage,
    prevPage,
    totalItem
  }
}
