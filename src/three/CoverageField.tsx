import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const COLS = 30;
const ROWS = 18;
const COUNT = COLS * ROWS;
const STEP = 0.62;
const PASS = new THREE.Color('#c8f03a');
const FAIL = new THREE.Color('#ff4d2e');
const IDLE = new THREE.Color('#2b2d24');

function Field() {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const hit = useRef(new THREE.Vector3(999, 0, 999));
  const dummy = useRef(new THREE.Object3D());
  const col = useRef(new THREE.Color());
  const heal = useRef(new Float32Array(COUNT));
  const { camera } = useThree();

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const scroll = window.scrollY;
    const healArr = heal.current;
    const tint = col.current;
    const object = dummy.current;
    camera.position.set(0, 7 + scroll * 0.004, 9 + scroll * 0.002);
    camera.lookAt(0, 0, 0);

    for (let i = 0; i < COUNT; i++) {
      const cx = (i % COLS) - COLS / 2;
      const cz = Math.floor(i / COLS) - ROWS / 2;
      const x = cx * STEP;
      const z = cz * STEP;
      const reveal = THREE.MathUtils.clamp((t * 6 - Math.hypot(cx, cz)) / 5, 0, 1);

      if (Math.hypot(x - hit.current.x, z - hit.current.z) < 1.5) {
        healArr[i] = 1.2;
      }
      healArr[i] = Math.max(0, healArr[i] - dt);
      const f = Math.min(1, healArr[i] * 2);

      tint.copy(IDLE).lerp(PASS, reveal).lerp(FAIL, f);
      mesh.current.setColorAt(i, tint);

      object.position.set(x, 0, z);
      object.scale.set(0.5, 0.06 + reveal * 0.08 + f * 0.45, 0.5);
      object.position.y = object.scale.y / 2;
      object.updateMatrix();
      mesh.current.setMatrixAt(i, object.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.65} metalness={0.05} />
      </instancedMesh>

      <mesh
        rotation-x={-Math.PI / 2}
        onPointerMove={(e) => hit.current.copy(e.point)}
        onPointerOut={() => hit.current.set(999, 0, 999)}
      >
        <planeGeometry args={[40, 30]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}

export function StaticField({ className = '' }: { className?: string }) {
  const cells = Array.from({ length: 30 * 18 }, (_, i) => {
    const x = (i % 30) * 16;
    const y = Math.floor(i / 30) * 16;
    const pass = (i % 7) !== 0 && i % 13 !== 0;
    const warn = i % 19 === 0;
    const fail = i % 29 === 0;
    const fill = fail ? 'cell--fail' : warn ? 'cell--warn' : pass ? 'cell--pass' : 'cell--idle';
    return { x, y, fill };
  });

  return (
    <svg className={`project-cover ${className}`} viewBox="0 0 480 288" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {cells.map((cell, index) => (
        <rect key={index} x={cell.x} y={cell.y} width={12} height={12} rx="1" className={`cell ${cell.fill}`} />
      ))}
    </svg>
  );
}

export function CoverageField({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 7, 9], fov: 40 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
      className="coverage-canvas"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <Field />
    </Canvas>
  );
}
