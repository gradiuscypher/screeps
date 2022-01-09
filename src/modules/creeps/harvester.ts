import { HelperFunctions } from "utils/HelperFunctions"

let helper = new HelperFunctions();

export class Harvester {
    private creep: Creep;

    constructor(target_creep: Creep) {
        this.creep = target_creep;
    }

    public harvest() {
        if (this.creep.store.getFreeCapacity() > 0) {
            let source = helper.find_energy_source(this.creep.room, true);

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

        else {
            let spawn_targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            let fill_targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (spawn_targets.length > 0) {
                if (this.creep.transfer(spawn_targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(spawn_targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }

            else if (fill_targets.length > 0) {
                if (this.creep.transfer(fill_targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(fill_targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }
        }
    }
}
