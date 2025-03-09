export const shaderPositionAttributeName = "a_position";
export const shaderPositionVariableName = "u_resolution";

export const positionVertexShader = `
  attribute vec2 ${shaderPositionAttributeName};

  uniform vec2 u_resolution;

  void main() {
    // convert the position from pixels to [0.0, 1.0]
    vec2 zeroToOne = ${shaderPositionAttributeName} / u_resolution;

    // convert from [0.0, 1.0] to [0.0, 2.0]
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from [0.0, 2.0] to [-1.0, 1.0] (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace, 0, 1);
  }
`;
