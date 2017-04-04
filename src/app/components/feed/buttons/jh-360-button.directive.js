/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

(function () {
  'use strict';

  angular.module('janusHangouts')
    .directive('jh360Button', jh360Button);

  //jh360Button.$inject = ['RoomService'];

  function jh360Button() {
    return {
      restrict: 'EA',
      templateUrl: 'app/components/feed/buttons/jh-360-button.html',
      scope: {
        feed: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: Jh360ButtonCtrl
    };

    function Jh360ButtonCtrl() {
      /* jshint: validthis */
      var vm = this;
      vm.toggle = toggle;
      vm.showsEnable =showsEnable;
      vm.showsDisable = showsDisable;

      function toggle() {
        //RoomService.toggleChannel("video", vm.feed);
        vm.feed.setVideo360(!vm.feed.getVideo360());
      }

      function showsEnable() {
        return (vm.feed && vm.feed.getVideo360());
      }

      function showsDisable() {
        return (vm.feed && !vm.feed.getVideo360());
      }
    }
  }
})();
