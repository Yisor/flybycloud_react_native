/*
 * @Author: lsl 
 * @Date: 2017-11-13 14:57:36 
 * @Last Modified by:   lsl 
 * @Last Modified time: 2017-11-13 14:57:36 
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FormProvider extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    form: PropTypes.object,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    form: PropTypes.object,
  };

  getChildContext() {
    return {
      form: this.props.form,
    };
  }
  render() {
    return React.Children.only(this.props.children);
  }
}
