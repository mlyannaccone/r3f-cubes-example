import './App.scss';
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { useCubeTexture, MeshDistortMaterial, Stars, Sky, softShadows, MeshWobbleMaterial, OrbitControls } from 'drei'
import { useSpring, a } from 'react-spring/three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import grassTop from './assets/textures/mc-textures/grass-top.png'
import grassBottom from './assets/textures/mc-textures/grass-bottom.png'
import grassSide from './assets/textures/mc-textures/grass-side.png'

softShadows()

const SpinningMesh = ({position, color, speed}) => {
  // const grassSideTexture = useLoader(TextureLoader, grassSide);
  // const grassTopTexture = useLoader(TextureLoader, './assets/textures/mc-textures/grass-top.png');
  // const grassBottomTexture = useLoader(TextureLoader, grassBottom);
  // const grassTexture = useCubeTexture(['./assets/textures/mc-textures/grass-side.png', './assets/textures/mc-textures/grass-side.png', './assets/textures/mc-textures/grass-side.png', './assets/textures/mc-textures/grass-side.png', './assets/textures/mc-textures/grass-side.png', './assets/textures/mc-textures/grass-side.png'], { path: 'cube/' })
  // const grassTexture = useLoader(TextureLoader, grassTop)

  const mesh = useRef(null)
  useFrame(() => mesh.current.rotation.x = mesh.current.rotation.y += 0.01)
  const [expand, setExpand] = useState(false)
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1]
  })

  return (
    <a.mesh 
      onPointerOver={() => setExpand(true)}
      onPointerOut={() => setExpand(false)}
      castShadow
      position={position}
      ref={mesh} 
      scale={props.scale}
    >
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <MeshWobbleMaterial 
        attach='material' 
        color={color} 
        speed={speed} 
        factor={.5}
        />
        {/* <meshStandardMaterial
        attach='material'
        map={grassTexture}
        roughness={1}
        metalness={0} */}
    />
    </a.mesh>
  )
}

function App() {
  return (
    <>
      <Canvas shadowMap colorManagement camera={{ position: [-5,2,10], fov: 60}}>
        <ambientLight intensity={.2} />
        <directionalLight
          castShadow
          position={[0,10,0]}
          intensity={.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={.5}/>
        <pointLight position={[0, -10 , 0]} intensity={.5}/>

      <group>
        <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[0,-5,0]}>
          <planeBufferGeometry
            attach='geometry'
            args={[100,100]} />
          <shadowMaterial opacity={.3} attach='material'/>
          {/* <meshStandardMaterial color='red'  attach='material'/> */}
        </mesh>

        <SpinningMesh position={[0,1,0]} color='lightblue' speed={6}/>
        <SpinningMesh position={[-2,1,-5]} color='pink' speed={6}/>
        <SpinningMesh position={[5,1,-2]} color='pink' speed={6}/>
      </group>

      <Sky />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App
