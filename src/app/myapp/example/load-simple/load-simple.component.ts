import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, HostListener} from '@angular/core';
import {SceneComponent} from "../../component/scene/scene.component";
import * as THREE from "three";
import {ThreeLoaderService} from "./loader.service";

/**
 * Load from JSON which created by blender
 */
@Component({
  selector: 'app-load-simple',
  templateUrl: './load-simple.component.html',
  styleUrls: ['./load-simple.component.css']
})
export class LoadSimpleComponent implements OnInit, AfterViewInit {

  private renderer: THREE.WebGLRenderer;

  // private camera: THREE.PerspectiveCamera;
  private camera: THREE.OrthographicCamera;

  private cameraTarget: THREE.Vector3;
  public scene: THREE.Scene;

  public controls: THREE.OrbitControls;

  mixer: THREE.AnimationMixer;
  clock: THREE.Clock;
  geometry: THREE.Geometry;
  mesh : THREE.Mesh;
  baseColor = new THREE.Color(0x00ff00);

  url = "assets/scene/square.json";

  @ViewChild('canvas')
  private canvasRef: ElementRef;

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

    if (!this.scene) {
      this.scene = new THREE.Scene();
    }
    this.scene.add(new THREE.AxisHelper(200));
    this.mixer = new THREE.AnimationMixer(this.scene);
  }

  private onModelLoadingCompleted(collada) {
    var modelScene = collada.scene;
    this.scene.add(modelScene);
    this.render();
  }

  private createLight() {
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, 100);
    this.scene.add(light);

    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, -100);
    this.scene.add(light);
  }

  private createCamera() {
    let aspectRatio = this.getAspectRatio();

    var frustumSize = 100
    var aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      2000
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
  }

  freq: number = 1; // 变形频率
  amplitude: number = 0.5; // 变幸福度



  animate = () => {

    requestAnimationFrame(this.animate);

    this.loader.calculate(this.clock, this.freq, this.amplitude, this.geometry, this.mesh, this.baseColor);
    this.render();
    //stats.update();
  }

  render = () => {

    var timer = Date.now() * 0.0005;
    // this.camera.position.x = Math.cos(timer) * 100;
    // this.camera.position.y = 4;
    // this.camera.position.z = Math.sin(timer) * 100;
    this.mixer.update(this.clock.getDelta());
    // this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
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
    this.findAllObjects(obj, this.scene);
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

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.render();
  }

  @HostListener('document:keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    console.log("onKeyPress: " + event.key);
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
    this.loader.load(this.url)
      .subscribe(
        (obj: any) => {
          if (obj["geometry"]) {
            this.geometry = obj["geometry"];
            this.mesh = this.loader.addToScene(obj["geometry"], obj["materials"], this.scene, this.mixer);
            this.animate();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
