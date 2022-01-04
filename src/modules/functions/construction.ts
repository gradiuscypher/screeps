export class Construction {
    public run_manager(room: Room) {
        this.build_extension(room);
    }
    private build_extension(room: Room) {
        let diagonals = [
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1]
        ]
        /*
        Controller level
        2 	5 extensions (50 capacity)
        3 	10 extensions (50 capacity)
        4 	20 extensions (50 capacity)
        5 	30 extensions (50 capacity)
        6 	40 extensions (50 capacity)
        7 	50 extensions (100 capacity)
        8 	60 extensions (200 capacity)
        */

        // find the extensions and and see if there's a free diagonal
        let extensions = room.find(FIND_CONSTRUCTION_SITES, { filter: { structureType: STRUCTURE_EXTENSION } });
        let spawns = room.find(FIND_MY_SPAWNS);

        let extcon = spawns[0].pos.findInRange(FIND_CONSTRUCTION_SITES, 1, { filter: { structureType: STRUCTURE_EXTENSION } });
        console.log(`extcon: ${extcon}`);
        // for (const extension in extensions) {
        //     console.log(`extensions: ${extensions[extension]}`);
        // }

        // if there are no current extensions in the room, find the spawn and find a free diagonal
        console.log(`spawns: ${spawns}`);

        // let spawn = Game.rooms[name].find(FIND_MY_SPAWNS)[0];

    }
    private build_road() {

    }
}
