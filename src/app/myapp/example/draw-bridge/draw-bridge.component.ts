import {Component, OnInit, ViewChild} from "@angular/core";
import {SceneComponent} from "../../component/scene/scene.component";
import * as THREE from "three";
import {Vector3} from "three";

@Component({
  selector: 'app-draw-bridge',
  templateUrl: './draw-bridge.component.html',
  styleUrls: ['./draw-bridge.component.css']
})
export class DrawBridgeComponent implements OnInit {

  constructor() {
  }

  vertices: Array<Array<Vector3>> = [
    [
      new THREE.Vector3(-30, 20, 0),
      new THREE.Vector3(-20, 20, 10),
      new THREE.Vector3(-7, 20, 10),
      new THREE.Vector3(6, 20, 10),
      new THREE.Vector3(20, 20, 10),
      new THREE.Vector3(30, 20, 0),
      new THREE.Vector3(-30, 10, 0),
      new THREE.Vector3(-20, 10, 10),
      new THREE.Vector3(-7, 10, 10),
      new THREE.Vector3(6, 10, 10),
      new THREE.Vector3(20, 10, 10),
      new THREE.Vector3(30, 10, 0),
    ],
    [
      new THREE.Vector3(-30, 20, 0),
      new THREE.Vector3(-20, 20, 10),
      new THREE.Vector3(-7, 20, 8),
      new THREE.Vector3(6, 20, 10),
      new THREE.Vector3(20, 20, 10),
      new THREE.Vector3(30, 20, 0),
      new THREE.Vector3(-30, 10, 0),
      new THREE.Vector3(-20, 10, 10),
      new THREE.Vector3(-7, 10, 8),
      new THREE.Vector3(6, 10, 10),
      new THREE.Vector3(20, 10, 10),
      new THREE.Vector3(30, 10, 0),
    ],
    [
      new THREE.Vector3(-30, 20, 0),
      new THREE.Vector3(-20, 20, 10),
      new THREE.Vector3(-7, 20, 10),
      new THREE.Vector3(6, 20, 12),
      new THREE.Vector3(20, 20, 10),
      new THREE.Vector3(30, 20, 0),
      new THREE.Vector3(-30, 10, 0),
      new THREE.Vector3(-20, 10, 10),
      new THREE.Vector3(-7, 10, 10),
      new THREE.Vector3(6, 10, 12),
      new THREE.Vector3(20, 10, 10),
      new THREE.Vector3(30, 10, 0),
    ]
  ];

  rectMesh;
  geometry;

  @ViewChild(SceneComponent)
  scene: SceneComponent;

  ngOnInit() {
    this.geometry = new THREE.Geometry();
    // this.geometry.verticesNeedUpdate = true;
    // this.geometry.elementsNeedUpdate = true;

    this.geometry.vertices = this.vertices[0];

    this.geometry.faces.push(new THREE.Face3(1, 0, 6));
    this.geometry.faces.push(new THREE.Face3(1, 6, 7));
    this.geometry.faces.push(new THREE.Face3(2, 1, 7));
    this.geometry.faces.push(new THREE.Face3(2, 7, 8));
    this.geometry.faces.push(new THREE.Face3(3, 2, 8));
    this.geometry.faces.push(new THREE.Face3(3, 8, 9));
    this.geometry.faces.push(new THREE.Face3(4, 3, 9));
    this.geometry.faces.push(new THREE.Face3(4, 9, 10));
    this.geometry.faces.push(new THREE.Face3(5, 4, 10));
    this.geometry.faces.push(new THREE.Face3(5, 10, 11));
    this.geometry.computeBoundingSphere();

    for (let i = 1; i < this.vertices.length; i++) {
      this.geometry.morphTargets.push({name: "target" + i, vertices: this.vertices[i]});
    }

    let material = new THREE.MeshBasicMaterial({color: 0x00ff00, morphTargets: true});
    // let material = new THREE.MeshLambertMaterial({color: 0xff0000, morphTargets: true});
    material.side = THREE.DoubleSide;

    this.rectMesh = new THREE.Mesh(this.geometry, material);

  }

  ngAfterViewInit(): void {
    let weight = 0; // morph权重
    let clock = new THREE.Clock();
    let ratio: number = 10; // 变形频率
    let amplitude: number = 2; // 变形幅度

    let animate = () => {
      requestAnimationFrame(animate);

      weight = Math.sin(clock.getElapsedTime() * ratio) * amplitude;

      for (let i = 0; i < this.vertices.length - 1; i++) {
        this.rectMesh.morphTargetInfluences[i] = weight;
      }

      this.scene.render();
    };

    animate();
  }

}
