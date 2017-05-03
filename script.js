window.onload = function() {

  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;
      Body = Matter.Body;
      Composite = Matter.Composite;
      Vector = Matter.Vector;

  // create an engine
  var engine = Engine.create();
      world = engine.world

  // create a renderer
  var canvas = {
    width: 400,
    height: 800
  }

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: canvas.width,
      height: canvas.height
    }
  });



  var body1 = Bodies.polygon(400, 0, 3, 60, { isStatic: true });
  var composite1 = Composite.create();
  var vector1 = Vector.create(400, 0);
  Composite.add(composite1, body1);
  Composite.rotate(composite1, 0.3, vector1);

  var ball;

  //var box = Bodies.rectangle(x, y, w, h, { isStatic: true });
  var bodies = [
    //borders
    Bodies.rectangle(200, -10, 400, 20, { isStatic: true }),
    Bodies.rectangle(200, 810, 400, 20, { isStatic: true }),
    Bodies.rectangle(-10, 400, 20, 800, { isStatic: true }),
    Bodies.rectangle(410, 400, 20, 800, { isStatic: true }),
    //map
    Bodies.rectangle(350, 450, 20, 700, { isStatic: true }),
    Bodies.rectangle(380, 790, 40, 20, { isStatic: true }),
    composite1,
    Bodies.circle(170, 200, 40, {isStatic: true}),
    Bodies.circle(100, 400, 30, {isStatic: true}),
    Bodies.circle(239, 400, 30, {isStatic: true}),
    //ball
    ball = Bodies.circle(380, 760, 20, {friction: 0.5, restitution: 0.8})
  ];

  // add all of the bodies to the world
  World.add(world, bodies);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);

  var launched = 0;

  function launch(velocity){
    if(launched === 0){
      Body.setVelocity(ball, { x: 0, y: velocity });
    }
    launched = 1;
  }

  document.onkeydown = function(event) {
    event = event || window.event;
    var e = event.keyCode;

    switch (event.keyCode){
      case 32:
        launch(-28);
        break;
    }
  }
}
