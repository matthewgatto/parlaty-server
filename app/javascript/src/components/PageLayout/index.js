import React from 'react';
import { Link } from 'react-router-dom';
import BackLink from '@components/BackLink';
import Bar from '@components/Bar/Large';
import Name from '@containers/Name';
import styles from './index.module.css';

const makeLabel = (label) => ((typeof label === "object" && label.entityKey) ? (
  <>{label.text}<Name entityKey={label.entityKey} id={label.id}/></>
) : (
  label
))
const renderLinks = (link) => (Array.isArray(link) ? (
  <div className={styles.links}>
    {link.map(l => <Link key={l.to} className={styles.link} to={l.to}>{l.text}</Link>)}
  </div>
) : (
  <Link className={styles.link} to={link.to}>{link.text}</Link>
))

export default ({back, header, link, children}) => (
  <div className={styles.container}>
    {back && <BackLink className={styles.back} to={back.to}>{makeLabel(back.label)}</BackLink>}
    <Bar title={makeLabel(header)} right={link && renderLinks(link)} />
    {children}
  </div>
)
