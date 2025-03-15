import Database from 'better-sqlite3';

const db = new Database('noodle.db');
console.log("Database connection Successful");

export function getNextPhrase(): string {
    try {
        const stmt = db.prepare(`
            SELECT phrase 
            FROM catchphrases 
            WHERE usage_count = (SELECT MIN(usage_count) FROM catchphrases) 
            ORDER BY RANDOM() 
            LIMIT 1
        `);
        const result = stmt.get() as { phrase: string } | undefined;
    
        if (!result) {
            console.log("Failed to return a phrase from the DB");
            throw new Error("Failed to find phrase");
        }
    
        incrementPhrase(result.phrase);
        return result.phrase;
    } catch (error) {
        console.log("Database error:", error);
        throw error;
    }
    }
    

function incrementPhrase(phrase: string) {
    const stmt = db.prepare(`
        UPDATE catchphrases 
        SET usage_count = usage_count + 1, 
            updated_at = DATE('now') 
        WHERE phrase = ?
    `);
    stmt.run(phrase);
    console.log("Incremented the usage_count of phase: " + phrase)
}

export function getNextResponse(): string {
    try {
        const stmt = db.prepare(`
            SELECT response 
            FROM commentResponses 
            WHERE usage_count = (SELECT MIN(usage_count) FROM commentResponses) 
            ORDER BY RANDOM() 
            LIMIT 1
        `);
        const result = stmt.get() as { response: string } | undefined;
    
        if (!result) {
            console.log("Failed to return a response from the DB");
            throw new Error("Failed to find response");
        }
    
        incrementResponse(result.response);
        return result.response;
    } catch (error) {
        console.log("Database error:", error);
        throw error;
    }
}

function incrementResponse(response: string) {
    const stmt = db.prepare(`
        UPDATE commentResponses 
        SET usage_count = usage_count + 1, 
            updated_at = DATE('now') 
        WHERE response = ?
    `);
    stmt.run(response);
    console.log("Incremented the usage_count of response: " + response)
}