import React, { SyntheticEvent} from 'react';
import { Text, TextField, MaskedTextField } from '@fluentui/react';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { ServiceBus, ServiceBusParameters } from '../objects/ServiceBus.types';
import { ResourceTypes } from '../objects/CreateResource.types';
import { IResourceProps } from './Resources.types';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const ServiceBusComponent: React.FC<IResourceProps> = ({createResource}) => {
  let serviceBusObject = new ServiceBus();
  serviceBusObject.id = "Servicebus1";
  serviceBusObject.resourceType = ResourceTypes.SERVICE_BUS;
  serviceBusObject.params = new ServiceBusParameters();

  const onServiceBusName = (event: SyntheticEvent<HTMLElement, Event>) => {
    serviceBusObject.params!.serviceBusNamespaceName = (event.target as HTMLTextAreaElement).value;
  };

  const onServiceBusTopicName = (event: SyntheticEvent<HTMLElement, Event>) => {
    serviceBusObject.params!.serviceBusTopicName = (event.target as HTMLTextAreaElement).value;
  };

  return (

    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <br/>
       <Text >Add New Service Bus Details</Text>
      <Stack {...columnProps}>
        <TextField label="Service Bus Namespace Name" onChange={onServiceBusName}/>
        <TextField label="Service Bus Topic Name" onChange={onServiceBusTopicName}/>
        
      </Stack>
      <Stack {...columnProps}>
      <TextField label="Service Bus Queue Name" />
        <TextField label="Service Bus Namespace Name" />
        </Stack>
    </Stack>
  );
};
