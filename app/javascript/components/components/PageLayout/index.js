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
    {link.map(l => <Link key={l.to} className="primary button align_center" to={l.to}>{l.text}</Link>)}
  </div>
) : (
  <Link className="primary button align_center" to={link.to}>{link.text}</Link>
))
const renderButtons = (buttons, link) => (<>
  {link && renderLinks(link)}
  {buttons}
</>)

export default ({back, header, buttons, link, children}) => (
  <div className={styles.container}>
    {back && <BackLink className={styles.back} to={back.to}>{makeLabel(back.label)}</BackLink>}
    <Bar title={makeLabel(header)} right={renderButtons(buttons, link)} />
    {children}
  </div>
)
