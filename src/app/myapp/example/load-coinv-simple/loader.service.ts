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
        //var material = materials[0];
        //var object = new THREE.Mesh(geometry, material);
        //object.position.set(0, 0, 0);
        //object.scale.set(0.01, 0.01, 0.01);

        //object.matrixAutoUpdate = false;
        //object.updateMatrix();

        // let geometry1 = new THREE.BoxGeometry(2, 2, 2);
        // let material1 = new THREE.MeshBasicMaterial({
        //   color: 0x00ff00,
        //   wireframe: false,
        //   morphTargets: true
        // });
        //
        // let cube = new THREE.Mesh(geometry1, material1);
        // this._scene.add(cube);

        //this._scene.add(object);

        //this.startRendering();
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
}
