export class SeedData {
  requireContext;

  constructor() {
    this.requireContext = require.context('./', false, /\.json$/);
  }

  isEmpty() {
      return this.requireContext.keys().length === 0;
  }

  basename(s) {
    return s.substring(s.lastIndexOf('/') + 1, s.lastIndexOf('.'));
  }

  createDb() {
    return this.requireContext.keys()
      .reduce((map, n)  => {
        map[this.basename(n)] = this.requireContext(n);
        return map;
      }, {});
    }
}
