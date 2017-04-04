(function () {
  'use strict';

  angular.module('janusHangouts')
    .service('Video360Service', Video360Service);

  /**
   * Service to create 360 videos
   * @constructor
   * @memberof module:janusHangouts
   */
  function Video360Service() {
    this.createRenderer = createRenderer;
    this.removeRenderer = removeRenderer;

    function createRenderer(element) {
      var renderer = new Video360Renderer(element);
      $(element).data('360renderer', renderer);
    }

    function removeRenderer(element) {
      var r = $(element).data('360renderer');
      if (r) {
          r.remove();
      }
      $(element).data('360renderer', null);
    }

    function Video360Renderer(element) {
        var video = $('video', element)[0];
        var width = $(video).width();
        var height = $(video).height();
        var animationId = 0;
        var camera = new THREE.PerspectiveCamera( 75, width/height, 1, 1100 );
        camera.target = new THREE.Vector3( 0, 0, 0 );
        camera.position.z = 1;

        var geometry = new THREE.SphereGeometry( 500, 60, 40 );
        geometry.scale( - 1, 1, 1 );

        var videoTexture = new THREE.VideoTexture( video );
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        var material = new THREE.MeshBasicMaterial( {
            map: videoTexture, overdraw: true
        });

        var mesh = new THREE.Mesh( geometry, material );

        var scene = new THREE.Scene();
        scene.add( mesh );

        var renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( width, height );
        element.append(renderer.domElement);
        $(renderer.domElement).width(width).height(height);

        // renderer
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        function animate() {
            animationId = requestAnimationFrame(animate);
            controls.update();
            render();
        }        
        function render() {
            renderer.render(scene, camera);
        }
        controls.addEventListener('change', render);
        animate();

        // resize handler
        function onResize() {
            var w = $(this).width();
            var h = $(this).height();
            camera.aspect = w/h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        $(renderer.domElement).on('resize', onResize);

        this.remove = function() {
            cancelAnimationFrame(animationId);
            $(video).show();
            $(renderer.domElement).remove();
        };

        $(video).hide();
    }
    
  }

}());
