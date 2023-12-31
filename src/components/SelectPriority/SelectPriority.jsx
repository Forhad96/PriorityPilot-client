import { Option, Select } from "@material-tailwind/react";

const SelectPriority = ({setPriority,defaultValue,priority}) => {
    return (
      <div>
        <Select
          onChange={(value) => setPriority(value)}
          color="teal"
          value={priority&&priority}
          // defaultValue={priority}
          label="Select priority"
        >
          <Option value="high">High</Option>
          <Option value="moderate">Moderate</Option>
          <Option value="low">Low</Option>
        </Select>
      </div>
    );
};
export default SelectPriority;

import PropTypes from 'prop-types';

SelectPriority.propTypes = {
    setPriority: PropTypes.func.isRequired,
    defaultValue:PropTypes.string
};