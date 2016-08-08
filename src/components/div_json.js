import React from 'react';
import JSONTree from 'react-json-tree';

const DivJSON = (props) => {
	if(props.json) {
		return (
			<h3>{props.title}
				<br />
				<pre><code><JSONTree data={props.json} hideRoot={true} /></code></pre>
			</h3>
		);
	}

	return <div></div>;
}

export default DivJSON;