
let myBot = 0;
export class MySprite{
  constructor(simulation, _document, stage){
    this.simulation = simulation;
    this.document = _document;
    this.stage = stage;
    this.width = 50;
    this.height = 50;
    this.x = 30;
    this.y = window.innerHeight/2;
    this.vx = 0;
    this.vy = 0;
  }

  addSprite(sprite_file, grid_file, crate_file, box_file, dock_file){
    this.stage.renderSprite(sprite_file, grid_file, crate_file, box_file, dock_file, this.width, this.height, this.x, this.y);
  }

}
