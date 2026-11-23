"use client";

import React, { useEffect, useRef } from "react";

interface LiquidShaderProps {
  imageSrc?: string;
  className?: string;
}

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  varying vec2 v_uv;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_tex_resolution;
  uniform vec2 u_mouse;
  uniform vec2 u_velocity;
  uniform float u_time;
  uniform float u_intensity;

  // Emulates CSS "object-cover" math inside shader with safety margin for drift and warp
  vec2 getCoverUV(vec2 uv, vec2 screenRes, vec2 texRes) {
    float screenAspect = screenRes.x / screenRes.y;
    float texAspect = texRes.x / texRes.y;
    vec2 scale = screenAspect > texAspect 
      ? vec2(1.0, texAspect / screenAspect) 
      : vec2(screenAspect / texAspect, 1.0);
    scale *= 0.88; // Safety zoom so drifting and warping never hit borders
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = getCoverUV(v_uv, u_resolution, u_tex_resolution);

    // 1. Slow, smooth live vertical float (drifting up and down gently)
    float verticalFloat = sin(u_time * 0.5) * 0.026;
    uv.y += verticalFloat;

    // 2. Smooth ambient liquid flow
    float t = u_time * 0.35;
    vec2 p = uv * 2.8;
    float flowX = sin(p.y * 1.5 + t) * 0.006 + cos(p.x * 1.8 - t * 0.7) * 0.004;
    float flowY = cos(p.x * 1.4 + t * 0.8) * 0.006 + sin(p.y * 1.6 - t * 0.6) * 0.004;
    vec2 ambientFlow = vec2(flowX, flowY);

    // 3. Interactive Cursor Liquid Warp & Ripples (Gentle, subtle & smooth)
    vec2 cursorDisplacement = vec2(0.0);
    if (u_intensity > 0.001) {
      vec2 aspectDiff = (v_uv - u_mouse);
      aspectDiff.x *= (u_resolution.x / u_resolution.y);
      float dist = length(aspectDiff);

      float radius = 0.30;
      float influence = smoothstep(radius, 0.0, dist);

      // Gentle ripple wave + subtle velocity drag
      float mouseWave = sin(dist * 20.0 - u_time * 3.5) * influence * 0.015 * u_intensity;
      vec2 dir = normalize(aspectDiff + 0.0001);
      vec2 drag = u_velocity * influence * 0.04;

      cursorDisplacement = dir * mouseWave + drag;
    }

    // Subtle, elegant chromatic aberration
    vec2 uvR = uv + ambientFlow + cursorDisplacement * 1.015;
    vec2 uvG = uv + ambientFlow + cursorDisplacement;
    vec2 uvB = uv + ambientFlow + cursorDisplacement * 0.985;

    float r = texture2D(u_texture, uvR).r;
    float g = texture2D(u_texture, uvG).g;
    float b = texture2D(u_texture, uvB).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export default function LiquidShader({
  imageSrc = "/veil.webp",
  className = "",
}: LiquidShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: true });
    if (!gl) return;

    // Compile Shader helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Setup Fullscreen Quad Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPositionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPositionLocation);
    gl.vertexAttribPointer(aPositionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const uTextureLoc = gl.getUniformLocation(program, "u_texture");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uTexResolutionLoc = gl.getUniformLocation(program, "u_tex_resolution");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uVelocityLoc = gl.getUniformLocation(program, "u_velocity");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uIntensityLoc = gl.getUniformLocation(program, "u_intensity");

    // Texture Setup with immediate complete initialization
    const texture = gl.createTexture();
    let texWidth = 1920;
    let texHeight = 1080;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // 1x1 initial fallback pixel (prevents incomplete texture error in WebGL)
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([200, 40, 40, 255])
    );

    const uploadTexture = (img: HTMLImageElement) => {
      if (!img.naturalWidth || !img.naturalHeight) return;
      texWidth = img.naturalWidth;
      texHeight = img.naturalHeight;

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };

    const image = new Image();
    image.onload = () => uploadTexture(image);
    image.onerror = (err) => console.error("Shader image failed to load:", imageSrc, err);
    image.src = imageSrc;
    if (image.complete && image.naturalWidth > 0) {
      uploadTexture(image);
    }

    // Mouse & Inertia Tracking
    const targetMouse = { x: 0.5, y: 0.5 };
    const currentMouse = { x: 0.5, y: 0.5 };
    const velocity = { x: 0, y: 0 };
    const lastMouse = { x: 0.5, y: 0.5 };
    let intensity = 0.0;
    let targetIntensity = 0.0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Inverted Y for WebGL

      targetMouse.x = Math.max(0, Math.min(1, x));
      targetMouse.y = Math.max(0, Math.min(1, y));

      const deltaX = targetMouse.x - lastMouse.x;
      const deltaY = targetMouse.y - lastMouse.y;
      velocity.x += deltaX * 0.7;
      velocity.y += deltaY * 0.7;

      lastMouse.x = targetMouse.x;
      lastMouse.y = targetMouse.y;

      targetIntensity = Math.min(1.0, targetIntensity + Math.hypot(deltaX, deltaY) * 3.0);
    };

    const handleMouseLeave = () => {
      targetIntensity = 0.0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Responsive Canvas Resizing with guaranteed fallbacks (no DOM layout thrashing)
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const finalWidth = window.innerWidth || 1920;
      const finalHeight = window.innerHeight || 1080;

      if (canvas.width !== finalWidth * dpr || canvas.height !== finalHeight * dpr) {
        canvas.width = finalWidth * dpr;
        canvas.height = finalHeight * dpr;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Render Animation Loop with Visibility & Frame Rate Optimization
    let isVisible = true;
    let animationFrameId: number;
    let lastRenderTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS for buttery ambient fluid motion with 50% CPU savings
    const startTime = performance.now();

    const render = (currentTime: number = performance.now()) => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(render);

      const elapsed = currentTime - lastRenderTime;
      if (elapsed < fpsInterval) return;
      lastRenderTime = currentTime - (elapsed % fpsInterval);

      const time = (currentTime - startTime) * 0.001;

      // Smooth inertia lerp (fluid damping)
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.09;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.09;

      velocity.x *= 0.90;
      velocity.y *= 0.90;

      targetIntensity *= 0.94;
      intensity += (targetIntensity - intensity) * 0.10;

      const safeIntensity = intensity < 0.001 ? 0.0 : intensity;
      const safeVelX = Math.abs(velocity.x) < 0.0001 ? 0.0 : velocity.x;
      const safeVelY = Math.abs(velocity.y) < 0.0001 ? 0.0 : velocity.y;

      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uTextureLoc, 0);

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uTexResolutionLoc, texWidth, texHeight);
      gl.uniform2f(uMouseLoc, currentMouse.x, currentMouse.y);
      gl.uniform2f(uVelocityLoc, safeVelX, safeVelY);
      gl.uniform1f(uTimeLoc, time);
      gl.uniform1f(uIntensityLoc, safeIntensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const timeoutId = setTimeout(() => {
      render();
    }, 120);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);

      if (program) {
        gl.deleteProgram(program);
      }
      if (positionBuffer) {
        gl.deleteBuffer(positionBuffer);
      }
      if (texture) {
        gl.deleteTexture(texture);
      }
    };
  }, [imageSrc]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  );
}
