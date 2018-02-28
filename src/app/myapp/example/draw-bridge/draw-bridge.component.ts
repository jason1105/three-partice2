import {Component, OnInit, ViewChild} from "@angular/core";
import {SceneComponent} from "../../component/scene/scene.component";
import * as THREE from "three";
import {Vector3} from "three";
// import "three/examples/js/modifiers/BufferSubdivisionModifier";

@Component({
  selector: 'app-draw-bridge',
  templateUrl: './draw-bridge.component.html',
  styleUrls: ['./draw-bridge.component.css']
})
export class DrawBridgeComponent implements OnInit {

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

    let baseColor = new THREE.Color(0x00ff00);

    for (let i = 0; i < this.geometry.faces.length; i++) {
      let face = this.geometry.faces[i];
      this.geometry.faces[i].vertexColors = [baseColor.clone(), baseColor.clone(), baseColor.clone()];
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
    // this.rectMesh.colorsNeedUpdate = true;

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

  ngAfterViewInit(): void {
    let weight = 0; // morph权重
    let clock = new THREE.Clock();
    let ratio: number = 5; // 变形频率
    let amplitude: number = 2; // 变形幅度
    let faceIndices = ['a', 'b', 'c'];

    let animate = () => {
      requestAnimationFrame(animate);

      weight = Math.sin(clock.getElapsedTime() * ratio) * amplitude;


      for (let i = 0; i < this._vertices.length - 1; i++) {
        this.rectMesh.morphTargetInfluences[i] = weight;
      }


      for (let i = 0; i < this.geometry.faces.length; i++) {
        let face = this.geometry.faces[i];


        for (let j = 0; j < 3; j++) {
          let vector = this.geometry.vertices[face[faceIndices[j]]];
          let updatedVec = this.getMorphed(this.rectMesh, this.geometry, face[faceIndices[j]]);

          let dcolor = new THREE.Color(0x00ff00);

          let xx = Math.round((updatedVec.x - vector.x) / 2);
          let yy = Math.round((updatedVec.y - vector.y) / 2);
          let zz = Math.round((updatedVec.z - vector.z) / 2);
          let ii = xx + yy + zz;

          let dir = 1;
          if ((0 > xx) || (0 >> yy) || (0 > zz)) dir = -1;

          if (ii !== 0) {
            dcolor.setHSL(dcolor.getHSL().h + Math.abs(Math.sin(clock.getElapsedTime() * ratio) * 1 / 3) * dir, 1, 0.5);

            face.vertexColors[j].copy(dcolor);
            // console.log(face.vertexColors[j]);
            this.geometry.colorsNeedUpdate = true;

          }
        }

      }

      this.scene.render();
    };

    animate();
  }

}
