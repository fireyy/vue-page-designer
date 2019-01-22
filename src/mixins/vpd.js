import vpd from '../store'

export default {
  beforeCreate () {
    this.$vpd = vpd
  }
}
