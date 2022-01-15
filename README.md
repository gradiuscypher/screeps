# gradius' screeps code - Typescript Edition!

## Current Work
* more advanced creep bodies
* transport creeps

## Next Up
* tag a building to make sure it doesn't decay, rather than repairing decay
* better source finder for all creeps, need to make sure the storage is being used, should also consider distance
* need a better way for miners to track their location rather than just staggered TTLs, need miners to claim a spot and keep it (global memory?)
* walls and rampart automation
* military screeps
* advanced tower logic

## Ideal Pool
* need a way to disable/enable creeps pathing lines and messages for clean debug
* miners are overmining, need to either clean up resources or reduce mining ability
* Need to lock in source finder decision so that screeps don't keep swapping sources based on current eval
* Generic actions for screep roles rather than specific named ones (eg: primary_action rather than build)
* building priorities
* More generic parts for screeps so that we can adapt to needs and not idle
* Repair/Upgrade role modified to fix structures and roads
* Better repairing logic
* Some sort of resting area for idle creeps so they're not in the way
* Keep track of time spent idle
* building roads between extensions programmatically
* turning on the road building task when a new structure is built

## Complete/Abandoned
* roads
