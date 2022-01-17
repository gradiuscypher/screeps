# gradius' screeps code - Typescript Edition!

# Refactor Thoughts
* Multi-tiered setup:
    * Game manager keeps track of highest level details, manages cross-room resource needs and tracking
        * managing new inputs (new resources, enemy creeps, etc)
        * room expansion
        * track overall statistics:
            * energy in/out
            * resources in/out
            * creep time spent idle
            * hauling large energy sources to upgrade RCL quickly
    * Room manager keeps track of room level details and needs
        * iterates over creeps and runs jobs
        * need more creeps to keep up on energy tasks (transportation, mining)
        * need more creeps for protection

# Tasks
## Current Work
* creep refactor - more flexible creeps with more generic systems
* need to validate that current creep spawning code works well for low energy rooms

## Next Up
* better repair logic - tag a building to make sure it doesn't decay, rather than repairing decay
* better source finder for all creeps, need to make sure the storage is being used, should also consider distance
* walls and rampart automation
* military screeps
* Multi-room expansion

## Ideal Pool
* pathing from storage to destinations to also create roads that way
* large hauling creeps for moving between rooms for RCL powerleveling
* additional containers
* link implementation
* lab implementation
* extractor implementation
* terminal implementation
* monitor for tracking when structures go below a specific Hits threshold, to monitor creeps failing to repair
* need a way to disable/enable creeps pathing lines and messages for clean debug
* miners are overmining, need to either clean up resources or reduce mining ability
* building priorities
* Some sort of resting area for idle creeps so they're not in the way
* Keep track of time spent idle
* advanced tower logic
* when building extension roads, check that you're not building a road under an extension
* need a better way for miners to track their location rather than just staggered TTLs, need miners to claim a spot and keep it (global memory?)
* turning on the road building task when a new structure is built, when extensions are built
* better pathfinding? keep creeps from blocking each other?
* logging to some sort of log store for review
* manual military actions via flags for PvP fun

## Complete/Abandoned
* roads
* roads for extensions
* building roads between extensions programmatically
* Repair/Upgrade role modified to fix structures and roads
* More generic parts for screeps so that we can adapt to needs and not idle

# Random Notes
* 6 work/3 move is perfect for stationary mining creeps
