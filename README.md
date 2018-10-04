### test scene

The test scene is used to inspect an object with a high degree of detail. You can move and rotate it any way you want.

### how to use the test scene

+ open _test-scene/examples/js/mesa.js_
  + copy the object creating functions to the designated area
  + in your object creating function, after the line with _scene.add( $object )_, add _control.attach( $object )_
  + call the object creating function in the designated area of the _init()_ function
+ run _test-scene/examples/index.html_


## keyboard controls

### trabalho1

| Key | Action |
| ------ | ------ |
| **left** | rotate the chair anti-clockwise |
| **right** | rotate the chair clockwise |
| **up** | move the chair forward |
| **down** | move the chair forward |
| **1** | switch to front camera |
| **2** | switch to side camera |
| **3** | switch to top camera |
| **a** | toggle wireframe on/off |
| **e** | toggle scene axis helper on/off |
