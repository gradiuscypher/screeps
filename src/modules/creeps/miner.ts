export class Miner {
    private creep: Creep;

    constructor(target_creep: Creep) {
        this.creep = target_creep;
    }

    public primary_action() {
        let container_loc = this.find_empty_container();
        if (container_loc) {
            console.log(`Container Location: ${container_loc}`);
        }
    }

    private find_empty_container() {
        // find the sources
        let sources = this.creep.room.find(FIND_SOURCES);

        // find the containers next to the sources
        for (let source of sources) {
            let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER
                    )
                }
            });

            if (containers.length > 0) {
                let cont_look = containers[0].pos.look();
                for (let obj of cont_look) {
                    if (obj.type == LOOK_CREEPS) {
                        break;
                    }
                    else {
                        return containers[0].pos;
                    }
                }
            }
        }
        return null;
    }
}
