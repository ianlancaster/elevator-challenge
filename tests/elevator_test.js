require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
})

const expect = require('chai').expect
const Elevator = require('../elevator').default
const Person = require('../person').default

describe('Elevator', function () {
  const elevator = new Elevator()
  const alex = new Person('Alex', 2)

  afterEach(function () {
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
