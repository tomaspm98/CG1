#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

const float px_offset = (2./512.);

void main() {
	float timeScale = 0.01;
	float heightScale = 0.05;
	float neighbors[9];
	neighbors[0] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale - px_offset, aTextureCoord[1] + timeFactor * timeScale - px_offset)).b * heightScale;
	neighbors[1] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale 			  , aTextureCoord[1] + timeFactor * timeScale - px_offset)).b * heightScale;
	neighbors[2] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale + px_offset, aTextureCoord[1] + timeFactor * timeScale - px_offset)).b * heightScale;
	neighbors[3] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale - px_offset, aTextureCoord[1] + timeFactor * timeScale 			 )).b * heightScale;
	neighbors[4] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale 			  , aTextureCoord[1] + timeFactor * timeScale 			 )).b * heightScale;
	neighbors[5] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale + px_offset, aTextureCoord[1] + timeFactor * timeScale 			 )).b * heightScale;
	neighbors[6] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale - px_offset, aTextureCoord[1] + timeFactor * timeScale + px_offset)).b * heightScale;
	neighbors[7] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale 			  , aTextureCoord[1] + timeFactor * timeScale + px_offset)).b * heightScale;
	neighbors[8] = texture2D(uSampler2, vec2(aTextureCoord[0] + timeFactor * timeScale + px_offset, aTextureCoord[1] + timeFactor * timeScale + px_offset)).b * heightScale;

	// Box Blur
	float z_offset = (neighbors[0] + neighbors[1] + neighbors[2] + neighbors[3] + neighbors[4] + 
						neighbors[5] + neighbors[6] + neighbors[7] + neighbors[8]) * (1./9.);
	
	vec3 offset = vec3(0.0, 0.0, z_offset);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

	vTextureCoord = aTextureCoord + vec2(timeFactor * timeScale, timeFactor * timeScale);
}