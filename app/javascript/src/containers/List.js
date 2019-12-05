import React from 'react';
import ListItem from './ListItem';
import ListLabel from '../components/ListLabel';
import FetchLoader from '../components/FetchLoader';
import FetchError from '../components/FetchError';
import ListPlaceholder from '../components/ListPlaceholder';
import { fetchEntity } from '../redux/actions';

export default class extends React.PureComponent {
  componentDidMount(){
    if(this.props.shouldLoad){
      this.makeEntityRequest();
    }
  }
  makeEntityRequest = () => {
    this.props.dispatch(fetchEntity(this.props.requestURL, this.props.requestEntity, this.props.id));
  }
  render(){
    if(this.props.error) return <FetchError error={this.props.error} retry={this.makeEntityRequest} />
    if(this.props.isLoading) return <FetchLoader text={this.props.text} />
    if(!this.props.items || (this.props.items && this.props.items.length === 0)){
      return <ListPlaceholder text={this.props.placeholder} />
    }
    return(
      <>
        <ListLabel
          text={this.props.text}
          showRefresh={false/*this.props.items && !this.props.error*/}
          refresh={this.makeEntityRequest}
        />
        {this.props.items.map(id =>
          <ListItem key={id} entityKey={this.props.entityKey} to={this.props.action ? `${this.props.to}/${id}/${this.props.action}` : `${this.props.to}/${id}`} id={id} />
        )}
      </>
    )

  }
}
