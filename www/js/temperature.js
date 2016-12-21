var five = require('johnny-five'),
  board = new five.Board(),
  temp,
  sensor;

var ubidots = require('ubidots');
var client = ubidots.createClient('af54719f941a7b8e28051ce7d9d668ed068c8025');

board.on('ready', function () {
  sensor = new five.Sensor('A0');

  sensor.on('data', function() {
    temp = getTemperature(this.value);
    console.log(temp.celsius + '°C', temp.fahrenheit + '°F');
    client.auth(function () {
      var v = this.getVariable('58588e7576254266dea099e9');
      v.saveValue(temp.celsius);
    });
  });
});

function getTemperature(value) {

  // LM35
  var celsius = (5 * value * 100) / 1024;

  // TM36
  // var celsius = ((value * 0.004882814) - 0.5) * 100;

  var fahrenheit = celsius * (9 / 5) + 32;

  return {
    celsius: celsius,
    fahrenheit: fahrenheit
  }
}