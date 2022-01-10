# gradius' screeps code - Typescript Edition!

## Current Work
* implement quadrant search
* Implement Towers
* more advanced creep bodies
* transport creeps

## Next Up
* tag a building to make sure it doesn't decay, rather than repairing decay
* source finder function should use distance too
* need a better way for miners to track their location rather than just staggered TTLs, need miners to claim a spot and keep it
* Implement Roads

## Ideal Pool
* miners are overmining, need to either clean up resources or reduce mining ability
* Need to lock in source finder decision so that screeps don't keep swapping sources based on current eval
* Generic actions for screep roles rather than specific named ones (eg: primary_action rather than build)
* building priorities
* More generic parts for screeps so that we can adapt to needs and not idle
* Repair/Upgrade role modified to fix structures and roads
* Shipping and mining role so we can mine into a container
* Better repairing logic
* Some sort of resting area for idle creeps so they're not in the way
* Keep track of time spent idle

## Done / Abandoned
* structure upkeep - technically have repairing, but could be better
* container mining
* dynamic use of containers for building/upgrading/upkeep
* Implement storage
* Generic construction actions for finding buildable points around a point
