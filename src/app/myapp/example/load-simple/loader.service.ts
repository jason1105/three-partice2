/**
 * Created by lv-wei on 2018-03-12.
 */
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import * as THREE from "three";

@Injectable()
export class ThreeLoaderService {

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

  addToScene(geometry, materials, scene, mixer) {

    // var material = materials[0];
    // material.morphTargets = true;
    // material.color.setHex(0xffaaaa);

    // let geometry = new THREE.BoxGeometry(2, 2, 2);
    let material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors,
      morphTargets: true,
      transparent: true
    });

    material = materials[0];
    material['morphTargets'] = true;

    // Use custom material
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);
    //object.matrixAutoUpdate = false;
    //object.updateMatrix();

    scene.add(mesh);
    mixer.clipAction(geometry.animations[0], mesh)
      .setDuration(1)
      .startAt(-Math.random())
      .play();

  }
}
