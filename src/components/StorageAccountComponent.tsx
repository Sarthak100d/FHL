import * as React from 'react';
import { Text, TextField, MaskedTextField } from '@fluentui/react';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const StorageAccountComponent: React.FunctionComponent = () => {
  return (

    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Text  >Add New Storage Account Details</Text>
      
      <Stack {...columnProps}>
        <TextField label="Certificate Name" />
        <TextField label="Vault Base Url" />
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
