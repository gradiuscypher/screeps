export class Spawner {
    public check_spawns() {
        // max role settings
        const MAX_BUILDERS = 2;
        const MAX_HARVESTERS = 8;
        const MAX_UPGRADERS = 1;
        const MAX_MINERS = 2;
        const REQ_ENERGY = 200;

        // role blueprints
        const BUILDER_BP = [WORK, CARRY, MOVE, MOVE];
        const HARVESTER_BP = [WORK, CARRY, MOVE, MOVE];
        const UPGRADER_BP = [WORK, CARRY, MOVE, MOVE];
        const MINER_BP = [WORK, WORK, WORK, WORK, MOVE, MOVE];

        // count all the creeps
        // TODO: this is centric to a single room, so we'll wanna fix this soon
        // TODO: spawn name is hardcoded, lul
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        let room = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;

        // compare the role counts to the current screeps and adjust as needed
        if (room.energyAvailable >= REQ_ENERGY) {
            let timestamp = Game.time.toString();

            if (harvesters.length < MAX_HARVESTERS) {
                Game.spawns['Spawn1'].spawnCreep(HARVESTER_BP, 'h' + timestamp, { memory: { role: 'harvester', room: room.name, working: false, task: '' } });
            }
            else if (builders.length < MAX_BUILDERS) {
                Game.spawns['Spawn1'].spawnCreep(BUILDER_BP, 'b' + timestamp, { memory: { role: 'builder', room: room.name, working: false, task: '' } });
            }
            else if (upgraders.length < MAX_UPGRADERS) {
                Game.spawns['Spawn1'].spawnCreep(UPGRADER_BP, 'u' + timestamp, { memory: { role: 'upgrader', room: room.name, working: false, task: '' } });
            }
            else if (miners.length < MAX_MINERS && room.energyAvailable >= 500) {
                Game.spawns['Spawn1'].spawnCreep(MINER_BP, 'm' + timestamp, { memory: { role: 'miner', room: room.name, working: false, task: '' } });
            }
        }
    }

    /**
     * Generates a blueprint for creep's body based on parameters
     *
     * @private
     * @param {string} role - what role are we generating
     * @param {number} available_energy - how much energy is available to spawn
     * @param {boolean} roads - does the base have roads
     * @memberof Spawner
     */
    private generate_blueprint(role: string, available_energy: number, roads = true) {
        switch (role) {
            case 'worker':
                // generic worker to repair, upgrade, etc
                // m = ((w+c)/2)
                // w*100 + c*50 + ((w+c)/2)*50 = 2000
                // 100w + 50c +
                let work_parts = [WORK, CARRY];
                let move_parts = [MOVE];

                break;
            case 'miner':
                break;
            case 'transport':
                break;
        }
    }
}
