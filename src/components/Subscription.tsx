import * as React from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { SubscriptionComponent } from './SubscriptionComponent';
import { IResourceProps } from './Resources.types';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const Subscription: React.FC<IResourceProps> = ({createResource}) => {

  const [SubscriptionParameters,setSubscriptionParameters] =  React.useState([<SubscriptionComponent createResource={createResource}/>]);
  let handleAddPerson = (e: any) => {
    e.preventDefault()
    setSubscriptionParameters([...SubscriptionParameters,<SubscriptionComponent createResource={createResource}/>]);
}
  return (
    <>
    <br/>
    <br/>
    <br/>
    <form id='registrationForm'>
        {SubscriptionParameters}
        <br/>
        <button onClick={handleAddPerson}  className="btn btn-main mt-2"><i className="fas fa-plus"></i> ADD PERSON</button>
    </form>
    <br/>
    <br/>
    <br/>
    </>
)
};
