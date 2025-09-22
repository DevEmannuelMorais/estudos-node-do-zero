export class DataBaseMemory {
    constructor(parameters) {
        
    }

    #videos = new Map();

    list(search) {

       return Array.from(this.#videos.entries())
       .map(ArrayVideos => {

        const id = ArrayVideos[0];
        const data = ArrayVideos[1];

    
            return {
                id: id,
                ...data
            }
        }).filter(video => {
            if (search) {
                return video.title.includes(search);
            }
            
            return true;
        })
        
    }

    create(video) {
        const id = crypto.randomUUID();

        this.#videos.set(id, video);
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id);
    }


}