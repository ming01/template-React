//npm i react-text-mask react-number-format --save

import React from 'react'
import MaskedInput from 'react-text-mask';

function CardIdTextMask(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]}
        showMask
        placeholderChar={'\u2000'}
      />
    );
  }

export default CardIdTextMask
