import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, HostListener} from '@angular/core';
import {SceneComponent} from "../../component/scene/scene.component";
import * as THREE from "three";
import {ThreeLoaderService} from "./loader.service";

@Component({
  selector: 'app-load-coinv-simple',
  templateUrl: './load-coinv-simple.component.html',
  styleUrls: ['./load-coinv-simple.component.css']
})
export class LoadCoinvSimpleComponent implements OnInit, AfterViewInit {

  private renderer: THREE.WebGLRenderer;
  // private camera: THREE.PerspectiveCamera;
  private camera: THREE.OrthographicCamera;

  private cameraTarget: THREE.Vector3;
  public _scene: THREE.Scene;

  public fieldOfView: number = 60;
  public nearClippingPane: number = 1;
  public farClippingPane: number = 1100;

  public controls: THREE.OrbitControls;

  mixer: THREE.AnimationMixer;
  clock: THREE.Clock;

  _object;
  url = "assets/scene/monster.json";

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  @Input()
  set object(object) {
    this._object = object;
  }

  @Input()
  set scene(scene) {
    this._scene = scene;
    this.createScene();
  }

  constructor(private loader: ThreeLoaderService) {
    this.render = this.render.bind(this);
    this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private init() {
    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.autoClear = true;
  }

  private createScene() {

    if (!this._scene) {
      this._scene = new THREE.Scene();
    }
    this._scene.add(new THREE.AxisHelper(200));
    this.mixer = new THREE.AnimationMixer(this._scene);

    //var loader = new THREE.ColladaLoader();
    //loader.load('assets/model/multimaterial.dae', this.onModelLoadingCompleted);
  }

  private onModelLoadingCompleted(collada) {
    var modelScene = collada.scene;
    this._scene.add(modelScene);
    this.render();
  }

  private createLight() {
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, 100);
    this._scene.add(light);

    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, -100);
    this._scene.add(light);
  }

  private createCamera() {
    let aspectRatio = this.getAspectRatio();
    // this.camera = new THREE.PerspectiveCamera(
    //   this.fieldOfView,
    //   aspectRatio,
    //   this.nearClippingPane,
    //   this.farClippingPane
    // );

    var frustumSize = 100
    var aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      200
    );

    // Set position and look at
    this.camera.position.x = -20;
    this.camera.position.y = 150;
    this.camera.position.z = 100;
  }

  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRendering() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.autoClear = true;

    // let component: LoadCoinvSimpleComponent = this;
    //
    // (function render() {
    //   //requestAnimationFrame(render);
    //   component.render();
    // }());
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
    //stats.update();
  }

  render = () => {
    //this.renderer.render(this._scene, this.camera);
    //console.log("111" +this.object);


    var timer = Date.now() * 0.0005;
    this.camera.position.x = Math.cos(timer) * 10;
    this.camera.position.y = 4;
    this.camera.position.z = Math.sin(timer) * 10;
    this.mixer.update(this.clock.getDelta());
    this.camera.lookAt(this._scene.position);
    this.renderer.render(this._scene, this.camera);
  }

  public addControls() {
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.addEventListener('change', this.render);

  }

  /* EVENTS */

  public onMouseDown(event: MouseEvent) {
    console.log("onMouseDown");
    event.preventDefault();

    // Example of mesh selection/pick:
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, this.camera);

    var obj: THREE.Object3D[] = [];
    this.findAllObjects(obj, this._scene);
    var intersects = raycaster.intersectObjects(obj);
    console.log("Scene has " + obj.length + " objects");
    console.log(intersects.length + " intersected objects found")
    intersects.forEach((i) => {
      console.log(i.object); // do what you want to do with object
    });

  }

  private findAllObjects(pred: THREE.Object3D[], parent: THREE.Object3D) {
    // NOTE: Better to keep separate array of selected objects
    if (parent.children.length > 0) {
      parent.children.forEach((i) => {
        pred.push(i);
        this.findAllObjects(pred, i);
      });
    }
  }

  public onMouseUp(event: MouseEvent) {
    console.log("onMouseUp");
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    console.log("onResize: " + this.canvas.clientWidth + ", " + this.canvas.clientHeight);

    // this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.render();
  }

  @HostListener('document:keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    console.log("onKeyPress: " + event.key);
  }

  private addObject(object) {
    if (object) {
      this._scene.add(object);
    }
  }

  addToScene(geometry, materials) {

    var material = materials[0];
    material.morphTargets = true;
    material.color.setHex(0xffaaaa);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.scale.set(0.01, 0.01, 0.01);
    //object.matrixAutoUpdate = false;
    //object.updateMatrix();

    this._scene.add(mesh);
    this.mixer.clipAction(geometry.animations[0], mesh)
      .setDuration(1)
      .startAt(-Math.random())
      .play();

  }

  /* LIFECYCLE */
  ngAfterViewInit() {
  }

  ngOnInit(): void {
    console.log("Init scene.");
    this.init();
    this.createScene();
    this.createLight();
    this.createCamera();
    this.addControls();
    //this.addObject(this._object);
    this.loader.load(this.url).subscribe((obj: any) => {
        if (obj["geometry"]) {
          this.addToScene(obj["geometry"], obj["materials"]);

          this.animate();
        }
      },
      (err) => {
        console.log(err);
      });
  }
}
