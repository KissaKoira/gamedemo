window.onload = function() {

  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite,
      Vector = Matter.Vector,
      Constraint = Matter.Constraint,
      Vertices = Matter.Vertices;

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
  Matter.Body.rotate(body1, 0.3);

  var body2 = Bodies.polygon(0, 0, 3, 60, { isStatic: true });
  Matter.Body.rotate(body2, 0.75);

  var body3 = Bodies.polygon(20, 700, 3, 40, { isStatic: true });
  Matter.Body.rotate(body3, 1.05);

  var flipperPath1 = Vertices.fromPath('0 0 7 -7 67 -7 75 0 67 7 15 15'),
      flipperPath2 = Vertices.fromPath('0 0 -7 -7 -67 -7 -75 0 -67 7 -15 15'),
      flipper1 = Bodies.fromVertices(97, 702, flipperPath1, {isStatic: true}),
      flipper2 = Bodies.fromVertices(245, 702, flipperPath2, {isStatic: true}),
      vector3 = Vector.create(61, 702),
      vector4 = Vector.create(281, 702);

  var ball,
      launcher,
      constr1;

  var composite1 = Composite.create();
  Composite.add(composite1, flipper1);

  var composite2 = Composite.create();
  Composite.add(composite2, flipper2);

  //var box = Bodies.rectangle(x, y, w, h, { isStatic: true });
  var bodies = [
  //borders
    Bodies.rectangle(200, -10, 400, 20, { isStatic: true }),
    Bodies.rectangle(200, 810, 400, 20, { isStatic: true }),
    Bodies.rectangle(-10, 400, 20, 800, { isStatic: true }),
    Bodies.rectangle(410, 400, 20, 800, { isStatic: true }),

  //map
    Bodies.rectangle(350, 450, 20, 700, { isStatic: true }),
    launcher = Bodies.rectangle(380, 780, 40, 40),
    //Bodies.rectangle(120, 700, 50, 20, { isStatic: true }),

    body1,
    body2,
    body3,
    Bodies.polygon(320, 700, 3, 40, { isStatic: true }),

    Bodies.circle(170, 200, 40, {isStatic: true}),
    Bodies.circle(100, 400, 30, {isStatic: true}),
    Bodies.circle(239, 400, 30, {isStatic: true}),

  //ball
    ball = Bodies.circle(380, 740, 20, {friction: 0.1, restitution: 1, frictionStatic: 0.1, frictionAir: 0}),

  //flippers
    flipper1,
    flipper2
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

  var rotation = 0;

  function rotateFunc(){
    if(rotation === 0){
      Matter.Composite.rotate(composite1, -0.4, vector3);
      Matter.Composite.rotate(composite2, 0.4, vector4);
      rotation = 1;
    }

    if(rotation === 1){
      rotation = 2;
      window.setTimeout(function(){
        Matter.Composite.rotate(composite1, 0.4, vector3);
        Matter.Composite.rotate(composite2, -0.4, vector4);
        rotation = 0;
      }, 100);
    }
  }

  document.onkeydown = function(event) {
    event = event || window.event;

    switch (event.keyCode){
      case 32:
        //launch(-28);
        if(!constr1){
          constr1 = Constraint.create({ bodyA: launcher, pointB: { x: 380, y: 800 }, length: 60, stiffness: 1});
          World.add(world, constr1);
        }
        rotateFunc();

        break;
    }
  }
}
