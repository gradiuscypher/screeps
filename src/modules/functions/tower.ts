export class TowerController {
    // determine if we have any invaders
    // if invaders, which towers should shoot at what
    // no invaders, should we use energy to repair things
    public primary_function(room: Room) {
        let towers: StructureTower[] = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER;
            }
        });

        // check if we have any active towers
        if (towers) {
            for (let tower of towers) {
                let bad_creep = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

                if (bad_creep) {
                    tower.attack(bad_creep);
                }
            }
        }
    }
}
