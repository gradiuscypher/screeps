import { HelperFunctions } from "utils/HelperFunctions"

let helper = new HelperFunctions();

export class Upgrader {
    private creep: Creep;

    constructor(target_creep: Creep) {
        this.creep = target_creep;
    }

    public upgrade() {
        if (this.creep.memory.working && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.creep.memory.working = false;
            this.creep.say('Harvesting...');
        }
        if (!this.creep.memory.working && this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.working = true;
            helper.clear_source_allocation(this.creep);
            this.creep.say('Upgrading...');
        }

        if (this.creep.memory.working) {
            if (this.creep.room.controller && this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            let source = helper.find_energy_source(this.creep.room, this.creep);

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
