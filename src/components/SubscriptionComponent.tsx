import * as React from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const SubscriptionComponent: React.FunctionComponent = () => {
  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <br/>
      <text>Add New Subscription Details</text>
      <Stack {...columnProps}>
        <TextField label="Display Name" />
        <TextField label="Initial Owner PrincipalId" />
        <TextField label="Billing Scope" />
        <TextField label="Billing PcCode" />
      
      </Stack>
      <Stack {...columnProps}>

      <TextField label="Billing Cost Category" />
        <TextField label="Billing Airs RegId" />
        <TextField label="Back filled SubsId" />
        <TextField label="Role Assignment" />
        </Stack>

    </Stack>
  );
};
