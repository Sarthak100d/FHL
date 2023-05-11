import * as React from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { StorageAccountComponent } from './StorageAccountComponent';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const StorageAccount: React.FunctionComponent = () => {

  const [StorageAccountParameters,setStorageAccountParameters] =  React.useState([<StorageAccountComponent/>]);
  let handleAddPerson = (e: any) => {
    e.preventDefault()
    setStorageAccountParameters([...StorageAccountParameters,<StorageAccountComponent/>]);
}
  return (
    <>
      <br/>
    <br/>
    <form id='registrationForm'>
        {StorageAccountParameters}
        <br/>
        <button onClick={handleAddPerson}  className="btn btn-main mt-2"><i className="fas fa-plus"></i> ADD PERSON</button>
    </form>
    <br/>
    <br/>
    </>
)
};
