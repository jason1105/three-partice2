/**
 * Created by lv-wei on 2018-03-12.
 */
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import * as THREE from "three";

@Injectable()
export class ThreeLoaderService {

  loadCoinv(url): Observable<any> {

    let subject = new Subject<any>();

    // Async request coinv modal data
    // Parse data to mesh

    return subject.asObservable();
  }

  load(url): Observable<any> {

    let subject = new Subject<any>();

    let loader = new THREE.JSONLoader();

    loader.load(
      url,

      // onLoad callback
      (geometry, materials) => {

        subject.next({"geometry": geometry, "materials": materials});
        subject.complete();
      },

      // onProgress callback
      function (xhr) {
        subject.next({"message": (xhr.loaded / xhr.total * 100) + '% loaded'});
      },

      // onError callback
      function (err) {
        console.log('An error happened');
        subject.next({"message": 'An error happened. ' + err});
      }
    );

    return subject.asObservable();
  }

  parseToMesh(geometry, materials) {

    // var material = materials[0];
    // material.morphTargets = true;
    // material.color.setHex(0xffaaaa);

    // let geometry = new THREE.BoxGeometry(2, 2, 2);
    let material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors,
      morphTargets: true,
      transparent: true
    });

    //material = materials[0];
    //material['morphTargets'] = true;

    // Use custom material
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);
    //object.matrixAutoUpdate = false;
    //object.updateMatrix();

    // mixer.clipAction(geometry.animations[0], mesh)
    //   .setDuration(1)
    //   .startAt(-Math.random())
    //   .play();

    return mesh;

  }


  getMorphed(mesh, index) {
    var morphTargets = mesh.geometry.morphTargets;
    var morphInfluences = mesh.morphTargetInfluences;

    var vA = new THREE.Vector3();
    var tempA = new THREE.Vector3();

    var fvA = mesh.geometry.vertices[index]; // the vertex to transform

    for (var t = 0, tl = morphTargets.length; t < tl; t++) {

      var influence = morphInfluences[t];

      if (influence === 0) continue;

      var targets = morphTargets[t].vertices;

      vA.addScaledVector(tempA.subVectors(targets[index], fvA), influence); // targets index must match vertex index


    }

    vA.add(fvA); // the transformed value

    return vA;
  }

  calculate(clock, freq, amplitude, geometry, mesh, baseColor) {
    let time = Math.sin(clock.elapsedTime * freq);
    let weight = time * amplitude; // morph权重
    let faceIndices = ['a', 'b', 'c'];

    for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
      mesh.morphTargetInfluences[i] =  weight;
    }

    for (let i = 0; i < geometry.faces.length; i++) {
      let face = geometry.faces[i];

      for (let j = 0; j < 3; j++) {
        let vector = geometry.vertices[face[faceIndices[j]]];
        let updatedVec = this.getMorphed(mesh, face[faceIndices[j]]);


        // let xx = Math.round((updatedVec.x - vector.x) / 2);
        // let yy = Math.round((updatedVec.y - vector.y) / 2);
        // let zz = Math.round((updatedVec.z - vector.z) / 2);

        let xx = ((updatedVec.x - vector.x) / 2);
        let yy = ((updatedVec.y - vector.y) / 2);
        let zz = ((updatedVec.z - vector.z) / 2);

        let ii = xx + yy + zz;

        let dir = 1;
        // if ((0 > xx) || (0 >> yy) || (0 > zz)) dir = -1;
        if (0 < weight) dir = -1;

        if (ii !== 0) {
          let color = new THREE.Color().setHSL(baseColor.getHSL().h + Math.abs(time * 1 / 3) * dir, 1, 0.5);

          face.vertexColors[j].copy(color);
          geometry.colorsNeedUpdate = true;

        }
      }

    }
  }
}
