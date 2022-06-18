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

    public command_flag(flag: Flag) {
        switch (flag.name) {
            case 'clear.alloc':
                console.log("Running clear.alloc flag");
                Memory.allocations = {};
                flag.remove();
                break;
        }
    }

    public clear_source_allocation(creep: Creep) {
        console.log(`${creep.name} running clear_source_allocation`);
        if (creep.memory.destination in Memory.allocations) {
            Memory.allocations[creep.memory.destination]--;
            creep.memory.destination = '';
        }
        else {
            Memory.allocations[creep.memory.destination] = 0;
            creep.memory.destination = '';
        }
    }

    public find_energy_source(room: Room, creep: Creep, ignore_storage: boolean = false, ignore_containers: boolean = false, ignore_sources: boolean = false): StructureStorage | StructureContainer | Source | null {
        // BUG: is there a bug in how energy sources are found and distributed? workers seem to cluster around one
        // TODO: need a way to ignore mining locations
        let MIN_ENERGY = 50;

        console.log("===");
        for (const target_id in Memory.allocations) {
            console.log(`${target_id}: ${Memory.allocations[target_id]}`);
        }
        console.log("===");

        // do you already have a destination, just return the object if you do
        if (creep.memory.destination) {
            let sourceId: Id<Source | StructureStorage> = creep.memory.destination as Id<Source | StructureStorage>;
            return Game.getObjectById(sourceId);
        }

        console.log(`${creep.name} running find_energy_source for new destination`);

        // is there a storage?
        if (!ignore_storage && room.storage && room.storage.store.energy > MIN_ENERGY) {
            creep.memory.destination = room.storage.id;
            return room.storage;
        }

        // are there any containers?
        if (!ignore_containers) {
            let containers: StructureContainer[] = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > MIN_ENERGY)
                }
            });

            for (let container of containers) {
                if (container.id! in Memory.allocations) {
                    Memory.allocations[container.id] = 0;
                }
            }

            if (containers.length) {
                // assign the container with the least amount of allocations
                let target = containers.reduce((prevCon, currCon) => prevCon = Memory.allocations[prevCon.id] < Memory.allocations[currCon.id] ? prevCon : currCon);

                if (target.id in Memory.allocations) {
                    Memory.allocations[target.id]++;
                }
                else {
                    Memory.allocations[target.id] = 1;
                }

                creep.memory.destination = target.id;
                return target;
            }
        }

        // are there any sources?
        if (!ignore_sources) {
            console.log("We're looking at sources now");
            // let sources = room.find(FIND_SOURCES);
            let sources = room.find(FIND_SOURCES, {
                filter: (raw_source) => {
                    return (raw_source.energy >= MIN_ENERGY)
                }
            });

            for (let source of sources) {
                if (source.id! in Memory.allocations) {
                    Memory.allocations[source.id] = 0;
                }
            }

            if (sources.length) {
                let target = sources.reduce((prevCon, currCon) => prevCon = Memory.allocations[prevCon.id] < Memory.allocations[currCon.id] ? prevCon : currCon);
                creep.memory.destination = target.id;
                return target;
            }
        }

        // didnt find anything return null
        return null
    }
    public * quadrant_generator(quadrant: number) {
        // separate the room into quadrants, working from the center of the room outward.
        // ignores x=25 and y=25 to more easily split the room into even bits
        // quadrants are defined clockwise:
        // q1: (x,y)= (0-24, 0-24), q2: (26-49, 0-24), q3: (26-49, 26-49), q4: (0-24, 26-49)
        const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
        let quadrants: Record<number, number[]> = {
            0: [0, 24, 0, 24],
            1: [26, 49, 0, 24],
            2: [26, 49, 26, 49],
            3: [0, 24, 26, 49]
        }
        let tq = quadrants[quadrant];
        for (let x of range(tq[1], tq[0], -1)) {
            for (let y of range(tq[3], tq[2], -1)) {
                yield [x, y];
            }
        }
    }

    public look_at_quadrant(quadrant: number, room: Room) {
        let quadrants: Record<number, number[]> = {
            0: [0, 24, 0, 24],
            1: [26, 49, 0, 24],
            2: [26, 49, 26, 49],
            3: [0, 24, 26, 49]
        }
        let x0 = quadrants[quadrant][0]
        let x1 = quadrants[quadrant][1]
        let y0 = quadrants[quadrant][2]
        let y1 = quadrants[quadrant][3]

        return room.lookAtArea(y0, x0, y1, x1, true);
    }

    public next_diagonal_out(room: Room, x: number, y: number, scale: number) {
        let diagonals = [
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1]
        ];
        let multiplier = 1;
        let point_found = false;
        let stop_looking = false;
        let new_x = 0;
        let new_y = 0;

        while (!stop_looking) {
            for (let mod of diagonals) {
                new_x = (mod[0] * (scale * multiplier)) + x;
                new_y = (mod[1] * (scale * multiplier)) + y;

                if (new_x > 49 || new_y > 49 || new_x < 0 || new_y < 0) {
                    console.log(`Hit limit: ${new_x}, ${new_y}`);
                    stop_looking = true;
                    break;
                }

                console.log(`Trying diagonal: ${new_x}, ${new_y}`);
                let current_point = room.lookAt(new_x, new_y);
                if (current_point.length == 1 && current_point[0].terrain == 'plain') {
                    console.log(`I found a point at diagonal: ${new_x}, ${new_y}`);
                    stop_looking = true;
                    point_found = true;
                    break;
                }
            }
            multiplier += 1;
        }

        if (point_found) {
            return [new_x, new_y];
        }
        else {
            return undefined;
        }
    }
}
