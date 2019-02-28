import React from 'react';
import PropTypes from 'prop-types';
import { devicePropType } from '../constants';

class ChooseDevice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        chosenDeviceId: ''
    }
  };

  componentDidMount() {
    this.setState({ chosenDeviceId: '' });
  };

  handleChange = (event) => {
    this.setState({ chosenDeviceId: event.target.value });
  };

  addDevice = () => {
    if (this.state.chosenDeviceId) {
        this.props.onChoose(this.state.chosenDeviceId);
        this.props.onClose();
    }
  };

  render() {

    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }} >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select a device to add</h5>
              <button type="button" className="close" data-dismiss="modal" onClick={this.props.onClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form>
                  <div className="form-group">
                    <label htmlFor="device">Device</label>
                    <select className="form-control form-control-lg" value={this.state.chosenDeviceId} onChange={this.handleChange} id="device" name="device">
	                  <option value="">No device selected</option>
	                  {this.props.devices.map( (device) => {
	                      return (<option key={device.id} value={device.id}>{device.name}</option>);
	                  })}
                    </select>
                  </div>
                </form>   
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addDevice}>Add</button>
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChooseDevice.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChoose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  devices: PropTypes.arrayOf(devicePropType)
};

export default ChooseDevice;
