export const shaderColorVariableName = "u_FragColor";

export const colorFragmentShader = `
  precision mediump float;
  uniform vec4 ${shaderColorVariableName};

  void main() {
    gl_FragColor = ${shaderColorVariableName};
  }
`;
