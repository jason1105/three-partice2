import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import * as THREE from "three";
import {SceneComponent} from "../scene/scene.component";

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  cube;
  @ViewChild(SceneComponent)
  scene: SceneComponent;

  ngOnInit() {

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    this.cube = new THREE.Mesh(geometry, material);

  }

  ngAfterViewInit(): void {
    let render = () => {
      requestAnimationFrame(render);

      this.cube.rotation.x += 0.1;
      this.cube.rotation.y += 0;

      this.scene.render();
    };

    render();
  }

}
