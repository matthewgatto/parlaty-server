import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import { getStepValues } from '@selectors/template'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from './index.module.css';
import {ArrFileInput, LimitedTextArea} from '@components/Inputs';
import DeviceSelect from '@containers/DeviceSelect';
import LoopForm from '@components/Step/LoopForm';
import ProcedureAssociationForm from "@components/Step/ProcedureAssociationForm";

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
  flexContainer:{
    justifyContent: "space-between",
  },
  indicator: {
    backgroundColor: '#67318d',
  },
})(Tabs);

const CustTab = withStyles({
  root: {
    /* minWidth: 'auto', */
    minHeight: '40px',
    fontSize: '1.1em',
    fontWeight: '600',
    lineHeight: '1em',
    '& > span':{
      flexDirection: "row-reverse",
    },
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
const HiddenTab = withStyles({
  root: {
    maxWidth: '0',
    minWidth: '0',
    padding: '0',
  },
})(Tab);

const FullIcon = ({full}) => {
  return (full ?
    <CheckCircleOutlineRoundedIcon className={styles.icon} style={{fontSize: 14}} /> :
    null
  )
}

function tabProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default ({ initialValues, formKey, root, procedure_id, oemBusinessId, idx, updateParams }) => {
  const [values, setValues] = useState(initialValues);
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  const updateValue = useSelector(getStepValues(idx));
  const handleChange = (event, newValue) => {
    setValues({...values, ...updateValue});
    setTab(newValue);
  };
  useEffect(() => {
    setValues({...values, ...updateValue});
  }, [initialValues])
  const looped = values.looped_by;
  const disabledTab = looped !== undefined && looped !== -1 && looped !== idx+1;
  return (
    <div>
      <AppBar position="static" color="default" className={classes.header}>
        <CustTabs value={tab} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="auto tabs example centered" >
          <HiddenTab label="" {...tabProps(0)} />
          <CustTab label="Instructions" icon={<FullIcon full={values.location} />} {...tabProps(1)} />
          {false ?
          <CustTab label="Device" icon={<FullIcon full={values.device_id} />} {...tabProps(4)} />
              : null}
          {false ?
          <CustTab label="Loop" icon={<FullIcon full={!disabledTab && values.enabled_loop} />} disabled={disabledTab} {...tabProps(3)} />
          : null}
            <CustTab label="Media" icon={<FullIcon full={values && values.visuals && values.visuals.length > 0} />} {...tabProps(2)} />
          {false ?
          <CustTab label="Associate" icon={<FullIcon full={values && values.enabled_associated_procedure} />} {...tabProps(5)} />
              : null}
        </CustTabs>
      </AppBar>
      <TabPanel tab={tab} onChange={updateParams} className={styles.withoutPadding} index={0}/>
      <TabPanel tab={tab} index={1}>
        <LimitedTextArea onChange={updateParams} as="textarea" defaultValue={values.location || ''} idx={idx} label="Instruction" name="location" rows="6" root={root} formKey={formKey} limit={300}/>
      </TabPanel>
      <TabPanel tab={tab} index={4}>
        <DeviceSelect onChange={updateParams} procedure_id={procedure_id} label="Device" root={root} idx={idx} name="device_id" device_id={values.device_id} defaultValue={values.device_id} />
      </TabPanel>
      <TabPanel tab={tab} index={3}>
        <LoopForm onChange={updateParams} formKey={formKey} defaultValue={values} root={root}/>
      </TabPanel>
      <TabPanel tab={tab} index={2}>
        <div>
          <ArrFileInput setTabValues={setValues} name="media" label="Media*" formKey={formKey} idx={idx} defaultValues={values.visuals || undefined} root={root} objName={'step'}
                        radio={{isShown: true, params: [{type: 'image', label: 'Default media'},{type: 'video', label: 'Default media'}], actionRoot: 'default_media', defaultValue: values.default_media, withoutChecked: true}}
          />
        </div>
      </TabPanel>
      <TabPanel tab={tab} index={5}>
        <ProcedureAssociationForm onChange={updateParams} procedureId={procedure_id} oemBusinessId={oemBusinessId} formKey={formKey} root={root} defaultValue={values}/>
      </TabPanel>
    </div>
  );
}