# CG 2022/2023

## Group T03G06

## Project

### Point 1
- Initially we were having a little bit of trouble to draw the sphere, but then we realised that to draw it we would need a implementaion similar to the used to draw the cylinder. So, we reused that code and made some modifications and it was pretty inutitve doing like that.
- To apply the texture we found it very easy and was similar to what we did in TP classes.

### Point 2
- To invert the faces of the sphere, all that's needed is to reverse the order in which the vertices are passed to the `indices` array, and invert the sign of each component of the normals.
- For centering the sphere to the camera, a translation is performed to the position of the camera's center (given by the `camera.position` member) inside *MyPanorama*'s `display` method, by passing the aforementioned member as an argument.


## Screenshots
| ![Screenshot 1](screenshots/project-t03g06-1.gif) |
|:--:|
| *Fig. 1 - Panorama view.* |
