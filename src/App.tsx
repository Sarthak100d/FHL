import React from 'react';
import { Stack, Text,TextField, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles ,IStackProps} from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { PeoplePickerControlledExample } from './components/ResourceSelector';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';


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
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 10 },
  styles: { root: { width: 300 } },
};
function _alertClicked(): void {
  alert('Clicked');
}

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
export const App: React.FunctionComponent = () => {
  return (
    <Stack verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
      <Text variant="xxLarge" styles={boldStyle}>
        Welcome to Azure Cloud Designer
      </Text>
      <Stack {...columnProps}>
      <TextField label="Service Name " required underlined/>
      <TextField label="Service Identifier " required underlined />
      </Stack>
      <Stack {...columnProps}>
      <TextField label="Resource Group Name " required underlined/>
      <TextField label="Owner " required underlined/>
      </Stack>  
      <Text >Select the Resource To Generate Templates</Text>

      <PeoplePickerControlledExample></PeoplePickerControlledExample>
      <Stack horizontal tokens={stackTokens}>
      <PrimaryButton text="Submit" onClick={_alertClicked} />
    </Stack>

    </Stack>
  );
};


