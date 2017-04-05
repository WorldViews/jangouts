/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

(function () {
  'use strict';

  angular.module('janusHangouts')
    .directive('jhDroneButton', jhDroneButton);

  //jh360Button.$inject = ['RoomService'];

  function jhDroneButton() {
    return {
      restrict: 'EA',
      templateUrl: 'app/components/feed/buttons/jh-drone-button.html',
      scope: {
        feed: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: JhDroneButtonCtrl
    };

    function JhDroneButtonCtrl() {
      /* jshint: validthis */
      var vm = this;
      vm.toggle = toggle;
      vm.showsEnable =showsEnable;
      vm.showsDisable = showsDisable;

      function toggle() {
        //RoomService.toggleChannel("video", vm.feed);
        var type = vm.feed.getVideoType() === 'drone' ? 'normal' : 'drone';
        vm.feed.setVideoType(type);
      }

      function showsEnable() {
        return (vm.feed && vm.feed.getVideoType() === 'drone');
      }

      function showsDisable() {
        return (vm.feed && vm.feed.getVideoType() !== 'drone');
      }
    }
  }
})();
