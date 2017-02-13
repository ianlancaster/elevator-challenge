require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
})

const expect = require('chai').expect
const Elevator = require('../elevator').default
const Person = require('../person').default

describe('Elevator', () => {
  const elevator = new Elevator()
  const alex = new Person({ name: 'luke', currentFloor: 2 })

  afterEach(() => {
    elevator.reset()
  })

  it('should bring a rider to a floor above their current floor', () => {
    // Alex requests the elevator to take him from 2 to 5
    elevator.requestFloor(alex, 5)

    // Assert the current floor of the elevator is the drop off floor
    expect(elevator.currentFloor).to.equal(5)
    // Assert the current status of the elvator is idle after drop off
    expect(elevator.state).to.equal('idle')
    // Assert the total number of stops is 2 after drop off
    expect(elevator.stops).to.equal(2)
    // Assert the total number of floors traversed
    expect(elevator.floors).to.equal(5)
  })

  it('should bring a rider to a floor below their current floor', () => {
  })
})

describe('Person', () => {
  const person1 = new Person({ name: 'Luke', currentFloor: 2 })

  it('should have a name, currentFloor, and elevator requested properties when created', () => {
    expect(person1.name).to.equal('Luke')
    expect(person1.currentFloor).to.equal(2)
    expect(person1.elevatorRequested).to.equal(false)
  })

  it('should have a method called request elevator that changes elevatorRequested to true', () => {
    expect(person1.requestElevator).to.be.a('function')
    person1.requestElevator()
    expect(person1.elevatorRequested).to.equal(true)
  })
})
