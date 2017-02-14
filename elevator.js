import { pull } from 'lodash'

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
    this.constructor({ name: 'Unamed Elevator' })
  }

  requestFloor ({ person, requestedFloor }) {
    this.requests.push(requestedFloor)
    this.goToFloor({ requestedFloor: person.currentFloor})
    this.riders.push(person)
    this.goToFloor({ requestedFloor })
    this.requests = pull(this.requests, requestedFloor)
    this.riders = pull(this.riders, person)
  }

  goToFloor ({ requestedFloor }) {
    this.stopsMade += 1
    this.floorsTraversed += Math.abs(this.currentFloor - requestedFloor)
    this.currentFloor = requestedFloor
  }
}
