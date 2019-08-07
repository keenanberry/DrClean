import React, {Component} from 'react';
import { Panel } from 'react-bootstrap/lib';
import PageButton from './PageButton';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: '',
            datatype: '',
            number: 5
        }
    }
    render() {
        return (
        <Panel bsStyle="info" key="Upload" className="centeralign">
            <Panel.Heading>
                <Panel.Title componentClass="h3">Upload</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>File type</p>
              <p>Neighbor count</p>
              <PageButton text="Upload" />

            </Panel.Body>
          </Panel>
        )
    }
}