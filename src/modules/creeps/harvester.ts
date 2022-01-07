export class Harvester {
    private creep: Creep;

    /**
     *
     */
    constructor(target_creep: Creep) {
        this.creep = target_creep;
    }

    public harvest() {
        if (this.creep.store.getFreeCapacity() > 0) {
            let sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            let fill_targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (fill_targets.length > 0) {
                if (this.creep.transfer(fill_targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(fill_targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }
        }
    }
}
