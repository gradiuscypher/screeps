import { HelperFunctions } from "utils/HelperFunctions"

let helper = new HelperFunctions();

const REPAIR_PERCENT_MIN = 0.2;
const REPAIR_PERCENT_MAX = 0.4;

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
            // console.log(`${this.creep.memory.task}`)
            // tower fill logic
            let tower_targets: StructureTower[] = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure: StructureTower) => {
                    return (structure.structureType == STRUCTURE_TOWER && structure.store.getUsedCapacity(RESOURCE_ENERGY) / structure.store.getCapacity(RESOURCE_ENERGY) < 0.95);
                }
            });

            for (let target of tower_targets) {
                // console.log(`${target.store.getUsedCapacity(RESOURCE_ENERGY) / target.store.getCapacity(RESOURCE_ENERGY)}`);

                if ((target.store.getUsedCapacity(RESOURCE_ENERGY) / target.store.getCapacity(RESOURCE_ENERGY)) < 0.8) {
                    this.creep.memory.task = 'filling';
                }
                if (this.creep.memory.task == 'filling' && (target.store.getUsedCapacity(RESOURCE_ENERGY) / target.store.getCapacity(RESOURCE_ENERGY)) >= 0.95) {
                    this.creep.memory.task = '';
                }
            }

            if (this.creep.memory.task == 'filling') {
                if (this.creep.transfer(tower_targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(tower_targets[0], { visualizePathStyle: { stroke: '#1ab844' } });
                }
                else if (tower_targets.length < 1) {
                    this.creep.memory.task = '';
                }
            }

            // repair logic
            let repair_targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.hits / structure.hitsMax) < REPAIR_PERCENT_MAX);
                }
            });
            // console.log(`repairtargets: ${repair_targets}`);

            for (let target of repair_targets) {
                if ((target.hits / target.hitsMax) < REPAIR_PERCENT_MIN) {
                    this.creep.memory.task = 'repairing';
                }
                else if (this.creep.memory.task == 'repairing' && (target.hits / target.hitsMax) >= REPAIR_PERCENT_MAX) {
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
            let source = helper.find_energy_source(this.creep.room);

            if (source instanceof StructureContainer || source instanceof StructureStorage) {
                if (source && this.creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }

            else {
                if (source && this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }
}
