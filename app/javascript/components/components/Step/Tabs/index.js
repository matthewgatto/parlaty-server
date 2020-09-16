import React, { useState } from 'react';
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getStepValues } from '@selectors/step'
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {ArrFileInput} from '@components/Inputs';
import DeviceSelect from '@containers/DeviceSelect';
import LoopForm from '@components/Step/LoopForm';
import { updateTabValues } from '@actions/form'

function TabPanel(props) {
  const { children, tab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tab !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {tab === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  tab: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: '0 4px 2px -2px rgba(0,0,0,0.12)',
    borderRadius: '.333em',
  },
}));

const CustTabs = withStyles({
  root: {
    minHeight: '40px',
  },
  indicator: {
    backgroundColor: '#67318d',
  },
})(Tabs);

const CustTab = withStyles({
  root: {
    minHeight: '40px',
    fontSize: '1.1em',
    fontWeight: '600',
    lineHeight: '1em',
    '&$selected': {
      color: '#67318d',
    }
  },
  selected: {
    color: '#67318d',
  },
  disabled: {
    backgroundColor: '#ddd',
  },
})(Tab);
function tabProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default ({ initialValues, formKey, root, procedure_id, idx, updateParams }) => {
  const [values,  setValues] = useState(initialValues);
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();
  const updateValue = useSelector(getStepValues(idx));
  const handleChange = (event, newValue) => {
    setValues({...values, ...updateValue});
    setTab(newValue);
  };
  const looped = initialValues.looped_by;
  const disabledTab = looped !== -1 && looped !== idx+1;
  return (
    <div>
      <AppBar position="static" color="default" className={classes.header}>
        <CustTabs value={tab} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="auto tabs example" centered >
          <CustTab label="Device" {...tabProps(0)} />
          <CustTab label="Loop" disabled={disabledTab} {...tabProps(1)} />
          <CustTab label="Media" {...tabProps(2)} />
        </CustTabs>
      </AppBar>
      <TabPanel tab={tab} index={0}>
        <DeviceSelect onChange={updateParams} procedure_id={procedure_id} label="Device" root={root} name="device_id" device_id={values.device_id} defaultValue={values.device_id} />
      </TabPanel>
      <TabPanel tab={tab} index={1}>
        <LoopForm onChange={updateParams} formKey={formKey} defaultValue={values} root={root}/>
      </TabPanel>
      <TabPanel tab={tab} index={2}>
        <div>
          <ArrFileInput name="media" label="Media*" formKey={formKey} idx={idx} defaultValues={values.visuals || undefined} root={root} objName={'step'}
                        radio={{isShown: true, params: [{type: 'image', label: 'Display in app'},{type: 'video', label: 'Display in app'}], actionRoot: 'default_media', defaultValue: values.default_media, withoutChecked: true}}
          />
        </div>
      </TabPanel>
    </div>
  );
}