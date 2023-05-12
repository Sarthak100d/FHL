const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const http = require('http');

const templateFolderPath = 'templateFiles/'; //this contains templates
const outputFolderPath = 'outTemplateFiles/'; //hardcode this
const stageFolderPath = 'stageTemplateFiles/'
const configFilePath = 'configFile/templateTypeConfig.json';
const inputObjectFilePath = 'InputObject/inputReqObjectDump.json';


/**register functions as variable*/
global.serviceBusQueue = serviceBusQueue;
global.serviceBusTopicSubscription = serviceBusTopicSubscription;
global.serviceBusTopic = serviceBusTopic;
global.keyVault = keyVault;
global.storageAccountBlob = storageAccountBlob;
global.storageAccountFileshare = storageAccountFileshare;
global.azureFunction = azureFunction;
global.msSql = msSql;

/**Map to contain resource type and function variable mapping */
var resourceFunctionMap = null;


/**For Testing create a valid JSON string */
//const jsonStr = "{\"resourceGroupName\":\"xyz\",\"serviceName\":\"abc\",\"serviceTreeId\":\"id\",\"region\":\"us-west\",\"resources\":[{\"id\":\"servicebus1\",\"type\":\"azure.service.topic.subscription\",\"params\":{\"serviceBusNamespaceName\":\"TestFHLServiceBus\",\"serviceBusTopicName\":\"FHLTestTopic\",\"serviceBusSubscriptionName\":\"FHLTestSubscription\"},\"dependsOn\":[]},{\"id\":\"keyvault1\",\"type\":\"azure.keyvault\",\"params\":{\"keyVaultName\":\"testKV\"}}]}";

//create JSON object and pass to Entry method
//const inputObject = JSON.parse(jsonStr);

/**Calling the Entry method from here for testing */
//console.log('Output Template zip name', extractArmTemplates(inputObject));



/**Entry Method to be Invoked by UI */
function extractArmTemplates(inputObject) {
  console.log('Inside extractArmTemplates');

  //load the config file into a map
  resourceFunctionMap = createFunctionMapFromJSON(configFilePath);
  
  //dump the object into a file to store the mandatory params
  fs.writeFile(inputObjectFilePath, JSON.stringify(inputObject), (error) => {
      if (error) throw error;
    });


  var resourceObject = inputObject["resources"];
  var functionVar = null;  
  for(let i=0; i<resourceObject.length; i++)
  {
      try {
        console.log('here');
        console.log('print balue:',resourceFunctionMap.get(resourceObject[i].type));
        functionVar = resourceFunctionMap.get(resourceObject[i].type);
        if(typeof functionVar === "function")
        {
            console.log('calling func with params: ', resourceObject[i].params);
            functionVar(resourceObject[i].params);
        }
       
      } catch (error) {
          console.log("Incorrect resource type passed", error);
          
      }
      
  }


   //create zip and copy to outputFolder
  return createZip(stageFolderPath, outputFolderPath);

   //removeFolderContents(stageFolderPath);
}





 function serviceBusQueue(paramsObject) {


    const matchingTemplateFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusQueue') && file.endsWith('Template.json'));
    const matchinfParameterFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusQueue') && file.endsWith('Parameter.json'));
    
    //copy the corresponding template and parameter file to the destination folder and update 
    //the parameters with users value
    copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
  };
  
  
  function serviceBusTopic(paramsObject) {
  
    const matchingTemplateFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusTopic') && file.endsWith('Template.json'));
    const matchinfParameterFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusTopic') && file.endsWith('Parameter.json'));
  
    //copy the corresponding template and parameter file to the destination folder and update 
    //the parameters with users value
    copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
  };
  
  
  
  function serviceBusTopicSubscription(paramsObject) {
  
    const matchingTemplateFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusTopicSubscription') && file.endsWith('Template.json'));
    const matchinfParameterFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusTopicSubscription') && file.endsWith('Parameter.json'));
  
    //copy the corresponding template and parameter file to the destination folder and update 
    //the parameters with users value
    copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
  };


  function msSql(paramsObject) {
  
    const matchingTemplateFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('TestCosmicSvcSQLServer') && file.endsWith('Template.json'));
    const matchinfParameterFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('TestCosmicSvcSQLServer') && file.endsWith('Parameter.json'));
  
    //copy the corresponding template and parameter file to the destination folder and update 
    //the parameters with users value
    copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
  };

  function keyVault(paramsObject) {
  
    const matchingTemplateFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('KeyVault') && file.endsWith('Template.json'));
    const matchinfParameterFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('KeyVault') && file.endsWith('Parameter.json'));
  
    //copy the corresponding template and parameter file to the destination folder and update 
    //the parameters with users value
    copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
  };


  function storageAccountBlob(paramsObject) {
  
    const matchingTemplateFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('BlobStorageAccount') && file.endsWith('Template.json'));
    const matchinfParameterFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('BlobStorageAccount') && file.endsWith('Parameter.json'));
  
    //copy the corresponding template and parameter file to the destination folder and update 
    //the parameters with users value
    copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
  };


  function storageAccountFileshare(paramsObject) {
  
    const matchingTemplateFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('FileshareStorageAccount') && file.endsWith('Template.json'));
    const matchinfParameterFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('FileshareStorageAccount') && file.endsWith('Parameter.json'));
  
    //copy the corresponding template and parameter file to the destination folder and update 
    //the parameters with users value
    copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
  };


  function azureFunction(paramsObject) {
  
    const matchingTemplateFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('AzureFunction') && file.endsWith('Template.json'));
    const matchinfParameterFile = fs.readdirSync(templateFolderPath).find(file => file.startsWith('AzureFunction') && file.endsWith('Parameter.json'));
  
    //copy the corresponding template and parameter file to the destination folder and update 
    //the parameters with users value
    copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
  };




function createFunctionMapFromJSON(jsonFilePath) {
    const fileContents = fs.readFileSync(jsonFilePath, 'utf-8');
    const json = JSON.parse(fileContents);
  
    const functionMap = new Map();
    for (const key in json) {
      
        const value = json[key];
        if (typeof value === 'string' && typeof global[value] === 'function') {
          functionMap.set(key, global[value]);
          console.log('key :', key, ' value: ',value, " g value: ",global[value])
        }
      
    }
  
    return functionMap;
  }



function createZip(sourcePath, destinationPath) {
  console.log('source path in zip method: ',sourcePath);
  console.log('dest path in zip method:',destinationPath);

    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const zipName = `TemplatesArchive_${timestamp}.zip`;
  
    const output = fs.createWriteStream(path.join(destinationPath, zipName));
    const archive = archiver('zip', { zlib: { level: 9 } });
  
    output.on('close', () => {
      console.log('Zip creation completed.');
    });
  
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        throw err;
      }
    });
  
    archive.on('error', (err) => {
      throw err;
    });
  
    archive.pipe(output);
  
    archive.directory(sourcePath, false);
  
    archive.finalize();

    return zipName;
 }



function replacePlaceholdersInFile(filePath, replacements) {
  //console.log('replacements rcvd: ', replacements);
  try {
    // Read the file contents
    let data = fs.readFileSync(filePath, 'utf8');

    // Perform the replacements
    for (const key in replacements) {
      const placeholder = `{{${key}}}`;
      const replacement = replacements[key];
      //console.log('In placeholderss : key: ',key, ' : replacement : ',replacement);
      data = data.replace(new RegExp(placeholder, 'g'), replacement);
    }

    // Write the modified data back to the file
    fs.writeFileSync(filePath, data, 'utf8');
    console.log('Placeholders replaced successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}


  function copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject) {

    if (matchingTemplateFile &&  matchinfParameterFile) {

        // Copy the template file to the stage folder
        var sourceTemplateFilePath = path.join(templateFolderPath, matchingTemplateFile);
        var destinationTemplateFilePath = path.join(stageFolderPath, matchingTemplateFile);
        fs.copyFileSync(sourceTemplateFilePath, destinationTemplateFilePath);
    
        //copy parameter file to stage folder
    
        var sourceParamFilePath = path.join(templateFolderPath, matchinfParameterFile);
        var destinationParamFilePath = path.join(stageFolderPath, matchinfParameterFile);
        fs.copyFileSync(sourceParamFilePath, destinationParamFilePath);
      
      
        // Replace values of parameter file with the values passed by user
        replacePlaceholdersInFile(destinationParamFilePath, paramsObject);
    
        console.log('File copied and updated successfully.');
      } else {
        console.log('Either no matching template file or parameter file found.');
      }

}


function removeFolderContents(folderPath) {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder contents:', err);
        return;
      }
  
      files.forEach(file => {
        const filePath = path.join(folderPath, file);
  
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', filePath, err);
          } else {
            console.log('File deleted:', filePath);
          }
        });
      });
    });
  }

  



/**Export the method */
  module.exports = {
    extractArmTemplates
  };