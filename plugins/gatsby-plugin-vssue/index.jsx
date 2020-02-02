import React from 'react';
import { VueInReact } from "vuera";
import { VssueComponent } from "vssue";
import 'vssue/dist/vssue.css'
import GithubV3 from '@vssue/api-github-v3';
const ReactVssue = VueInReact(VssueComponent);

let vssopts = {
    api: GithubV3,
    autoCreateIssue: true
}

vssopts = { ...vssopts, ...GATSBY_VSSUE_OPTS}
export default (props) => <ReactVssue title={props.title} options={vssopts}/>

