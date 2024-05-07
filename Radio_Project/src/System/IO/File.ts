import fs, {readFileSync} from "fs";
import Logger from "../core/Logger";
let Log = new Logger("[FILE MANAGER]");
export function ReadFile(filename:string){
    try {
        let p = fs.readFileSync(filename);
        Log.success("SUCCESSFULLY READ FILE: "+ filename);
        return p.toString();
    }catch (err){
        Log.error("Could Not Read File: "+ filename);
        return null;
    }
}

export function ReadRawFile(filename:string){
    try {
        let p = fs.readFileSync(filename);
        return p;
    }catch (err){
        Log.error("Could Not Read File: "+ filename);
        return null;
    }
}

export function WriteFile(name:string,data:any){
    fs.writeFile(String(name), data, err => {
        if (err) {
            Log.error("CANNOT WRITE FILE: "+ name);
            return false;
        } else {
            // file written successfully
            Log.success("Successfully Created File: "+ name);
            return true;
        }
    });
}