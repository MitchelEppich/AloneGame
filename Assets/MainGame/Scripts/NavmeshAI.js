var target : Transform;

function Start() {
	target = GameObject.FindWithTag("Player").transform;
}

function Update() {
	GetComponent(NavMeshAgent).destination = target.position;
}