export class Construction {
    public run_manager() {
        this.build_extension();
    }
    public build_extension() {
        /*
        Controller level
        2 	5 extensions (50 capacity)
        3 	10 extensions (50 capacity)
        4 	20 extensions (50 capacity)
        5 	30 extensions (50 capacity)
        6 	40 extensions (50 capacity)
        7 	50 extensions (100 capacity)
        8 	60 extensions (200 capacity)
        */
        for (const name in Game.rooms) {
            console.log(name);
            console.log("Burrito");
        }
    }
    public build_road() {

    }
}
