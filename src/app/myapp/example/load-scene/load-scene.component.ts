import {Component, OnInit, ViewChild} from "@angular/core";
import {SceneComponent} from "../../component/scene/scene.component";

import * as THREE from "three";

@Component({
  selector: 'app-load-scene',
  templateUrl: './load-scene.component.html',
  styleUrls: ['./load-scene.component.css']
})
export class LoadSceneComponent implements OnInit {


  scene;
  clock = new THREE.Clock();
  mixer: THREE.AnimationMixer;

  @ViewChild(SceneComponent)
  sceneCmp: SceneComponent;

  url = "assets/scene/scene.json";

  constructor() {
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  }

  render() {
    var delta = 1 * this.clock.getDelta();
    this.mixer.update(delta);
    this.sceneCmp.render();
  }

  ngOnInit() {

    new THREE.ObjectLoader().load(this.url, (loadedScene) => {
        this.scene = loadedScene;
        console.log('Scene loaded');
        this.scene.background = new THREE.Color(0xffffff);

        var geometry = new THREE.PlaneBufferGeometry(20000, 20000);
        var material = new THREE.MeshPhongMaterial({shininess: 0.1});
        var ground = new THREE.Mesh(geometry, material);
        ground.position.set(0, -250, 0);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);
        this.scene.fog = new THREE.Fog(0xffffff, 1000, 10000);
        // Initialization of the loaded animations
        var animationClip = this.scene.animations[0];
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.mixer.clipAction(animationClip).play();

        this.animate();
      },

      // onProgress callback
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      // onError callback
      function (err) {
        console.error('An error happened');
      });

  }

}
