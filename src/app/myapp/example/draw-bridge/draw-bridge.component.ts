import {Component, OnInit, ViewChild} from "@angular/core";
import {SceneComponent} from "../../component/scene/scene.component";
import * as THREE from "three";

@Component({
  selector: 'app-draw-bridge',
  templateUrl: './draw-bridge.component.html',
  styleUrls: ['./draw-bridge.component.css']
})
export class DrawBridgeComponent implements OnInit {


  constructor() {
  }

  rectMesh;

  @ViewChild(SceneComponent)
  scene: SceneComponent;

  ngOnInit() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(-30, 20, 0),
      new THREE.Vector3(-30, 10, 0),
      new THREE.Vector3(-20, 20, 10),
      new THREE.Vector3(-20, 10, 10),
      new THREE.Vector3(20, 20, 10),
      new THREE.Vector3(20, 10, 10),
      new THREE.Vector3(30, 20, 0),
      new THREE.Vector3(30, 10, 0),
    );
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(1, 3, 2));
    geometry.faces.push(new THREE.Face3(2, 3, 4));
    geometry.faces.push(new THREE.Face3(3, 5, 4));
    geometry.faces.push(new THREE.Face3(4, 5, 6));
    geometry.faces.push(new THREE.Face3(5, 7, 6));
    geometry.computeBoundingSphere();

    let material = new THREE.MeshBasicMaterial({color: 0xff0000, morphTargets: false});
    material.side = THREE.DoubleSide;

    this.rectMesh = new THREE.Mesh(geometry, material);
  }

  ngAfterViewInit(): void {
    let render = () => {
      requestAnimationFrame(render);

      // this.rectMesh.rotation.x += 0.1;
      // this.rectMesh.rotation.y += 0;

      this.scene.render();
    };

    render();
  }

}
