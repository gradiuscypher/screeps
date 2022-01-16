export class Spawner {
    public check_spawns() {
        // max role settings
        const MAX_BUILDERS = 2;
        const MAX_HARVESTERS = 4;
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
        let timestamp = Game.time.toString();
        if (room.energyAvailable >= room.energyCapacityAvailable / 2) {

            if (harvesters.length < MAX_HARVESTERS) {
                let body = this.generate_blueprint('worker', room.energyCapacityAvailable);
                let result = Game.spawns['Spawn1'].spawnCreep(body, 'h' + timestamp, { memory: { role: 'harvester', room: room.name, working: false, task: '' } });
            }
            else if (builders.length < MAX_BUILDERS) {
                let body = this.generate_blueprint('worker', room.energyCapacityAvailable);
                Game.spawns['Spawn1'].spawnCreep(body, 'b' + timestamp, { memory: { role: 'builder', room: room.name, working: false, task: '' } });
            }
            else if (upgraders.length < MAX_UPGRADERS) {
                let body = this.generate_blueprint('worker', room.energyCapacityAvailable);
                Game.spawns['Spawn1'].spawnCreep(body, 'u' + timestamp, { memory: { role: 'upgrader', room: room.name, working: false, task: '' } });
            }
            else if (miners.length < MAX_MINERS) {
                let body = this.generate_blueprint('miner', room.energyCapacityAvailable);
                Game.spawns['Spawn1'].spawnCreep(body, 'm' + timestamp, { memory: { role: 'miner', room: room.name, working: false, task: '' } });
            }
        }
        else if (room.energyAvailable >= REQ_ENERGY && Object.keys(Game.creeps).length <= 0) {
            Game.spawns['Spawn1'].spawnCreep(HARVESTER_BP, 'h' + timestamp, { memory: { role: 'harvester', room: room.name, working: false, task: '' } });
        }
    }

    /**
     * Generates a blueprint for creep's body based on parameters
     *
     * @private
     * @param role - what role are we generating
     * @param available_energy - how much energy is available to spawn
     * @param roads - does the base have roads
     * @memberof Spawner
     */
    public generate_blueprint(role: string, available_energy: number, roads = true) {
        let part_count = Math.floor(Math.floor(available_energy / 200) / 3);
        let creep_body: BodyPartConstant[] = [];

        switch (role) {
            case 'worker':
                // generic worker to repair, upgrade, etc
                creep_body.push(...Array(part_count).fill(WORK));
                creep_body.push(...Array(part_count).fill(CARRY));
                creep_body.push(...Array(part_count).fill(MOVE));
                return creep_body;
            case 'miner':
                creep_body.push(...Array(part_count * 2).fill(WORK));
                creep_body.push(...Array(part_count).fill(MOVE));
                return creep_body;
            case 'transport':
                creep_body.push(...Array(part_count * 2).fill(CARRY));
                creep_body.push(...Array(part_count).fill(MOVE));
                return creep_body;
        }

        return [WORK, MOVE, CARRY];
    }
}
