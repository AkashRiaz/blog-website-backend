import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileRemover =(filename)=>{
      fs.unlink(path.join(__dirname, `../uploads`, filename), function(err){
        if(err && err.code == 'ENOENT') {
            // file doesn't exist
            console.log(`file ${filename} doesn't exist, wont remove it`)
        }else if(err){
            console.log(`Error occurred while trying to remove file ${filename}`)
        }else{
            console.log(`file ${filename} removed successfully`)
        }
      })
}

export {fileRemover};