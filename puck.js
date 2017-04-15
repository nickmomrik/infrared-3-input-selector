var commands = {
  power: "0000 006d 0022 0000 0157 00a8 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 003e 0017 003e 0017 0013 0017 003e 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 003e 0017 003e 0017 003e 0017 003e 0017 0013 0017 0013 0017 0013 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 003e 0017 003e 0017 05e5",
  1: "0000 006d 0022 0000 0157 00a8 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 003e 0017 003e 0017 0013 0017 003e 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 0013 0017 003e 0017 003e 0017 003e 0017 003e 0017 003e 0017 003e 0017 05e5",
  2: "0000 006d 0022 0000 0157 00a8 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 003e 0017 003e 0017 0013 0017 003e 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 0013 0017 0013 0017 003e 0017 003e 0017 003e 0017 003e 0017 003e 0017 05e5",
  3: "0000 006d 0022 0000 0157 00a8 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 003e 0017 003e 0017 0013 0017 003e 0017 0013 0017 003e 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 0013 0017 0013 0017 0013 0017 0013 0017 003e 0017 003e 0017 003e 0017 0013 0017 003e 0017 003e 0017 003e 0017 003e 0017 05e5"
};

// https://github.com/espruino/EspruinoDocs/blob/master/modules/pronto.js
function pronto( d ) {
  var a=d.trim().split(" ").map(function(x){return parseInt(x,16);});
  var freq = 4145146/a[1];
  return a.slice(4).map(function(x){
    return (1000*x/freq).toFixed(1);
  });
}

function watch_clicks() {
  var start = Date.now();
  var clicks = 0;

  while ( Date.now() - start < 2000 ) {
    if ( BTN.read() ) {
      LED3.set();
      clicks++;

      while ( BTN.read() ) {
        // Wait
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
      Puck.IR( pronto( commands[clicks] ) );
      break;
    default:
      Puck.IR( pronto( commands.power ) );
  }
}

while ( true ) {
  if ( BTN.read() ) {
    LED3.set();
    while ( BTN.read() ) {
      // Wait
    }

    LED3.reset();
    LED2.set();

    do_clicks( watch_clicks() );

    LED1.reset();
  }
}
