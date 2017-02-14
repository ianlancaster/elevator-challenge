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

  requestFloor ({ person, floor }) {
    this.goToFloor({ floor: person.currentFloor})
    this.goToFloor({ floor })
  }

  goToFloor ({ floor }) {
    this.stopsMade += 1
    this.floorsTraversed += Math.abs(this.currentFloor - floor)
    this.currentFloor = floor
  }
}
