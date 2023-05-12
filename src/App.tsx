import React, { SyntheticEvent} from 'react';
import { Stack, Text,TextField, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles ,IStackProps} from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { PeoplePickerControlledExample } from './components/ResourceSelector';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { CreateResourceParameters } from './objects/CreateResource.types';
import { Resources } from './components/Resources';
import FileSaver from 'file-saver';


const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};

let createResource: CreateResourceParameters =  new CreateResourceParameters();

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 10 },
  styles: { root: { width: 300 } },
};
function _alertClicked(): void {
  alert('Clicked');
};
const downloadFile = () => {
  // Path to your local ZIP file
  const fileUrl = '/output/ResourceSelector.zip';
  
  // Fetch the file as a Blob object
  fetch(fileUrl)
    .then((response) => response.blob())
    .then((blob) => {
      // Save the Blob object as a file using FileSaver.js
      FileSaver.saveAs(blob, 'output.zip');
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    })
}

const onServiceNameChange = (event: SyntheticEvent<HTMLElement, Event>) => {
  createResource.serviceName = (event.target as HTMLTextAreaElement).value;
};

const onServiceIdChange = (event: SyntheticEvent<HTMLElement, Event>) => {
  createResource.serviceName = (event.target as HTMLTextAreaElement).value;
};

const onResourceGrpChange = (event: SyntheticEvent<HTMLElement, Event>) => {
  createResource.resourceGroupName = (event.target as HTMLTextAreaElement).value;
};

const onOwnerChange = (event: SyntheticEvent<HTMLElement, Event>) => {
  createResource.owner = (event.target as HTMLTextAreaElement).value;
};


export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
export const App: React.FunctionComponent = () => {
  const [toggle, setToggle] = React.useState<(boolean)>(true);
  const [list, setList] = React.useState([]);
  const onclickFunction = () => { 
    setToggle(false);

  }
  return (
    <Stack verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
      <Text variant="xxLarge" styles={boldStyle}>
        Welcome to Azure Cloud Designer
      </Text>
      <Stack {...columnProps}>
      <TextField label="Service Name " required underlined onChange={onServiceNameChange}/>
      <TextField label="Service Identifier " required underlined onChange={onServiceIdChange} />
      </Stack>
      <Stack {...columnProps}>
      <TextField label="Resource Group Name " required underlined onChange={onResourceGrpChange}/>
      <TextField label="Owner " required underlined onChange={onOwnerChange}/>
      </Stack>  
      <Text >Select the Resource To Generate Templates</Text>
      {toggle?<PeoplePickerControlledExample createResource={createResource}/>:<Resources createResource={createResource}/>}
      <Stack horizontal tokens={stackTokens}>
      <PrimaryButton text="Next" onClick={onclickFunction} />
      <DefaultButton
        text="Download"
        onClick={downloadFile}
      />
    </Stack>

    </Stack>
  );
};