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

  //var box = Bodies.rectangle(x, y, w, h, { isStatic: true });
  var bodies = [
    Bodies.rectangle(350, 500, 20, 600, { isStatic: true })
  ]

  // add all of the bodies to the world
  World.add(world, bodies);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);

};
