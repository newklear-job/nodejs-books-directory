class Filter {
  constructor (searchParams) {
    this.searchParams = searchParams
  }

  getQuery () {
    const query = {}
    for (const [key, value] of Object.entries(this.searchParams)) {
      if (this.searchParams[key] &&
        Object.prototype.hasOwnProperty.call(this.constructor.prototype, key) &&
        typeof this[key] === 'function'
      ) {
        query[key] = this[key](value)
      }
    }
    return query
  }
}

export { Filter }
