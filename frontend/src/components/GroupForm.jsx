import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';
import GroupDeviceItem from './GroupDeviceItem';
import {getDevices, getGroupDevices, addDeviceToGroup, removeDeviceFromGroup } from '../api';
import ChooseDevice from './ChooseDevice';

export default class GroupForm extends PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      groupDevices: [],
      allDevices: [],
      availableDevices: [],
      chooseDeviceModalIsOpen: false
    }
  };

  async componentDidMount() {
    this.setState({
      allDevices: await getDevices()
    });
    await this.refreshGroupDevices();
  };

  refreshGroupDevices = async() => {
    const groupId = this.props.group.id;
    if (groupId) {
      this.setState({ groupDevices: await getGroupDevices(groupId) });
    }
  };

  handleCancelClick = () => {
    window.history.back();
  };

  handleSubmit = (event) => {
    this.props.onSubmit({
      ...this.props.group,
      name: event.target.groupName.value
    });

    event.preventDefault();
  };

  chooseDevice = () => {
    const availableDevices = this.state.allDevices.filter(this.deviceIsNotInGroup);
    this.setState({
      chooseDeviceModalIsOpen: true,
      availableDevices: availableDevices
    });
  };

  deviceIsNotInGroup = (device) => {
    const groupDevices = this.state.groupDevices;
    return groupDevices.map(device => device.id).indexOf(device.id) === -1;
  };

  hideChooseDeviceModal = () => {
    this.setState({
      chooseDeviceModalIsOpen: false
    });
  }

  addDevice = async(deviceId) => {
    const groupId = this.props.group.id;
    if (groupId) {
      await addDeviceToGroup(groupId, deviceId);
    }
    this.refreshGroupDevices();
  };

  removeDevice = async(deviceId) => {
    const groupId = this.props.group.id;
    if (groupId) {
      await removeDeviceFromGroup(groupId, deviceId);
    }
    this.refreshGroupDevices();
  };

  render() {
    const {group} = this.props;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
          <label htmlFor="groupName">Group Name</label>
          <input type="text"
            className="form-control"
            id="groupName"
            name="groupName"
            placeholder="Group Name"
            required
            defaultValue={group.name}/>
          </div>

          <div className="float-right">
            <button type="submit" className="btn btn-primary mr-2">Submit</button>
            <button type="button" className="btn btn-default" onClick={this.handleCancelClick}>Cancel</button>
          </div>
        </form>

        <div className="row mt-2">
          <div className="col-3 offset-9">
            <button type="button" className="btn btn-primary float-right" onClick={this.chooseDevice}>Add device</button>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <table className="table">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.state.groupDevices.map((device, index) =>
                <GroupDeviceItem key={device.id} device={device} index={index + 1} onUpdate={this.refresh} onRemove={this.removeDevice}/>
              )}
              </tbody>
            </table>
          </div>
        </div>
        <ChooseDevice show={this.state.chooseDeviceModalIsOpen} devices={this.state.availableDevices}
          onClose={this.hideChooseDeviceModal} onChoose={this.addDevice}></ChooseDevice>
      </div>
    );
  }
}

GroupForm.defaultProps = {
  group: {
    name: '',
    devices: []
  }
};

GroupForm.propTypes = {
  group: groupPropType,
  onSubmit: PropTypes.func.isRequired
};
