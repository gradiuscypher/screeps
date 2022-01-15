import { ErrorMapper } from "utils/ErrorMapper";
import { Spawner } from "modules/functions/spawner";
import { Harvester } from "modules/creeps/harvester";
import { Miner } from "modules/creeps/miner";
import { Upgrader } from "modules/creeps/upgrader";
import { Builder } from "modules/creeps/builder";
import { Construction } from "modules/functions/construction";
import { Summary } from "modules/functions/summary";
import { HelperFunctions } from "utils/HelperFunctions"
import { TowerController } from "modules/functions/tower";
import { ToolScripts } from "utils/ToolScripts";

let spawn_manager = new Spawner;
let construction_manager = new Construction();
let summary_manager = new Summary();
let helper = new HelperFunctions();
let tower_controller = new TowerController();
let tool_scripts = new ToolScripts;


declare global {
    /*
      Example types, expand on these or remove them and add your own.
      Note: Values, properties defined here do no fully *exist* by this type definiton alone.
            You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

      Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
      Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
    */
    // Memory extension samples
    interface Memory {
        uuid: number;
        log: any;
    }

    interface CreepMemory {
        role: string;
        room: string;
        working: boolean;
        task: string;
    }

    // Syntax for adding proprties to `global` (ex "global.log")
    namespace NodeJS {
        interface Global {
            log: any;
        }
    }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }


    // TODO: this is very single room centric, need to adjust this later
    let troom = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;

    // room summary every 5 ticks
    summary_manager.room_summary(troom);

    // manage the construction required
    construction_manager.run_manager(troom);

    // manage our spawns and make sure we have what we need
    spawn_manager.check_spawns();

    tower_controller.primary_function(troom);

    // iterate through every creep and give it a job
    for (const name in Game.creeps) {
        let target_creep: Creep = Game.creeps[name];

        // do role things
        switch (target_creep.memory.role) {
            case 'harvester':
                let harvester = new Harvester(target_creep);
                harvester.harvest();
                break;
            case 'upgrader':
                let upgrader = new Upgrader(target_creep);
                upgrader.upgrade();
                break;
            case 'builder':
                let builder = new Builder(target_creep);
                builder.build();
                break;
            case 'miner':
                let miner = new Miner(target_creep);
                miner.primary_action();
                break;
        }
    }
});
