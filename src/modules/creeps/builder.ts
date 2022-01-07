export class Builder {
    private creep: Creep;


    constructor(target_creep: Creep) {
        this.creep = target_creep;
    }

    public build() {
        // they need more energy, set working to false
        if (this.creep.memory.working && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.creep.memory.working = false;
            this.creep.say('Harvesting...');
        }

        // they're done getting energy, set working to true
        if (!this.creep.memory.working && this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.working = true;
            this.creep.say('Working...');
        }

        // they're doing working
        if (this.creep.memory.working) {
            // repair logic
            let repair_targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax)
                }
            });

            for (let target of repair_targets) {
                if ((target.hits / target.hitsMax) < 0.4) {
                    this.creep.memory.task = 'repairing';
                }
                else if ((target.hits / target.hitsMax) >= 0.8) {
                    this.creep.memory.task = '';
                }
            }

            if (this.creep.memory.task == 'repairing') {
                if (this.creep.repair(repair_targets[0]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(repair_targets[0], { visualizePathStyle: { stroke: '#1ab844' } });
                }
            }

            // building logic
            // TODO: need to set priorities on buildings
            let t_buildings = this.creep.room.find(FIND_CONSTRUCTION_SITES);
            if (t_buildings.length && this.creep.memory.task == '') {
                if (this.creep.build(t_buildings[0]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(t_buildings[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }

        // they're collecting energy
        else {
            let sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}
