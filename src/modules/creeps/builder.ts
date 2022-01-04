export class Builder {
    private creep: Creep;


    constructor(target_creep: Creep) {
        this.creep = target_creep;
    }

    public build() {
        if (this.creep.memory.working && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.creep.memory.working = false;
            this.creep.say('Harvesting...');
        }
        if (!this.creep.memory.working && this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.working = true;
            this.creep.say('Working...');
        }
        if (this.creep.memory.working) {
            let t_buildings = this.creep.room.find(FIND_CONSTRUCTION_SITES);
            if (t_buildings.length) {
                if (this.creep.build(t_buildings[0]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(t_buildings[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }

        else {
            let sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}
