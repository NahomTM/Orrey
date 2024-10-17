/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 jupiter.gltf 
Author: Recourse Design ltd. (https://sketchfab.com/RecourseDesign)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/jupiter-cba3c91c3b2e470191e28f59b364e7ab
Title: Jupiter
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/jupiter.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Earth_Planet_0.geometry} material={materials.Planet} />
    </group>
  )
}

useGLTF.preload('/jupiter.gltf')
