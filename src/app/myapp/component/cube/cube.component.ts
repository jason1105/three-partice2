import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit {

  constructor() {
  }

  @ViewChild("content")
  container: ElementRef;

  ngOnInit() {
    // Our Javascript will go here.
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.5, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    let render = function () {
      requestAnimationFrame(render);

      cube.rotation.x += 0;
      cube.rotation.y += 0;

      renderer.render(scene, camera);
    };

    render();
  }

}
