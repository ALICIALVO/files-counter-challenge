import fs from 'fs/promises';
// path: constructing file paths to handles platform-specific path separators / & ensures that the resulting path is correctly formatted:
import path from 'path';

// main folder path:
const DIR_PATH = './nodem-clone-folder';

            // 1. Define a async function countFilesRecursively that accept(directoryPath) as parameter:
async function countFilesRecursively(DIR_PATH){
        try{

            // 2. Initialize a variable fileCount to 0:
                    let fileCount = 0;
            // 3. Read the contents of the directory asynchronously at directoryPath (DIR_PATH):
                   const files = await fs.readdir(DIR_PATH);
                //    console.log(files);
            // 4. filter any files in the folder array that are not '.DS_Store' file type:
                                         // *filters out the 'DS_Store' files from the files array if true - into a new array 'filteredFiles'
                const filteredFiles = files.filter(file => file !== '.DS_Store');
                // console.log(filteredFiles);
            // 5. Loop trough each item in filteredItems new array:
                for (const file of filteredFiles) {
            // 6. Construct the full path of the file by joining DIR_PATH with the file using path.join():
                                            // *takes each segment as a separate argument and returns a normalized path string(both linox,macos/  and windows\).
                    const filePath = path.join(DIR_PATH, file);
                    // console.log(filePath);
            // 7. Get the file stats of the item asynchronously using fs.stat():
            const fileStats = await fs.stat(filePath);
                                      // * fs.stat() returns an object of metadata associated with that file.
                    // console.log(fileStats);
            // 8. If file is a file - Increment fileCount by 1:
            if (fileStats.isFile()) {
                                     // * isFile() return a boolean
                        fileCount++;
                        // 9. If the item is a directory: 
                      }else if (fileStats.isDirectory()) {
                                    // * isDirectory() return a boolean
                
                        // a. Recursively call countFilesRecursively with the subdirectory path:
                        // b. Add the returned count of files in the subdirectory to fileCount:
                        fileCount += await countFilesRecursively(filePath);
                                                          // * when recursively call to countFilesRecursively function with the path of the subdirectory (filePath) 
                                                          //  It calc the total num of files in that subdirectory.

                    } 
                    
                }
           // 10. Return the final value of fileCount:
                return fileCount;
                
           // 11. Catch any errors that occur during the execution of the try block and throw an error with a descriptive message:
            }catch(err){
                throw new Error(`Error counting files in ${DIR_PATH}: ${error.message}`);
                
            }
            
        }   
                
          // 12. Call countFilesRecursively with the 'DIR_PATH':
countFilesRecursively(DIR_PATH)
          // 13. Once the function completes, log the total count of files in the directory along with the directory path:
        .then((totalFileCount) => {
             console.log(`Total files in ${DIR_PATH}: ${totalFileCount}`);
        })

        .catch((err)=> {
            console.error(err);
        });










//     - For each item in the directory:
//         - Construct the full path of the item
//         - Check if the item is a file:
//             - If it is a file, increment fileCount by 1
//         - Check if the item is a directory:
//             - If it is a directory, recursively call countFilesRecursively with the subdirectory path
//             - Add the returned count of files in the subdirectory to fileCount
//     - Return the final value of fileCount

// 2. Call countFilesRecursively with the specified directory path

// 3. Once the function completes, the total count of files will be returned
