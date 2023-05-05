# CG 2022/2023

## Group T03G06

## Project

### Point 1 - Sphere
- Initially we were having a little bit of trouble to draw the sphere, but then we realised that to draw it we would need a implementaion similar to the used to draw the cylinder. So, we reused that code and made some modifications and it was pretty inutitve doing like that.
- To apply the texture we found it very easy and was similar to what we did in TP classes.

### Point 2 - Panorama
- To invert the faces of the sphere, all that's needed is to reverse the order in which the vertices are passed to the `indices` array, and invert the sign of each component of the normals.
- For centering the sphere to the camera, a translation is performed to the position of the camera's center (given by the `camera.position` member) inside *MyPanorama*'s `display` method, by passing the aforementioned member as an argument.

### Point 3 - Bird
#### Subpoint 1 - Model
- The bird class *MyBird* contains several body parts which are classes themselves too (*BirdWing*, *BirdHead*, etc.). This allows for better flexiblity when it comes to customizing and later animating the bird, as each body section is its own entity.
- To model the bird, objects created from previous tasks were used, such as cones, cylinders, pyramids, etc. These objects were transformed using the transformation functions learnt during classes (scaling, rotation, translation) in order to shape and position them and make up the bird. The object classes were modified to better suit the project, such as to construct the **texCoords** array to enable the use of textures on the them.
- There's a unique material for every texture applied to the bird. The eyes have a high specular component and low diffuse component, the feathers, beak and the skin for the legs and feet have a high diffuse component and some specular component.

#### Subpoint 2 - Animations
- The height and wing flapping animation are synced due to sharing the same base time period. This being equivalent to 1 second, achieved by having a factor of $2\pi$ inside the $\sin$ function used to update the animation control variables (`dy` and `dWingAngle`).
- To update the animation control variables, time was converted into seconds. Furthermore, for these animations, the timestamp of each frame is used.
- A sinusoidal function is described as $A\times\sin(\omega t + \phi)$. The relevant term here is $\omega$, which defines the rate of change of the function. The higher it is, the faster the rate of change, the lower the period becomes, and vice-versa. For the second animation, the bird's speed is used as the rate of change, $\omega$, thus as the bird speeds up, so will the flapping of the wings. 

#### Subpoint 3 - Control
- As suggested, the bird keeps track of its orientation as the angle around the YY axis. This allows to determine the **x** and **z** components by thinking of the bird's direction as a vector around a unit circle centered at the YY axis, and using either the $\sin$ or $\cos$ functions, and the angle of that vector being given by the bird's orientation.
- To get the displacement, the motion formula is used where $x = x_0 + v_x\times\delta t$. To attain $v_x$, the bird's speed is multiplied by the **x** component of the bird's direction, $sin(orientationAngle)$. $\delta t$ is the time between the last frame and the current frame, converted into seconds.
- The bird is free to rotate in 360 degrees, and the speed is capped so that the bird doesn't accelerate forever.
- The *speedFactor* is used similarly as the bird's speed in the wing flapping animation, working as another multiplicative factor to influence the rate of change of the sinusoidal function.

### Point 4 - Terrain
- The shaders used to create the terrain were based on the shaders used in [tp5](../tp5/README.md) to create the wave effect on water. They differ in the inclusion of a third texture for the shaders of this project, the altimetry to change the color of the terrain based on its height.
- In order to align the coordinates of the terrain with its color on the altimetry texture, the blue color component of the corresponding heightmap texture coordinates was inverted (because the altimetry goes from bottom to the top, however the starting point of the texture coordinates is at the top).
- To get the flat area on both the terrain and on the heightmap, both their images were edited using the website [pixlr](https://pixlr.com/x/).

## Screenshots
| ![Screenshot 1](screenshots/project-t03g06-1.gif) |
|:--:|
| *Fig. 1 - Panorama view.* |

| ![Screenshot 2](screenshots/project-t03g06-2.png) |
|:--:|
| *Fig. 2 - Two view angles of the bird model.* |

| ![Screenshot 3](screenshots/project-t03g06-3.png) |
|:--:|
| *Fig. 3 - Two view angles of the scene containing the bird, terrain and background.* |
