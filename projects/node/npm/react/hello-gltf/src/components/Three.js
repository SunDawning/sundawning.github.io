import React, { Component } from 'react';
import * as THREE from 'three';

class Three extends Component {

    componentDidMount(){
        this.init(document.querySelector("#container"));
    }

    init = (container) => {
        const scene=new THREE.Scene();
        const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

        const renderer=new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        container.appendChild(renderer.domElement);

        const geometry=new THREE.BoxGeometry();
        const material=new THREE.MeshBasicMaterial({
            color:0x00ff00
        });
        const cube=new THREE.Mesh(geometry,material);
        scene.add(cube);

        camera.position.z=5;

        const animate=function(){
            requestAnimationFrame(animate);

            cube.rotation.x+=0.01;
            cube.rotation.y+=0.01;

            renderer.render(scene,camera);
        };

        animate();

    }

    componentWillUnmount(){}
    render(){
        return (
                <div
            id= "container"
            style={{
                position:"absolute",
                width:"100%",
                height:"100%"
            }}
            ref={(mount) => {
                this.mount=mount;
            }}
                />
        );
    }
}
//   ReactDOM.render(<Scene />, document.getElementById('canvas'))

export default Three;
