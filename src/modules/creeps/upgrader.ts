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
            this.creep.memory.destination = '';
            this.creep.say('Upgrading...');
        }

        if (this.creep.memory.working) {
            if (this.creep.room.controller && this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            let source = helper.find_energy_source(this.creep.room, false, this.creep.memory.destination);
            // let source = this.creep.room.find(FIND_SOURCES)[1];

            if (source instanceof StructureContainer || source instanceof StructureStorage) {
                if (source && this.creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                    this.creep.memory.destination = source.id;
                }
            }

            else {
                if (source && this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                    this.creep.memory.destination = source.id;
                }
            }
        }
    }
}
