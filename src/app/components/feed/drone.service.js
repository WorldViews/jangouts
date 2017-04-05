(function () {
  'use strict';

  angular.module('janusHangouts')
    .service('DroneService', DroneService);

  /**
   * Service to create 360 videos
   * @constructor
   * @memberof module:janusHangouts
   */
  function DroneService() {
      this.up = up;
      this.down = down;
      this.center = center;

      var socket = io.connect('https://sd6.dcpfs.net:6443/');

      function up() {
        socket.emit('command', 'up');
      }

      function down() {
        socket.emit('command', 'down');
      }

      function center() {
        socket.emit('command', 'reset');
      }
  }

}());
