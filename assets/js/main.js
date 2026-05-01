(function () {
  "use strict";

  const canvas = document.getElementById('webgl-bg');
  if (canvas) {
    const gl = canvas.getContext('webgl');
    if (gl) {
      function resize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0,0,canvas.width,canvas.height);
      }
      window.addEventListener('resize',resize);
      resize();

      const vs = `attribute vec2 position; void main(){ gl_Position = vec4(position,0.0,1.0); }`;
      const fs = `precision mediump float; uniform float time; uniform vec2 resolution; void main(){ vec2 uv = gl_FragCoord.xy / resolution; float wave = sin(uv.x*10.0 + time)*0.1; float glow = smoothstep(0.4,0.5,uv.y + wave); vec3 color = mix(vec3(0.0,0.85,0.6), vec3(0.8,0.7,0.3), uv.x); gl_FragColor = vec4(color * glow, 0.25); }`;

      function compile(type,src){ const s = gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s); return s; }
      const prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER,vs));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER,fs));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,buf);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(prog,'position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);

      const timeLoc = gl.getUniformLocation(prog,'time');
      const resLoc = gl.getUniformLocation(prog,'resolution');

      function draw(t){
        gl.uniform1f(timeLoc, t*0.001);
        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
        requestAnimationFrame(draw);
      }
      draw(0);
    }
  }
})();