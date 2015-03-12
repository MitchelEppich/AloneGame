#pragma strict
 
 var door : GameObject;
 var knobs : GameObject[];
 var smooth : float = 1.0;
 var open : boolean = false;
 var invert : boolean = false;
 
// var rotationAxis : boolean[] = {false, false, false};
 
private var yy : int = 0;
private var yfinal : int = 0;
 
 // 0 - north, 1 - west, 2 - south, 3 - east
 
 function Start ()
 {
     yy = door.transform.localEulerAngles.y;;
     yfinal = yy + (invert?-90:90);
     
 }
  
 function Update () {
 //to rotate the door to the open angle//
 
        if (open)    // open = true
        {
               var doorOpen = Quaternion.Euler(door.transform.localEulerAngles.x, yfinal, door.transform.localEulerAngles.z);    // Get the Euler of the angle that we want to reach
                var angle = Quaternion.Angle(transform.localRotation, doorOpen);        // Convert it to angle
             door.transform.localRotation = Quaternion.Slerp(transform.localRotation, doorOpen, smooth * Time.deltaTime);
             
             // When we come near the angle, that we want to reach, we snap the door to that angle
             // cuz otherwise we will never reach it, because of the smoothed lerp of the Quaternion.
             // If the snap is too obvious try replacing the "smooth" with 0.5 for example.
             if (angle <= smooth)
                 door.transform.localRotation = doorOpen;
        }
 
        //to rotate the door to the closed angle//
       else          //  open = false
        {
                doorOpen = Quaternion.Euler(door.transform.localEulerAngles.x, yy, door.transform.localEulerAngles.z);    // Get the Euler of the angle that we want to reach
                angle = Quaternion.Angle(transform.localRotation, doorOpen);        // Convert it to angle
             door.transform.localRotation = Quaternion.Slerp(transform.localRotation, doorOpen, smooth * Time.deltaTime);
             
             if (angle <= smooth) {
                 door.transform.localRotation = doorOpen;
             }
 
        }
  
     if (Input.GetMouseButtonDown(0))
     {
         var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
         var hit : RaycastHit;
         //raytrace on door knob//
         for(var i: int = 0; i < knobs.Length; i++) {
          	if (knobs[i].GetComponent.<Collider>().Raycast (ray, hit, 10.0)) 
          	{
              	open = !open;
          	}
         }
     }
 }