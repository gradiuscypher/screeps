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

    public remove_unreachable_roads(room: Room) {
        let extensions = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION;
            }
        });

        for (const extension of extensions) {
            let room_pos = room.lookAt(extension.pos);

            for (const pos of room_pos) {
                if (pos.constructionSite?.structureType == STRUCTURE_ROAD) {
                    pos.constructionSite.remove();
                }
            }

        }
    }
}
