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
    console.log(`--------> ${person.name} is on floor ${person.currentFloor} and would like to go to floor ${requestedFloor}`)
    this.requests.push(requestedFloor)
    this.goToFloor({ requestedFloor: person.currentFloor })
    this.riders.push(person)
    this.goToFloor({ requestedFloor })
    this.requests = pull(this.requests, requestedFloor)
    this.riders = pull(this.riders, person)
  }

  goToFloor ({ requestedFloor }) {
    console.log(`--------> going from floor ${this.currentFloor} to floor ${requestedFloor}`)
    this.stopsMade += 1
    this.floorsTraversed += Math.abs(this.currentFloor - requestedFloor)
    this.currentFloor = requestedFloor
  }

  asyncGoToFloor ({ requestedFloor }) {
    while (this.currentFloor < requestedFloor) {
      this.currentFloor += 1
      console.log(this.currentFloor)
      // this.asyncMoveUp()
    }

    while (this.currentFloor > requestedFloor) {
      this.asyncMoveDown()
    }
  }

  asyncMoveUp () {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentFloor += 1
        console.log(`moved up to level ${this.currentFloor}`)
        resolve(this.currentFloor)
      }, 1000)
    })
  }

  asyncMoveDown () {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentFloor -= 1
        console.log(`moved down to level ${this.currentFloor}`)
        resolve(this.currentFloor)
      }, 1000)
    })
  }
}
