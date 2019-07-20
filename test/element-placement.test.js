
import MockSimulator from './MockSimulator';

let simulator;

function init(){
   simulator = new MockSimulator();
}

describe('Element placement on canvas', function(){
  beforeEach(()=> init());

  it('Box size is less than canvas', function(){
    expect(simulator.boxSmallerThanCanvas()).toBeTruthy();
  });

  it('Verifies that placement algorithm places box below crate', function(){
    expect(simulator.addBoxOnCrate()).toEqual('below');
  });

  it('Verifies that semi-radom crate placement is on canvas', function(){
    expect(simulator.addCrateOnCanvas()).toBeTruthy();
  });


});
