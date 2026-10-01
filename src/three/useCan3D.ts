import { useState } from 'react';

function detect3D() {
  try {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4 || innerWidth < 700;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return Boolean(gl) && !reduced && !weak;
  } catch {
    return false;
  }
}

export function useCan3D() {
  return useState(detect3D)[0];
}
