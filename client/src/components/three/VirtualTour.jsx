import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import "./virtualTour.scss";

function Sphere({ imageUrl }) {
    const texture = useLoader(THREE.TextureLoader, imageUrl);
    return (
        <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}

export default function VirtualTour({ imageUrl }) {
    return (
        <div className="virtual-tour-container">
            <div className="tour-overlay">
                <div className="icon-spin"></div>
                <span>360° Virtual Tour</span>
            </div>
            <Canvas camera={{ position: [0, 0, 0.1] }}>
                <Suspense fallback={null}>
                    <Sphere imageUrl={imageUrl} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                        enableDamping={true}
                        dampingFactor={0.05}
                        rotateSpeed={-0.5}
                    />
                    {/* <Preload all /> */}
                </Suspense>
            </Canvas>
        </div>
    );
}
