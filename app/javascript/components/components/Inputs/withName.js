import React from 'react';
import {makeName} from '@utils'

export default (WrappedComponent) => ({root, name, ...props}) => <WrappedComponent {...props} name={makeName(root,name)} />
