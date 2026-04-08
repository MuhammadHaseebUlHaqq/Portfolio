import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Sparkles } from '@react-three/drei'

function AvatarModel() {
  const groupRef = useRef()
  const { scene, animations } = useGLTF('/models/my-avatar.glb')
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    const actionNames = Object.keys(actions)
    if (actionNames.length > 0) {
      actions[actionNames[0]]?.reset().fadeIn(0.5).play()
    }
    return () => {
      actionNames.forEach((name) => actions[name]?.fadeOut(0.5))
    }
  }, [actions])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006
    }
  })

  return (
    <group ref={groupRef} position={[0, -1.6, 0]} scale={1.7}>
      <primitive object={scene} />
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef()
  const count = 40

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 1.2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 0.2
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.04
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#adff72"
        size={0.035}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

export default function Avatar3D() {
  return (
    <div className="avatar3d-container">
      <Canvas
        camera={{ position: [0, 0.3, 4.9], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-2, 1, -1]} intensity={0.5} color="#adff72" />
        <pointLight position={[2, -1, 2]} intensity={0.4} color="#00e63a" />
        <AvatarModel />
        <FloatingParticles />
        <Sparkles
          count={30}
          scale={4}
          size={1.2}
          speed={0.3}
          color="#adff72"
          opacity={0.4}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/my-avatar.glb')
