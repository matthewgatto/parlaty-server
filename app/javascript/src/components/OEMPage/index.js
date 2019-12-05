import React from 'react';
import PageLayout from '../PageLayout';
import OEMBusinesses from '../../containers/OEMBusinesses';
import OEMName from '../../containers/OEMName';
import styles from './index.module.css';

export default function(props){
  return(
    <PageLayout
      back={props.id ? (
          undefined
        ) : ({
          to: "/",
          label: "Home"
        })}
      header={props.id ? (
        "Home"
      ) : (
        <>OEM: <OEMName id={props.id || props.match.params.id}/></>
      )}
      link={props.match.params.id ? (
          {text: "Update OEM", to: `/oem/${props.match.params.id}/update`}
        ) : (
          undefined
        )}
    >
      <OEMBusinesses
        id={props.id || props.match.params.id}
        requestURL={`/oems/${props.id || props.match.params.id}/oem_businesses`}
        requestEntity="oems"
        text="Businesses"
        to={props.id ? "/business" : `/oem/${props.match.params.id}/business`}
        entityKey="businesses"
        placeholder={props.id ? "You have no businesses" : "This OEM has no businesses"}
      />
    </PageLayout>
  )
}
