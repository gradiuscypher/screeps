export class Summary {
    public room_summary(room: Room, tick_rate = 5) {
        if (Game.time % tick_rate == 0) {
            let summary_string = "";
            summary_string += `[${Game.time}] `;
            summary_string += `E:${room.energyAvailable}/${room.energyCapacityAvailable} `;
            summary_string += `S:${Object.keys(Game.creeps).length} `;
            summary_string += `C:(${room.controller?.ticksToDowngrade}) ${room.controller?.progress}/${room.controller?.progressTotal}`;
            console.log(summary_string);
        }
    }
}
