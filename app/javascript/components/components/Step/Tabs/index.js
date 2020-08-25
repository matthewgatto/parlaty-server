import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Input, ArrFileInput} from '@components/Inputs';
import DeviceSelect from '@containers/DeviceSelect';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
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
  value: PropTypes.any.isRequired,
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
})(Tab);
function tabProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default ({ initialValues, formKey, root, procedure_id, idx, ...props}) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default" className={classes.header}>
        <CustTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="auto tabs example"
          centered
        >
          <CustTab label="Loop" {...tabProps(0)} />
          <CustTab label="Device" {...tabProps(1)} />
          <CustTab label="Media" {...tabProps(2)} />
        </CustTabs>
      </AppBar>
      <TabPanel  value={value} index={0}>
        <Input as="input" defaultValue={initialValues.loop_value || 1} formKey={formKey} type="text" label="Number of Loops" root={root} name="loop_value" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeviceSelect procedure_id={procedure_id} label="Device" root={root} name="device_id" defaultValue={initialValues.device} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <ArrFileInput name="media" label="Media*" formKey={formKey} idx={idx} defaultValues={initialValues.visuals || undefined} root={root} objName={'step'}
                        radio={{isShown: true, params: [{type: 'image', label: 'Display in app'},{type: 'video', label: 'Display in app'}], actionRoot: 'defaultMedia', defaultValue: initialValues.defaultMedia, withoutChecked: true}}
          />
        </div>
      </TabPanel>
    </div>
  );
}