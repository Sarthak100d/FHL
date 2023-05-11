import * as React from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { ServiceBus } from './ServiceBus';
import { StorageAccount } from './StorageAccount';
import { Subscription } from './Subscription';


export const Resources: React.FunctionComponent = () => {
  return (
   <div><div><ServiceBus/></div>
   <div> <StorageAccount/></div>
   <div> <Subscription/></div></div>
)
};
