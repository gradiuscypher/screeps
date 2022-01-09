# gradius' screeps code - Typescript Edition!

## Current Work
* creeps dance when trying to fill storage
* transport creeps

## Next Up
* tag a building to make sure it doesn't decay, rather than repairing decay
* dynamic use of containers for building/upgrading/upkeep
* source finder function should use distance too
* need a better way for miners to track their location rather than just staggered TTLs, need miners to claim a spot and keep it
* miners are overmining, need to either clean up resources or reduce mining ability

## Ideal Pool
* Need to lock in source finder decision so that screeps don't keep swapping sources based on current eval
* Generic actions for screep roles rather than specific named ones (eg: primary_action rather than build)
* building priorities
* Generic construction actions for finding buildable points around a point
* More generic parts for screeps so that we can adapt to needs
* More generic roles for screeps so that they don't idle as much
* Repair/Upgrade role modified to fix structures and roads
* Shipping and mining role so we can mine into a container
* Implement Towers
* Implement Roads
* Implement storage
* Better repairing logic
* Some sort of resting area for idle creeps so they're not in the way
* Keep track of time spent idle

## Done / Abandoned
* structure upkeep - technically have repairing, but could be better
* container mining
