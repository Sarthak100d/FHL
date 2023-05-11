/*export const extractArmTemplates = () => {
    console.log('Inside extractArmTemplates');
    inputObject=sampleObject;
    loadConfigFile();

    //dump the object into a file to stote the mandatory params
    FileSystem.writeFile('src\stageTemplateFiles\inputObject.json', JSON.stringify(inputObject), (error) => {
        if (error) throw error;
      });

    //parse the object
    const jsonObject = JSON.parse(inputObject);

    var resourceObject = jsonObject["resources"];

    for(i=0;i<resourceObject.length;i++)
    {
        try {
            resourceFunctionMap.getKey(resourceObject[i].type)(resourceObject[i].params);    
        } catch (error) {
            console.log("Incorrect resource type passed");
            
        }
        
    }

     //create zip and copy to outputFolder
     createZip();
    
}*/

