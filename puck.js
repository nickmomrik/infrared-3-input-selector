var commands = {
  power: [9.0, 4.4, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 39.7],
  1: [9.0, 4.4, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 39.7],
  2: [9.0, 4.4, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 39.7],
  3: [9.0, 4.4, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 0.5, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 1.6, 0.6, 39.7]
};

function watch_clicks() {
  var start = Date.now();
  var clicks = 0;

  while ( Date.now() - start < 2000 ) {
    if ( BTN.read() ) {
      LED3.set();
      clicks++;

      while ( BTN.read() ) {
        // Wait for button release
      }

      LED3.reset();
    }
  }

  LED2.reset();
  LED1.set();

  return clicks;
}

function do_clicks( clicks ) {
  switch ( clicks ) {
    case 1:
    case 2:
    case 3:
      Puck.IR( commands[clicks] );
      break;
    default:
      Puck.IR( commands.power );
  }
}

while ( true ) {
  if ( BTN.read() ) {
    LED3.set();
    while ( BTN.read() ) {
      // Wait for button release
    }

    LED3.reset();
    LED2.set();

    do_clicks( watch_clicks() );

    LED1.reset();
  }
}
