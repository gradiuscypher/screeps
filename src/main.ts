import { ErrorMapper } from "utils/ErrorMapper";
import { Spawner } from "modules/functions/spawner";
import { Harvester } from "modules/creeps/harvester";
import { Upgrader } from "modules/creeps/upgrader";
import { Builder } from "modules/creeps/builder";

let spawn_manager = new Spawner;

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
    console.log(`Current game tick is ${Game.time}`);

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }

    // manage our spawns and make sure we have what we need
    spawn_manager.check_spawns();

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
        }
    }
});
