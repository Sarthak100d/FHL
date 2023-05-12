import React, { SyntheticEvent} from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { IResourceProps } from './Resources.types';
import { Subscription, SubscriptionParameters } from '../objects/Subscription.types';
import { ResourceTypes } from '../objects/CreateResource.types';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const SubscriptionComponent: React.FC<IResourceProps> = ({createResource}) => {
  let sbscriptionObject = new Subscription;
  sbscriptionObject.id = "Subscription1";
  sbscriptionObject.resourceType = ResourceTypes.SERVICE_BUS;
  sbscriptionObject.params = new SubscriptionParameters();

  const onDisplayNameChange = (event: SyntheticEvent<HTMLElement, Event>) => {
    sbscriptionObject.params!.displayName = (event.target as HTMLTextAreaElement).value;
  };

  const onInitialOwnerChange = (event: SyntheticEvent<HTMLElement, Event>) => {
    sbscriptionObject.params!.initialOwnerPrincipalId = (event.target as HTMLTextAreaElement).value;
  };

  const onBillingScopeChange = (event: SyntheticEvent<HTMLElement, Event>) => {
    sbscriptionObject.params!.billingScope = (event.target as HTMLTextAreaElement).value;
  };

  const onBillingPCCodeChange = (event: SyntheticEvent<HTMLElement, Event>) => {
    sbscriptionObject.params!.billingPcCode = (event.target as HTMLTextAreaElement).value;
  };

  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <br/>
      <text>Add New Subscription Details</text>
      <Stack {...columnProps}>
        <TextField label="Display Name" onChange={onDisplayNameChange}/>
        <TextField label="Initial Owner PrincipalId" onChange={onInitialOwnerChange}/>
        <TextField label="Billing Scope" onChange={onBillingScopeChange}/>
        <TextField label="Billing PcCode" onChange={onBillingPCCodeChange}/>
      
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
