require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
})

const expect = require('chai').expect
const Elevator = require('../elevator').default
const Person = require('../person').default

describe('Elevator', () => {
  const elevator = new Elevator({ name: 'Unamed Elevator' })
  const Luke = new Person({ name: 'Luke', currentFloor: 2 })
  const Leigh = new Person({ name: 'Leigh', currentFloor: 0 })

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

  it('should correctly track key metrics when Luke goes up and Leigh goes down', () => {
    Luke.setFloor(2)
    Leigh.setFloor(8)

    elevator.requestFloor({ person: Luke, requestedFloor: 9 })
    elevator.requestFloor({ person: Leigh, requestedFloor: 0 })

    expect(elevator.currentFloor).to.equal(0)
    expect(elevator.status).to.equal('idle')
    expect(elevator.stopsMade).to.equal(4)
    expect(elevator.floorsTraversed).to.equal(18)
    expect(elevator.requests).to.deep.equal([])
    expect(elevator.riders).to.deep.equal([])
  })

  it('should correctly track key metrics when Luke goes up and Leigh goes up', () => {
    Luke.setFloor(2)
    Leigh.setFloor(2)

    elevator.requestFloor({ person: Luke, requestedFloor: 9 })
    elevator.requestFloor({ person: Leigh, requestedFloor: 4 })

    expect(elevator.currentFloor).to.equal(4)
    expect(elevator.status).to.equal('idle')
    expect(elevator.stopsMade).to.equal(4)
    expect(elevator.floorsTraversed).to.equal(18)
    expect(elevator.requests).to.deep.equal([])
    expect(elevator.riders).to.deep.equal([])
  })

  it('should correctly track key metrics when Luke goes down and Leigh goes down', () => {
    Luke.setFloor(9)
    Leigh.setFloor(8)

    elevator.requestFloor({ person: Luke, requestedFloor: 3 })
    elevator.requestFloor({ person: Leigh, requestedFloor: 0 })

    expect(elevator.currentFloor).to.equal(0)
    expect(elevator.status).to.equal('idle')
    expect(elevator.stopsMade).to.equal(4)
    expect(elevator.floorsTraversed).to.equal(28)
    expect(elevator.requests).to.deep.equal([])
    expect(elevator.riders).to.deep.equal([])
  })

  it('should correctly track key metrics when Luke goes down and Leigh goes up', () => {
    Luke.setFloor(9)
    Leigh.setFloor(3)

    elevator.requestFloor({ person: Luke, requestedFloor: 0 })
    elevator.requestFloor({ person: Leigh, requestedFloor: 7 })

    expect(elevator.currentFloor).to.equal(7)
    expect(elevator.status).to.equal('idle')
    expect(elevator.stopsMade).to.equal(4)
    expect(elevator.floorsTraversed).to.equal(25)
    expect(elevator.requests).to.deep.equal([])
    expect(elevator.riders).to.deep.equal([])
  })
})

describe('Person', () => {
  const person1 = new Person({ name: 'Luke', currentFloor: 2 })

  it('should have a name, currentFloor, and elevator requested properties when created', () => {
    expect(person1.name).to.equal('Luke')
    expect(person1.currentFloor).to.equal(2)
  })
})
