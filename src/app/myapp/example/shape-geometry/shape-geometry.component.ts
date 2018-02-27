import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-shape-geometry',
  templateUrl: './shape-geometry.component.html',
  styleUrls: ['./shape-geometry.component.css']
})
export class ShapeGeometryComponent implements OnInit {

  constructor() {
  }

  @ViewChild("content")
  container: ElementRef;

  ngOnInit() {
    // Our Javascript will go here.
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(renderer.domElement);


    var rectLength = 120, rectWidth = 40;

    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo( 0, rectWidth );
    rectShape.lineTo( rectLength, rectWidth );
    rectShape.lineTo( rectLength, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;

    scene.add( rectMesh );

    camera.position.z = 5;

    let render = function () {
      requestAnimationFrame(render);
      rectMesh.rotation.x += 0.01;
      rectMesh.rotation.y += 0;

      renderer.render(scene, camera);
    };

    render();

  }

}
