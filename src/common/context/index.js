/*
 * @Author: jujube
 * @Date: 2019-12-09 00:08
 * @Description: Context Connect function
 * @Last Modified time: 2019-12-09 00:08
 */

import * as React from 'react';

const Context = React.createContext({
});

export default Context;

export const connect = Target => class consumer extends React.Component {
  render() {
    return <Context.Consumer>{context => <Target {...this.props} context={context} />}</Context.Consumer>;
  }
};
