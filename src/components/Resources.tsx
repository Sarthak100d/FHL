import * as React from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { ServiceBus } from './ServiceBus';
import { StorageAccount } from './StorageAccount';
import { Subscription } from './Subscription';
import { IResourceProps } from './Resources.types';
import { CreateResourceParameters } from "../objects/CreateResource.types";


export const Resources: React.FC<IResourceProps> = ({createResource}) => {
  return (
    <><Stack>{createResource.serviceName}</Stack>
    <Stack>{createResource.resourceGroupName}</Stack>
    <Stack>{createResource.resourcesSelected.length}</Stack>
    <Stack>{createResource.resourcesSelected[0].id}</Stack>
    <Stack>{createResource.resourcesSelected[1].id}</Stack>
    <div><div><ServiceBus createResource = {createResource}/></div>
      <div> <StorageAccount createResource = {createResource}/></div>
      <div> <Subscription createResource = {createResource}/></div></div></>
)
}
