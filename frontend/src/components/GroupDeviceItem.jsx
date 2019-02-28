import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { devicePropType } from '../constants';

export default class GroupDeviceItem extends PureComponent {
  handleDelete = async () => {
    const {device, onUpdate, onRemove } = this.props;
    onRemove(device.id);
    onUpdate();
  };

  render() {
    const {index, device} = this.props;

    return (
      <tr key={device.id}>
        <th scope="row">{index}</th>
        <td>{device.name}</td>
        <td>{device.address}:{device.port}</td>
        <td>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
          </div>
        </td>
      </tr>
    )
  }
}

GroupDeviceItem.defaultProps = {
  onUpdate: () => {
  }
};

GroupDeviceItem.propTypes = {
  device: devicePropType.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func
};
