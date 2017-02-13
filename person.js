export default class Person {
  constructor ({ name, currentFloor, elevatorRequested = false }) {
    this.name = name
    this.currentFloor = currentFloor
    this.elevatorRequested = elevatorRequested
  }

  requestElevator () {
    this.elevatorRequested = true
  }
}
