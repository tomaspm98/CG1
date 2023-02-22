# CG 2022/2023

## Group T03G06

## TP 2 Notes

### Exercise 1
- The tangram part exercise turned out to be relatively straightforward after figuring out how to properly make use of the transformation functions.
- Keeping in mind that transformations must be written in reverse order can be difficult, but there's an easy work around: write the first transformation and then write each following transformation in the line directly above the previous.
- Checking the "CFG.js" file in the lib folder revealed that the class *CFGobject* keeps a reference to the scene it's created in, which facilitated the implementation of the *MyTangram* class.

### Exercise 2
- The part of doing the cube was pretty simple because it was just working with vertices and indexes like we did in the first class
- After that connecting the cube to the tangram figure in our case was easy and we just needed a translation
- To rotate all the tangram figure with the cube as base, we did a rotation and a translation with the tangram figure as only one figure to put it in the right place. 

### Exercise 3
- It's possible to draw the same object several times in different places, effectively being able to "copy" the object
- The side of the cube drawn from the *MyQuad* object displays different brightness from the ones of the cube drawn from the *MyUnitCube* object, particularly the top side.

## Screenshots
| ![Screenshot 1](screenshots/cg-t03g06-tp2-1.png) |
|:--:|
| *Fig. 1 - Side by side comparison of the original tangram and the drawn tangram.* |

| ![Screenshot 2](screenshots/cg-t03g06-tp2-2.png) |
|:--:|
| *Fig. 2 - Side by side screenshots of the tangram and the cube from 'MyUnitCube' class.* |

| ![Screenshot 3](screenshots/cg-t03g06-tp2-3.png) |
|:--:|
| *Fig. 3 - Side by side screenshots of the tangram and the cube from 'MyUnitCubeQuad' class.* |