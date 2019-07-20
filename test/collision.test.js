import MockSimulator from './MockSimulator';

let simulator;

function init(){
   simulator = new MockSimulator();
}

describe('Collision test', function(){
  beforeEach(()=> init());

  it('Checks if sensor detects collision with crate', function(){
    expect(simulator.checkSensorCrateCollision()).toBeTruthy();
  });

  it("Checks if sensor detects collision with boudaries of Canvas", function(){
    expect(simulator.checkSensorBoundaryCollision()).toBeFalsy();
  })


});
