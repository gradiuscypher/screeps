export class Spawner {
    public check_spawns() {
        // max role settings
        const MAX_BUILDERS = 4;
        const MAX_HARVESTERS = 4;
        const MAX_UPGRADERS = 4;
        const MAX_MINERS = 2;
        const MAX_TRANSPORT = 3;
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
        let transports = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport');
        let room = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;
        let timestamp = Game.time.toString();

        // if nothing else can spawn and we have no creeps, we need simple harvesters
        // if (room.energyAvailable >= REQ_ENERGY && Object.keys(Game.creeps).length <= 2) {
        // TODO: clean up hack to emergency spawn harvesters
        if (room.energyAvailable >= REQ_ENERGY && harvesters.length < MAX_HARVESTERS) {
            Game.spawns['Spawn1'].spawnCreep(HARVESTER_BP, 'h' + timestamp, { memory: { role: 'harvester', room: room.name, working: false, task: '', destination: '' } });
        }

        // otherwise, spawn regular roles
        // compare the role counts to the current screeps and adjust as needed
        else if (room.energyAvailable >= room.energyCapacityAvailable / 2) {
            if (harvesters.length < MAX_HARVESTERS) {
                let body = this.generate_blueprint('worker', room.energyCapacityAvailable);
                let result = Game.spawns['Spawn1'].spawnCreep(body, 'h' + timestamp, { memory: { role: 'harvester', room: room.name, working: false, task: '', destination: '' } });
            }
            else if (miners.length < MAX_MINERS) {
                let body = this.generate_blueprint('miner', room.energyCapacityAvailable);
                Game.spawns['Spawn1'].spawnCreep(body, 'm' + timestamp, { memory: { role: 'miner', room: room.name, working: false, task: '', destination: '' } });
            }
            if (transports.length < MAX_TRANSPORT) {
                let body = this.generate_blueprint('transport', room.energyCapacityAvailable);
                let result = Game.spawns['Spawn1'].spawnCreep(body, 't' + timestamp, { memory: { role: 'transport', room: room.name, working: false, task: '', destination: '' } });
            }
            else if (builders.length < MAX_BUILDERS) {
                let body = this.generate_blueprint('worker', room.energyCapacityAvailable);
                Game.spawns['Spawn1'].spawnCreep(body, 'b' + timestamp, { memory: { role: 'builder', room: room.name, working: false, task: '', destination: '' } });
            }
            else if (upgraders.length < MAX_UPGRADERS) {
                let body = this.generate_blueprint('worker', room.energyCapacityAvailable);
                Game.spawns['Spawn1'].spawnCreep(body, 'u' + timestamp, { memory: { role: 'upgrader', room: room.name, working: false, task: '', destination: '' } });
            }
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
        // TODO: need more granular control for more expensive parts
        let creep_body: BodyPartConstant[] = [];
        let part_count = 0;
        let move_count = 0;
        let remainder = 0;

        switch (role) {
            case 'worker':
                // generic worker to repair, upgrade, etc
                part_count = Math.max(1, Math.floor((available_energy / 2) / 100));
                move_count = Math.floor(part_count / 2);
                remainder = part_count - move_count;
                creep_body.push(...Array(move_count).fill(MOVE));
                creep_body.push(...Array(Math.floor(remainder / 2)).fill(WORK));
                creep_body.push(...Array(Math.floor(remainder / 2)).fill(CARRY));
                return creep_body;
            case 'miner':
                part_count = Math.max(1, Math.floor((available_energy / 2) / 100));
                move_count = Math.floor(part_count / 3);
                remainder = part_count - move_count;
                creep_body.push(...Array(move_count).fill(MOVE));
                creep_body.push(...Array(remainder).fill(WORK));
                return creep_body;
            case 'transport':
                part_count = Math.max(1, Math.floor((available_energy / 2) / 50));
                move_count = Math.floor(part_count / 2);
                remainder = part_count - move_count;
                creep_body.push(...Array(move_count).fill(MOVE));
                creep_body.push(...Array(remainder).fill(CARRY));
                return creep_body;
        }

        return [WORK, MOVE, CARRY];
    }
}
