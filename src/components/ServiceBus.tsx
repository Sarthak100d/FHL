import * as React from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { ServiceBusComponent } from './ServiceBusComponent';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const ServiceBus: React.FunctionComponent = () => {

  const [serviceBusComponent,setServiceBusComponent] =  React.useState([<ServiceBusComponent/>]);
  let handleAddPerson = (e: any) => {
    e.preventDefault()
    setServiceBusComponent([...serviceBusComponent,<ServiceBusComponent/>]);
}
  return (
    <>
    <br/>
    <br/>
    <form id='registrationForm'>
        {serviceBusComponent}
        <br/>
        <button onClick={handleAddPerson}  className="btn btn-main mt-2"><i className="fas fa-plus"></i> ADD PERSON</button>
    </form>
    <br/>
    </>
)
};
