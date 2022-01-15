export class ToolScripts {
    public remove_roads(room: Room) {
        let roads = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_ROAD;
            }
        });

        for (const road of roads) {
            road.destroy();
        }
    }
}
