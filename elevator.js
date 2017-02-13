export default class Elevator {
  constructor ({ name }) {
    this.name = name
    this.currentFloor = 0
    this.floorsTraversed = 0
    this.stopsMade = 0
    this.requests = []
    this.riders = []
    this.status = 'idle'
  }

  reset () {
    this.constructor()
  }
}
