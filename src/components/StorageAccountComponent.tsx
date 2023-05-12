import React, { SyntheticEvent} from 'react';
import { Text, TextField, MaskedTextField } from '@fluentui/react';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { IResourceProps } from './Resources.types';
import { ResourceTypes } from '../objects/CreateResource.types';
import { StorageAccount, StorageAccountParameters } from '../objects/StorageAccount.types';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const StorageAccountComponent: React.FC<IResourceProps> = ({createResource}) => {
  let storageAccount = new StorageAccount();
  storageAccount.id = "StorageAccount1";
  storageAccount.resourceType = ResourceTypes.STORAGE_ACCOUNT_BLOB;
  storageAccount.params = new StorageAccountParameters();

  const onStorageAccountName = (event: SyntheticEvent<HTMLElement, Event>) => {
    storageAccount.params!.storageAccountName = (event.target as HTMLTextAreaElement).value;
  };

  const onKind = (event: SyntheticEvent<HTMLElement, Event>) => {
    storageAccount.params!.kind = (event.target as HTMLTextAreaElement).value;
  };

  return (

    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Text  >Add New Storage Account Details</Text>
      
      <Stack {...columnProps}>
        <TextField label="Storage Account Name" onChange={onStorageAccountName}/>
        <TextField label="kind" onChange={onKind}/>
        <TextField label="Subject Name" />
     
      </Stack>
      
      <Stack {...columnProps}>
      <TextField label="Subject Alternative Name" />
        <TextField label="Cert Issuer Name" />
        <TextField label="Cert Issuer Provider" />
        </Stack>
    </Stack>
  );
};
