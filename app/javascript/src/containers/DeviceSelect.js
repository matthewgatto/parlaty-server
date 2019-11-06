import React from 'react';
import SelectField from '../components/SelectField';

const OPTIONS = [{value: "1", label: "Crank handle"}, {value: "2", label: "Part with Lock"}, {value: "3", label: "Blowtorch"}, {value: "4", label: "Pressure Washer"}, {value: "5", label: "Wrench"}]

const DeviceSelect = () => <SelectField label="Device*" name="device" form="step" options={OPTIONS} />

export default DeviceSelect;
