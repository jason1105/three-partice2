import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {

  constructor() { }

  @ViewChild("content")
  container: ElementRef;

  ngOnInit() {
    // Our Javascript will go here.
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(renderer.domElement);


    var geometry = new THREE.Geometry();

    geometry.vertices.push(
      new THREE.Vector3( -10,  10, 0 ),
      new THREE.Vector3( -10, -10, 0 ),
      new THREE.Vector3(  10, -10, 0 )
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

    geometry.computeBoundingSphere();

    var rectMesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;

    scene.add( rectMesh );

    camera.position.z = 5;

    let render = function () {
      requestAnimationFrame(render);

      renderer.render(scene, camera);
    };

    render();
  }

}
