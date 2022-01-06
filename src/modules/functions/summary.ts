export class Summary {
    public room_summary(room: Room, tick_rate = 5) {
        if (Game.time % tick_rate == 0) {
            let summary_string = "";
            summary_string += `[${Game.time}] `;
            summary_string += `E:${room.energyAvailable}/${room.energyCapacityAvailable} `;
            summary_string += `C:${Object.keys(Game.creeps).length}`
            console.log(summary_string);
        }
    }
}
