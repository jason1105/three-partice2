import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import * as THREE from "three";
import {SceneComponent} from "../../component/scene/scene.component";

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  cube;
  @ViewChild(SceneComponent)
  scene: SceneComponent;

  ngOnInit() {

    let geometry = new THREE.BoxGeometry(2, 2, 2);
    let material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false,
      morphTargets: true
    });

    for ( var i = 0; i < 8; i ++ ) {
      var vertices = [];
      for ( var v = 0; v < 1; v ++ ) {
        vertices.push( geometry.vertices[ v ].clone() );
        if ( v === i ) {
          vertices[ vertices.length - 1 ].x *= 2;
          vertices[ vertices.length - 1 ].y *= 2;
          vertices[ vertices.length - 1 ].z *= 2;
        }
      }
      geometry.morphTargets.push( { name: "target" + i, vertices: vertices } );
    }

    this.cube = new THREE.Mesh(geometry, material);

  }

  ngAfterViewInit(): void {
    let j = 0;
    let render = () => {
      requestAnimationFrame(render);

      //this.cube.rotation.x += 0.1;
      //this.cube.rotation.y += 0;

      for (let i = 0; i < 8; i++) {
        this.cube.morphTargetInfluences[i] = Math.sin(j++/100) * 1;
      }

      this.scene.render();
    };

    render();
  }

}
