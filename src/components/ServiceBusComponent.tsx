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

export const ServiceBusComponent: React.FunctionComponent = () => {
  return (

    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <br/>
       <Text >Add New Service Bus Details</Text>
      <Stack {...columnProps}>
        <TextField label="Service Bus Namespace Name" />
        <TextField label="Service Bus Topic Name" />
        
      </Stack>
      <Stack {...columnProps}>
      <TextField label="Service Bus Queue Name" />
        <TextField label="Service Bus Namespace Name" />
        </Stack>
    </Stack>
  );
};
