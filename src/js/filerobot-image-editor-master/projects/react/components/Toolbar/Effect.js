import React, { Component } from 'react';
import { EffectWrapper, EffectIcon, EffectLabel} from '../../styledComponents';
import { getLabel, getIcon } from '../../utils';


export default class extends Component {


  render() {
    const { active, name, onApplyEffects } = this.props;

    return (
      <EffectWrapper active={active === name} onClick={onApplyEffects.bind(null, name)}>
        <EffectIcon src={getIcon(name)}/>
        <EffectLabel>{getLabel(name)}</EffectLabel>
      </EffectWrapper>
    )
  }
}