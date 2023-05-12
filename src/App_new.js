
import { writeFile, readdirSync, readFileSync, createWriteStream, readFile, copyFileSync } from 'fs';
import { join } from 'path';
import archiver from 'archiver';
const templateFolderPath = 'src\templateFiles'; //this contains templates
const outputFolderPath = 'src\outTemplateFiles'; //hardcode this
const stageFolderPath = 'src\stageTemplateFiles'
const configFilePath = 'src\configFile\templateTypeConfig.json';

var resourceFunctionMap = new Map;


const sampleObject = {
        resourceGroupName: 'xyz',
        serviceName: 'abc',
        serviceTreeId: 'id',
        region: 'us-west',
        resources: [
            {
                id: "servicebus1",
                type: "azure.servicebus.",
                params: {
                    serviceBusNamespaceName: 'TestFHLServiceBus',
                    serviceBusTopicName: 'FHLTestTopic',
                    serviceBusSubscriptionName: 'FHLTestSubscription'

                },
                dependsOn: ['keyvault1', 'etc']
            },
            {
                id: "database1",
                type: "azure.ms.sql",
                params: {
                }
            },
             {
                id: "keyvault1",
                type: "azure.keyvault",
                params: {
    
                }
            },
        ]
  };


  //Entry method
  export const extractArmTemplates = () => {

      console.log('Inside extractArmTemplates');
      var inputObject=sampleObject;
      //load the config file into a map
      loadConfigFile();
      
      //dump the object into a file to stote the mandatory params
      writeFile('src\stageTemplateFiles\inputObject.json', JSON.stringify(inputObject), (error) => {
          if (error) throw error;
        });
  
      //parse the objec
      const jsonObject = JSON.parse(inputObject);
  
      var resourceObject = jsonObject["resources"];
  
      for(let i=0; i<resourceObject.length; i++)
      {
          try {
              resourceFunctionMap.getKey(resourceObject[i].type)(resourceObject[i].params);    
          } catch (error) {
              console.log("Incorrect resource type passed");
              
          }
          
      }
  
       //create zip and copy to outputFolder
       createZip();  
  }




//register functions as variable

const serviceBusQueue = function handleServiceBusQueueTemplate(paramsObject) {

  const matchingTemplateFile = readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusQueue') && file.endsWith('Template.json'));
  const matchinfParameterFile = readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusQueue') && file.endsWith('Parameter.json'));
  
  //copy the corresponding template and parameter file to the destination folder and update 
  //the parameters with users value
  copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
};


const serviceBusTopic = function handleServiceBusTopicTemplate(paramsObject) {

  const matchingTemplateFile = readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusTopic') && file.endsWith('Template.json'));
  const matchinfParameterFile = readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusTopic') && file.endsWith('Parameter.json'));

  //copy the corresponding template and parameter file to the destination folder and update 
  //the parameters with users value
  copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
};



const serviceBusTopicSubscription = function handleServiceBusTopicSubscriptionTemplate(paramsObject) {

  const matchingTemplateFile = readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusTopicSubscription') && file.endsWith('Template.json'));
  const matchinfParameterFile = readdirSync(templateFolderPath).find(file => file.startsWith('ServiceBusTopicSubscription') && file.endsWith('Parameter.json'));

  //copy the corresponding template and parameter file to the destination folder and update 
  //the parameters with users value
  copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject);
};

/*var msSql = 
var keyVault
var storageAccountBlob
var storageAccountFileShare
var azureFunction*/

function loadConfigFile() {
    console.log('Inside loadConfigFile');
    var configJsonObject = null;
    try {
      const configContent = readFileSync(configFilePath, 'utf-8');
      configJsonObject = JSON.parse(configContent);
    }catch(error)
    {
        console.error('An error occurred  while reading the file or parsing the JSON: ',error);
    }
    resourceFunctionMap = new Map(Object.entries(configJsonObject));
    //Remove Later
    for (const key of resourceFunctionMap.keys()) {
        console.log(key);
    }
}


function createZip() {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const zipName = `TemplatesArchive_${timestamp}.zip`;
  
    const output = createWriteStream(join(outputFolderPath, zipName));
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
  
    archive.directory(stageFolderPath, false);
  
    archive.finalize();
  }




function replacePlaceholdersInFile(filePath, replacements) {
    // Read the file contents
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
  
   
      // Perform the replacements
      let modifiedData = data;
      for (const key in replacements) {
        const placeholder = `{{PLACEHOLDER}}`;
        const replacement = replacements[key];
        modifiedData = modifiedData.replace(new RegExp(placeholder, 'g'), replacement);
      }
  
      // Write the modified data back to the file
      writeFile(filePath, modifiedData, 'utf8', err => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('Placeholders replaced successfully!');
        }
      });
    });
  }



function copyAndUpdateTemplateParameterFile(matchingTemplateFile, matchinfParameterFile, paramsObject) {

    if (matchingTemplateFile &&  matchinfParameterFile) {

        // Copy the template file to the stage folder
        var sourceFilePath = join(templateFolderPath, matchingTemplateFile);
        var destinationFilePath = join(outputFolderPath, matchingTemplateFile);
        copyFileSync(sourceFilePath, destinationFilePath);
    
        //copy parameter file to stage folder
    
        sourceFilePath = join(templateFolderPath, matchinfParameterFile);
        destinationFilePath = join(stageFolderPath, matchinfParameterFile);
        copyFileSync(sourceFilePath, destinationFilePath);
      
      
        // Replace values of parameter file with the values passed by user
        replacePlaceholdersInFile(destinationFilePath, paramsObject);
    
        console.log('File copied and updated successfully.');
      } else {
        console.log('Either no matching template file or parameter file found.');
      }

}



 
//outputFolderPath.timestamp.zip





