import {Component, OnInit, ViewChild, OnDestroy} from "@angular/core";
import {SceneComponent} from "../../component/scene/scene.component";
import * as THREE from "three";
import {Vector3} from "three";

@Component({
  selector: 'app-draw-bridge',
  templateUrl: './draw-bridge.component.html',
  styleUrls: ['./draw-bridge.component.css']
})
export class DrawBridgeComponent implements OnInit, OnDestroy {

  constructor() {
  }

  _vertices: Array<Array<Vector3>> = [
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
  freq: number = 5; // 变形频率
  amplitude: number = 5; // 变幸福度
  gui: any;
  baseColor = new THREE.Color(0x00ff00);


  params = {
    Freq: 5,
    Amplitude: 2,
    motion: true,
  };

  @ViewChild(SceneComponent)
  scene: SceneComponent;

  ngOnInit() {
    this.geometry = new THREE.Geometry();
    this.geometry.verticesNeedUpdate = true;
    this.geometry.elementsNeedUpdate = true;
    // this.geometry.colorsNeedUpdate = true;
    // this.geometry.uvsNeedUpdate = true;

    this.geometry.vertices = this._vertices[0];

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

    for (let i = 0; i < this.geometry.faces.length; i++) {
      let face = this.geometry.faces[i];
      this.geometry.faces[i].vertexColors = [this.baseColor.clone(), this.baseColor.clone(), this.baseColor.clone()];
    }

    this.geometry.computeBoundingSphere();

    for (let i = 1; i < this._vertices.length; i++) {
      this.geometry.morphTargets.push({name: "target" + i, vertices: this._vertices[i]});
    }

    // let material = new THREE.MeshBasicMaterial({color: 0x00ff00, morphTargets: true});
    let material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors,
      morphTargets: true,
      transparent: true
    });
    // let material = new THREE.MeshLambertMaterial({color: 0xff0000, morphTargets: true});
    material.side = THREE.DoubleSide;

    this.rectMesh = new THREE.Mesh(this.geometry, material);
    this.initPanel();
  }

  destroyPanel() {
    this.gui.destroy();
  }

  initPanel() {

    this.gui = new dat.GUI();
    this.gui.add(this.params, 'motion');

    var folder = this.gui.addFolder('Morph Targets');

    folder.add(this.params, 'Freq', 2, 10)
      .step(0.01)
      .onChange((value) => {
        this.freq = value;
      });

    folder.add(this.params, 'Amplitude', 1, 5)
      .step(0.01)
      .onChange((value) => {
        this.amplitude = value
      });

    folder.open();
  }

  getMorphed(mesh, geometry, index) {
    var morphTargets = mesh.geometry.morphTargets;
    var morphInfluences = mesh.morphTargetInfluences;

    var vA = new THREE.Vector3();
    var tempA = new THREE.Vector3();

    var fvA = geometry.vertices[index]; // the vertex to transform

    for (var t = 0, tl = morphTargets.length; t < tl; t++) {

      var influence = morphInfluences[t];

      if (influence === 0) continue;

      var targets = morphTargets[t].vertices;

      vA.addScaledVector(tempA.subVectors(targets[index], fvA), influence); // targets index must match vertex index


    }

    vA.add(fvA); // the transformed value

    return vA;
  }

  calculate(clock) {
    let weight = Math.sin(clock.getElapsedTime() * this.freq) * this.amplitude;; // morph权重
    let faceIndices = ['a', 'b', 'c'];

    for (let i = 0; i < this._vertices.length - 1; i++) {
      this.rectMesh.morphTargetInfluences[i] = weight;
    }

    for (let i = 0; i < this.geometry.faces.length; i++) {
      let face = this.geometry.faces[i];

      for (let j = 0; j < 3; j++) {
        let vector = this.geometry.vertices[face[faceIndices[j]]];
        let updatedVec = this.getMorphed(this.rectMesh, this.geometry, face[faceIndices[j]]);


        let xx = Math.round((updatedVec.x - vector.x) / 2);
        let yy = Math.round((updatedVec.y - vector.y) / 2);
        let zz = Math.round((updatedVec.z - vector.z) / 2);
        let ii = xx + yy + zz;

        let dir = 1;
        if ((0 > xx) || (0 >> yy) || (0 > zz)) dir = -1;

        if (ii !== 0) {
          let color = new THREE.Color().setHSL(this.baseColor.getHSL().h + Math.abs(Math.sin(clock.getElapsedTime() * this.freq) * 1 / 3) * dir, 1, 0.5);

          face.vertexColors[j].copy(color);
          this.geometry.colorsNeedUpdate = true;

        }
      }

    }
  }

  ngAfterViewInit(): void {

    let clock = new THREE.Clock();

    let animate = () => {
      requestAnimationFrame(animate);
      if (this.params.motion) {
        this.calculate(clock);
      }
      this.scene.render();
    };

    animate();
  }

  ngOnDestroy(): void {
    this.destroyPanel();
  }
}
