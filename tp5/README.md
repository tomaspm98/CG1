## TP 5 Notes

### Exercises
- The teapot related exercises were fairly simple, it mostly consisted of looking and grabbing code from the shaders already provided and making small changes to them.
- To soften the variations in height of the water texture, a box blur algorithm was used. It didn't have much of an effect in the end, especially around the borders, as the version implemented is rather simplistic and doesn't account for edge cases, but it was a fun exercise to experiment with. For the variations in color, the color in the *waterMap* texture was inverted and mixed with the color of the *waterTex* texture in the following proportion: `waterMap.color * 0.2 + waterTex.color * 0.8`.



## Screenshots
| ![Screenshot 1](screenshots/cg-t03g06-tp5-1.png) |
|:--:|
| *Fig. 1 - Teapot with Ukraine shader.* |

| ![Screenshot 2](screenshots/cg-t03g06-tp5-2.png) |
|:--:|
| *Fig. 2 - Teapot with grayscale shader.* |

| ![Screenshot 3](screenshots/cg-t03-g06-tp5-3.gif) |
|:--:|
|*Fig. 3 - Water animation.*|