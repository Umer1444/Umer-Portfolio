"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

// Floating geometric shapes
function FloatingGeometry() {
  const meshRef = useRef<THREE.Group>(null!)
  const { viewport } = useThree()

  const geometries = useMemo(() => {
    const shapes = []
    for (let i = 0; i < 15; i++) {
      shapes.push({
        position: [
          (Math.random() - 0.5) * viewport.width * 2,
          (Math.random() - 0.5) * viewport.height * 2,
          (Math.random() - 0.5) * 20,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.5 + Math.random() * 1.5,
        type: Math.floor(Math.random() * 3), // 0: box, 1: sphere, 2: octahedron
      })
    }
    return shapes
  }, [viewport])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
      meshRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.1 + i * 0.01)
        child.rotation.z = state.clock.elapsedTime * (0.05 + i * 0.005)
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001
      })
    }
  })

  return (
    <group ref={meshRef}>
      {geometries.map((geo, i) => (
        <mesh key={i} position={geo.position as [number, number, number]} scale={geo.scale}>
          {geo.type === 0 && <boxGeometry args={[1, 1, 1]} />}
          {geo.type === 1 && <sphereGeometry args={[0.5, 16, 16]} />}
          {geo.type === 2 && <octahedronGeometry args={[0.7]} />}
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.7, 0.3)}
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

// Enhanced particle system
function EnhancedStars() {
  const ref = useRef<THREE.Points>(null!)
  const { viewport } = useThree()

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    const colors = new Float32Array(3000 * 3)
    const sizes = new Float32Array(3000)

    for (let i = 0; i < 3000; i++) {
      // Create layered depth
      const depth = Math.random()
      const radius = (1 - depth) * viewport.width * 3

      positions[i * 3] = (Math.random() - 0.5) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 3
      positions[i * 3 + 2] = -depth * 50

      // Color gradient from purple to blue to cyan
      const hue = 0.7 + Math.random() * 0.3
      const saturation = 0.8 + Math.random() * 0.2
      const lightness = 0.3 + depth * 0.7

      const color = new THREE.Color().setHSL(hue, saturation, lightness)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = (1 - depth) * 3 + Math.random() * 2
    }

    return [positions, colors, sizes]
  }, [viewport])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
      ref.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} sizes={sizes} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Nebula-like background
function NebulaBackground() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -30]} scale={[50, 50, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        transparent
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;
            float noise = sin(uv.x * 10.0 + time * 0.5) * sin(uv.y * 8.0 + time * 0.3) * 0.1;
            vec3 color1 = vec3(0.2, 0.1, 0.4);
            vec3 color2 = vec3(0.1, 0.2, 0.6);
            vec3 finalColor = mix(color1, color2, uv.y + noise);
            gl_FragColor = vec4(finalColor, 0.3);
          }
        `}
      />
    </mesh>
  )
}

export default function EnhancedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <NebulaBackground />
        <EnhancedStars />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
