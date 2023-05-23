import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        
        //Folder for bird parameters
        var birdFolder = this.gui.addFolder('Bird Parameters');
        birdFolder.add(this.scene.bird, 'scaleFactor', 0.5, 3).name('Scale Factor');
        birdFolder.add(this.scene.bird, 'speedFactor', 0.1, 3).name('Speed Factor');

        var sceneFolder = this.gui.addFolder('Scene Parameters');
        sceneFolder.add(this.scene, 'numTreePatches', 1, 25)
                   .name('Tree Patches')
                   .step(1)
                   .onFinishChange(this.scene.initTrees.bind(this.scene));

        sceneFolder.add(this.scene, 'numEggs', 4, 10)
                   .name('Egg Amount')
                   .step(1)
                   .onFinishChange(this.scene.initEggs.bind(this.scene));
        
        this.initKeys();
        
        return true;
    }

    initKeys(){
        this.scene.gui=this;
        this.processKeyboard = function(){};
        this.activeKeys={};
    }

    processKeyDown(event){
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event){
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode){
        return this.activeKeys[keyCode] || false;
    }

}