# gradius' screeps code - Typescript Edition!

# Bug List
* If a creep is on a construction spot, it can't be worked on
  * logic in our constructor to move to a different spot if it cant reach one it's been trying

# Tasks
## Current Work
* load balance find_energy_source
* creep refactor - more flexible creeps with more generic systems
* creep bodies are built for roads, need to build roads.
* possible to modify constants from cli?

## Next Up
* transports dont fill containers, only storage. this is because they're pulling from the mining containers. need a way of marking mining containers as something to avoid filling
* no logic to build containers construction sites yet
* better source finder for all creeps, need to make sure the storage is being used, should also consider distance
* better repair logic - tag a building to make sure it doesn't decay, rather than repairing decay
* walls and rampart automation
* military screeps
* Multi-room expansion
* detailed logs to keep track of whats going on, can store in DD
* need to validate that current creep spawning code works well for low energy rooms

## Idea Pool
* generate_blueprint: need more granular cost control
* need priority on buildings: eg creeps are reparing containers before building extensions -extensions more important
* Tracking of tasks to try a different task when it's unable to do a task for a certain period of time, prevent deadlock
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

# Random Notes
* 6 work/3 move is perfect for stationary mining creeps
