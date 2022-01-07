

export class Construction {
    public run_manager(room: Room) {
        this.build_extension(room);
        this.build_mining_containers(room);
    }
    private build_mining_containers(room: Room) {
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
        // check if we need mining containers
        // find the sources
        let sources = room.find(FIND_SOURCES);
        // create a container next to the sources
        for (let source of sources) {
            let area_look = room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true);
            let container_filter = _.filter(area_look, (point) => point.structure?.structureType == STRUCTURE_CONTAINER || point.constructionSite?.structureType == STRUCTURE_CONTAINER);
            if (container_filter.length > 0) {
                continue;
            }
            // check each of the points and determine where a mining container should go
            // TODO: we can break this out into a utility function at some point
            for (let mod of surrounding_points) {
                let new_x = source.pos.x + mod[0];
                let new_y = source.pos.y + mod[1];
                let at_spot = room.lookAt(new_x, new_y);

                if (!at_spot.find(obj => obj.constructionSite || obj.structure)) {
                    if (at_spot.find(obj => obj.terrain == 'plain')) {
                        room.createConstructionSite(new_x, new_y, STRUCTURE_CONTAINER);
                        break;
                    }
                }
            }
        }
    }

    private build_extension(room: Room) {
        let diagonals = [
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1]
        ];

        /*
        Controller level
        2 	5 extensions (50 capacity)
        3 	10 extensions (50 capacity)
        4 	20 extensions (50 capacity)
        5 	30 extensions (50 capacity)
        6 	40 extensions (50 capacity)
        7 	50 extensions (100 capacity)
        8 	60 extensions (200 capacity)

        Test algo:
        * given a point, find the first diagonal at that point that's free
            * if there's a free one, build an extension there
            * if there is no free one, iterate through each of the diagonals and check their diagonals till you find a free space
        */
        let room_level = (room.controller == undefined) ? 0 : room.controller.level;
        let total_extension_count = (Math.max(0, (room_level - 2)) * 5) * 2;
        let current_extension_count = room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_EXTENSION } }).length;
        let current_construction_count = room.find(FIND_CONSTRUCTION_SITES, { filter: (site) => { return site.structureType == STRUCTURE_EXTENSION } }).length;

        let found_spot = false;
        // our target point will be our room spawn

        // do this loop till we have found a spot
        // TODO: we might need to add some bounds to this loop, otherwise we might run out of space? Need to handle errors more gracefully
        // put the spawn point in the queue
        let filled_spots = room.find(FIND_MY_SPAWNS) ? [room.find(FIND_MY_SPAWNS)[0].pos] : [];

        // check each of the diagonals, if it isn't free, push it onto a queue
        while (!found_spot && (current_extension_count + current_construction_count < total_extension_count) && filled_spots.length) {
            // TODO: is this magic ! the best way?
            let target_point = filled_spots.shift()!;

            // check each of the diagonals, if it isn't free, push it onto a queue
            diagonals.forEach(mod => {
                // TODO: I can combine these two lines into one, I don't need a RoomPosition object
                // TODO: can use a for loop like above instead of forEach
                let new_point: RoomPosition = new RoomPosition(target_point.x + mod[0], target_point.y + mod[1], room.name);
                let at_spot = room.lookAt(new_point);

                // check if the spot is a construction site or a structure, then validate that it's a plain
                // if it is, and we need one, put a construction site down and set found_spot to true
                if (!at_spot.find(obj => obj.constructionSite || obj.structure)) {
                    // checking whether we need more construction sites here to ensure we don't try to make more than are allowed
                    if (at_spot.find(obj => obj.terrain == 'plain') && !found_spot) {
                        room.createConstructionSite(new_point.x, new_point.y, STRUCTURE_EXTENSION);
                        console.log(`Trying new point: ${new_point} and found: ${room.lookAt(new_point)[0].terrain}`);
                        found_spot = true;
                    }
                }
                // otherwise, add the point to the queue to check next
                else {
                    filled_spots.push(new_point);
                    // console.log(`Bad point: ${new_point} found: ${room.lookAt(new_point)[0].terrain}`);
                }
            });
        }

    }

    private build_road() {

    }
}
