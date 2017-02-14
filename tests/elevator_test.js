require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
})

const expect = require('chai').expect
const Elevator = require('../elevator').default
const Person = require('../person').default

describe('Elevator', () => {
  const elevator = new Elevator({ name: 'Unamed Elevator' })
  const Luke = new Person({ name: 'Luke', currentFloor: 2 })

  beforeEach(() => {
    elevator.reset()
  })

  it('should be instantiated with all the proper poperties and methods when created', () => {
    expect(elevator).to.exist
    expect(elevator.name).to.equal('Unamed Elevator')
    expect(elevator.currentFloor).to.equal(0)
    expect(elevator.floorsTraversed).to.equal(0)
    expect(elevator.stopsMade).to.equal(0)
    expect(elevator.requests).to.deep.equal([])
    expect(elevator.riders).to.deep.equal([])
    expect(elevator.status).to.equal('idle')
  })

  it('should have a method goToFloor that moves the elevator to a floor and tracks currentFloor and floorsTraversed', () => {
    elevator.goToFloor({ requestedFloor: 4 })

    expect(elevator.stopsMade).to.equal(1)
    expect(elevator.floorsTraversed).to.equal(4)
  })

  it('should have a method called requestFloor that delivers a passanger and keeps track of key metrics', () => {
    elevator.requestFloor({ person: Luke, requestedFloor: 5 })

    expect(elevator.currentFloor).to.equal(5)
    expect(elevator.status).to.equal('idle')
    expect(elevator.stopsMade).to.equal(2)
    expect(elevator.floorsTraversed).to.equal(5)
    expect(elevator.requests).to.deep.equal([])
    expect(elevator.riders).to.deep.equal([])
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
