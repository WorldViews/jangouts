/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

(function () {
  'use strict';

  angular.module('janusHangouts')
    .directive('jhMainFeed', jhMainFeedDirective);

  jhMainFeedDirective.$inject = ['Video360Service', 'DroneService'];

  function jhMainFeedDirective(Video360Service, DroneService) {
    return {
      restrict: 'EA',
      templateUrl: 'app/components/feed/jh-main-feed.html',
      scope: {
        feed: '=',
        message: '@'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: JhMainFeedCtrl,
      link: jhMainFeedLink,
    };

    function jhMainFeedLink(scope, element) {
      scope.$watch('vm.feed.getStream()', function(newVal) {
        if (newVal !== undefined && newVal !== null) {
          var video = $('video', element)[0];
          video.muted = true;
          Janus.attachMediaStream(video, newVal);
        }
      });

      scope.$watch('vm.feed.getVideoType()', function(newVal) {
        if (newVal === '360') {
          // show 360 view
          Video360Service.createRenderer(element);
        } else {
          // hide 360 view
          Video360Service.removeRenderer(element);
        }
      });
    }

    function JhMainFeedCtrl() {
      this.up = function() {
        DroneService.up();
      };
      this.down = function() {
        DroneService.down();
      };
      this.center = function() {
        DroneService.center();
      };
    } 
  }
})();
