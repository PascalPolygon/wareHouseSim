import MockSimulator from './MockSimulator';

let simulator;

function init(){
   simulator = new MockSimulator();
}

describe('Simulation kinematic calculations', function(){
  beforeEach(()=> init());

  it('Verifies that x vel vectors are computed correctly', function(){
    expect(simulator.getXvelocityFromAngle(Math.PI/2)).toEqual(5);
  });

  it('Verifies that y vel vectors are computed correctly', function(){
    expect(simulator.getYvelocityFromAngle(Math.PI/2)).toEqual(0);
  });

  it('Verifies that the sensor displacement from the robot is computed correctly', function(){
    expect(simulator.sensorDisplacement()).toEqual('35.355');
  });

  // 35.35533905932738



});
