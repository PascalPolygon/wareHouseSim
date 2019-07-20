
export default class MockBox{
  constructor(){
    this.x = 100;
    this.y = 155; //bottom of box will be at 205, which is 5 px inside the crate, it algorithm should place it below crate
    this.width = 50;
    this.height = 50;
  }
}

// export class MockDocument {
// 	constructor(canvas) {
// 		this.canvas = canvas || new MockCanvas();
// 	}
// }
