export default class Person {
  constructor ({ name, currentFloor, elevatorRequested = false }) {
    this.name = name
    this.currentFloor = currentFloor
  }

  setFloor (floor) {
    this.currentFloor = floor
  }
}
