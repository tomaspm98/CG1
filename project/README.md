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
- There's a unique material for every texture applied to the bird. The eyes have a high specular component and low diffuse component, the feathers and beak have a high diffuse component and some specular component, and the skin texture used for the legs and claws only have a diffuse component. None of the materials have an ambient component.
 
## Screenshots
| ![Screenshot 1](screenshots/project-t03g06-1.gif) |
|:--:|
| *Fig. 1 - Panorama view.* |

| ![Screenshot 2](screenshots/project-t03g06-2.png) |
|:--:|
| *Fig. 2 - Two view angles of the bird model.* |
