import { HelperFunctions } from "utils/HelperFunctions"

let helper = new HelperFunctions();

export class Transport {
    private creep: Creep;

    constructor(target_creep: Creep) {
        this.creep = target_creep;
    }

    public primary() {
        if (this.creep.store.getUsedCapacity() === 0) {
            // TODO: this will still give the creep sources, even though it wont have the parts for harvesting
            let source = helper.find_energy_source(this.creep.room, true, this.creep);

            if (source instanceof StructureContainer || source instanceof StructureStorage) {
                if (source && this.creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }

        else {
            this.creep.memory.destination = '';
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
