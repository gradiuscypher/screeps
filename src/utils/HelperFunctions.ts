export class HelperFunctions {
    public surrounding_points = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1]
    ];

    public * look_around(position: number[]) {
        let surrounding_points = [
            [-1, -1],
            [0, -1],
            [1, -1],
            [-1, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1]
        ];

        for (let mod of surrounding_points) {
            let new_x = position[0] + mod[0];
            let new_y = position[1] + mod[1];

            yield [new_x, new_y];
        }
    }

    public find_energy_source(room: Room, ignore_storage: boolean = false) {
        let MIN_ENERGY = 50;
        // are there a storage?
        if (!ignore_storage && room.storage && room.storage.store.energy > MIN_ENERGY) {
            return room.storage;
        }

        // are there any containers?
        let containers: StructureContainer[] = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > MIN_ENERGY)
            }
        });
        for (let container of containers) {
            container.store.getUsedCapacity()
        }
        if (containers.length) {
            return containers.reduce((prevCon, currCon) => prevCon = prevCon.store.getUsedCapacity() > currCon.store.getUsedCapacity() ? prevCon : currCon);
        }

        // are there any sources?
        let sources = room.find(FIND_SOURCES);
        if (sources.length) {
            return sources.reduce((prevSource, currSource) => prevSource = prevSource.energy > currSource.energy ? prevSource : currSource);
        }

        // didnt find anything return null
        return null
    }
}
