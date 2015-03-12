var objectPrefab : GameObject; // prefab to spawn
var objectsSpawned : int; // objects spawned
var player : GameObject; // player

var minWait : int;
var maxWait : int;
var waitTime : int;

var spawn : boolean;

function Start() {
	minWait = 1;
	maxWait = 10;
	waitTime = Random.Range(minWait, maxWait);
	
	spawn = true;
}

function Update() {
	if(spawn) {
		Spawn();
	}
}

function Spawn() {

	// spawn
	Instantiate(objectPrefab, transform.position, transform.rotation); // spawn at spawner location
	objectsSpawned++;
	NewWaitTime();
	
	spawn = false;
	SetSpawn();
	
}

function SetSpawn() {
	yield WaitForSeconds(waitTime);
	spawn = true;
}

function NewWaitTime() {
	waitTime = Random.Range(minWait, maxWait);
}