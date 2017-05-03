window.onload = function() {

  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

  // create an engine
  var engine = Engine.create();
      world = engine.world

  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 400,
      height: 800,
    }
  });

  var body1 = Bodies.polygon(400, 0, 3, 60, { isStatic: true });
  var composite1 = Matter.Composite.create();
  var vector1 = Matter.Vector.create(400, 0);
  Matter.Composite.add(composite1, body1);
  Matter.Composite.rotate(composite1, 0.3, vector1);

  var ball;

  //var box = Bodies.rectangle(x, y, w, h, { isStatic: true });
  var bodies = [
    //borders
    Bodies.rectangle(200, -1, 400, 2, { isStatic: true }),
    Bodies.rectangle(200, 801, 400, 2, { isStatic: true }),
    Bodies.rectangle(-1, 400, 2, 800, { isStatic: true }),
    Bodies.rectangle(401, 400, 2, 800, { isStatic: true }),
    //map
    Bodies.rectangle(350, 450, 20, 700, { isStatic: true }),
    Bodies.rectangle(380, 790, 40, 20, { isStatic: true }),
    composite1,
    //ball
    ball = Bodies.circle(380, 760, 20)
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
      Matter.Body.setVelocity(ball, { x: 0, y: velocity });
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
