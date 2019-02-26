import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';

export default class GroupForm extends PureComponent {
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

  render() {
    const {group} = this.props;

    return (
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
