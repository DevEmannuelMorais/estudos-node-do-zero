
import { sql } from "./db.js";

export class DataBasePostgres {
    constructor(parameters) {
        
    }

    /**
     * Return a list of videos based on the search parameter.
     * @param {string} search - The search term to filter videos by title.
     * @returns {Promise<Array<{id: string, title: string, description: string, duration: number}>>} - A promise that resolves with an array of video objects.
     */

    async list(search) {


        let videos;


        if (search) {
            videos = await sql`SELECT * FROM videos WHERE title ILIKE '%' || ${search} || '%' ` ;
        } else {
            videos = await sql`SELECT * FROM videos`;
        }

        return videos;
    }

    async create(video) {

        const id = crypto.randomUUID();

        await sql`INSERT INTO videos (id, title, description, duration) VALUES (${id}, ${video.title}, ${video.description}, ${video.duration})`;
    }

    async update(id, video) {

        await sql`UPDATE videos SET title = ${video.title}, description = ${video.description}, duration = ${video.duration} WHERE id = ${id}`;
    }

    async delete(id) {

        await sql`DELETE FROM videos WHERE id = ${id}`;
    }


}