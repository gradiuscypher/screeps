export class Miner {
    private creep: Creep;

    constructor(target_creep: Creep) {
        this.creep = target_creep;
    }

    public primary_action() {
        // OPT: lets not do this search if we're already on a container?
        if (this.standing_on_container()) {
            let source = this.creep.pos.findInRange(FIND_SOURCES, 1)[0];
            this.creep.harvest(source);
        }

        else {
            let container = this.find_empty_container();
            if (container) {
                let container_loc = container.pos;

                // if there's a location and we're already there, start mining
                // TODO: error catching
                // OPT: do we really need this comparison, or should we assume and just error out if not
                // if there's a free location, move to it
                console.log(`Miner Container Location: ${container_loc}`);
                this.creep.moveTo(container_loc);
            }
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
                        return containers[0];
                    }
                }
            }
        }
        return null;
    }
    private standing_on_container() {
        let containers = this.creep.pos.findInRange(FIND_STRUCTURES, 0, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_CONTAINER
                )
            }
        });
        return containers.length > 0;
    }
}
