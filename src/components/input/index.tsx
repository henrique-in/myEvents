import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';

import { Input, InputProps } from '@rneui/themed';
import { colors } from '~/theme/colors';

interface InputFormProps extends InputProps {
   error?: any;
   editable?: boolean;
   disabled?: boolean;
}

const STYLES = {
   ERROR_STYLE: {
      color: colors.errors,
   } as ViewStyle,
};

export const InputForm: React.FC<InputFormProps> = ({
   error,
   editable = true,
   disabled,
   ...rest
}) => {
   const [focused, setFocused] = useState(false);

   const Focus = () => {
      setFocused(!focused);
   };

   const inputContainerStyle = {
      ...(focused
         ? editable && { borderColor: colors.primary }
         : !editable && { borderColor: 'transparent' }),
   };

   return (
      <Input
         {...rest}
         onFocus={Focus}
         onBlur={Focus}
         style={{ color: colors.pallete.black }}
         inputContainerStyle={inputContainerStyle}
         errorStyle={STYLES.ERROR_STYLE}
         autoCapitalize="none"
         autoCorrect={false}
         editable={editable}
         errorMessage={error ? error : ''}
         disabled={disabled}
      />
   );
};
